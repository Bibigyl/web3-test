import React, { useEffect, useState } from 'react';
import cl from 'classnames';
import { Transaction } from 'types';
import s from './TransactionCard.module.scss';

type Props = {
  transaction: Transaction;
  className?: string;
};

const API_KEY = process.env.REACT_APP_GIFS_KEY

const TransactionCard = ({ transaction, className }: Props) => {
  const { addressTo, addressFrom, timestamp, message, keyword, amount } = transaction;
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchIGif = async () => {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
      const { data } = await response.json();
      setUrl(data[0]?.images?.downsized_medium.url);
    }
    fetchIGif();
  }, [keyword])

  return (
    <div className={cl(s.root, className)}>
      <p><span>addressTo:</span> {addressTo}</p>
      <p><span>addressFrom:</span> {addressFrom}</p>
      <p><span>timestamp:</span> {timestamp}</p>
      <p><span>amount:</span> {amount}</p>
      <p><span>keyword:</span> {keyword}</p>
      <p><span>message:</span> {message}</p>
      <img className={s.image} src={url} alt="keyword" />
    </div>
  );
};

export { TransactionCard };
