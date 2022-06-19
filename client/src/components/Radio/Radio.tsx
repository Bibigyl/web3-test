import React from 'react';
import cl from 'classnames';
import s from './Radio.module.scss';

type Props = {
  label?: string;
};

const Radio = (props: React.InputHTMLAttributes<HTMLInputElement> & Props) => {
  const { className, label = null, ...inputProps } = props;

  return (
    <label className={cl(s.root, className)}>
      <input className={s.input} {...inputProps} type="radio" />
      <div className={s.label}>{label}</div>
    </label>
  );
};

export { Radio };
