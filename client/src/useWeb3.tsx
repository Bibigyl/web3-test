import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from 'consts';
import { Transaction } from 'types';

export type TransactionData = {
  addressTo: string;
  amount: number;
  keyword: string;
  message: string;
};

const getContract = () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const useWeb3 = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTransactions = useCallback(async () => {
    if (!window.ethereum) return;
    const contract = getContract();
    const transactions = await contract.getAllTransactions();

    const convertedTransactions = transactions.map((transaction: any) => ({
      addressTo: transaction.receiver,
      addressFrom: transaction.sender,
      timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
      message: transaction.message,
      keyword: transaction.keyword,
      amount: parseInt(transaction.amount._hex) / 10 ** 18,
    }));
    setTransactions(convertedTransactions.reverse());
  }, []);

  useEffect(() => {
    if (!window.ethereum) {
      alert('Please install metamask');
      return;
    }
    const checkAccount = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setAccount(accounts[0]);
        getTransactions();
      }
    };
    checkAccount();
  }, [getTransactions]);

  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        alert('Please install metamask');
        return;
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      getTransactions();
    } catch (err) {
      console.log(err);
      alert('Wallet is not connected');
    }
  }, [getTransactions]);

  const sendTransaction = useCallback(
    async (data: TransactionData) => {
      if (!window.ethereum || !account) return;
      try {
        const contract = getContract();
        const { addressTo, amount, keyword, message } = data;
        const parsedAmount = ethers.utils.parseEther(String(amount));

        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: account,
              to: addressTo,
              gas: '0x5208',
              value: parsedAmount._hex,
            },
          ],
        });

        const transactionHash = await contract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword
        );
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        getTransactions();
      } catch {
        alert('Failed to send transaction');
        setIsLoading(false);
      }
    },
    [account, getTransactions]
  );

  return {
    account,
    transactions,
    connectWallet,
    sendTransaction,
    isLoading,
  };
};
