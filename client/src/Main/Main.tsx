import React from 'react';
import { useWeb3 } from 'useWeb3';

import { Button, TextField, TextArea, Loading, TransactionCard } from 'components';
import s from './Main.module.scss';

const Main = () => {
  const { account, transactions, connectWallet, sendTransaction, isLoading } = useWeb3();

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    const inputs = ev.currentTarget.elements;
    sendTransaction({
      addressTo: inputs.addressTo.value,
      amount: inputs.amount.value,
      keyword: inputs.keyword.value,
      message: inputs.message.value,
    });
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.left}>
          <div className={s.wallet}>
            {account ? (
              <>
                <h3 className={s.walletTitle}>Your wallet:</h3>
                <div className={s.walletHash}>{account}</div>
                <div>Chain: Ropsten</div>
                <div>Wallet for test: </div>
                <div>0x6c84e49f82dce26847da632d991d0a24b503ec67</div>
              </>
            ) : (
              <Button className={s.walletButton} onClick={connectWallet}>
                Connect wallet
              </Button>
            )}
          </div>
          <form className={s.form} onSubmit={handleSubmit}>
            <TextField className={s.formField} label="Address To" name="addressTo" required />
            <TextField className={s.formField} label="Amount (ETH)" name="amount" required />
            <TextField className={s.formField} label="Keyword (Gif)" name="keyword" required />
            <TextArea className={s.formField} label="Enter message" name="message" />
            <Button className={s.formSubmit} type="submit" disabled={!account} isWide>
              Send <Loading isDark isLoading={isLoading} />
            </Button>
          </form>
        </div>
        {account && transactions.length && <div className={s.cards}>
          {transactions.map((transaction) => (
            <TransactionCard key={String(transaction.timestamp)} className={s.card} transaction={transaction} />
          ))}
        </div>}
      </div>
    </div>
  );
};

export { Main };
