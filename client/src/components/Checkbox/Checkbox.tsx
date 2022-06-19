import React from 'react';
import cl from 'classnames';
import s from './Checkbox.module.scss';

type Props = {
  label?: string;
};

const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement> & Props) => {
  const { className, label = null, ...inputProps } = props;

  return (
    <label className={cl(s.root, className)}>
      <input className={s.input} {...inputProps} type="checkbox" />
      <div className={s.label}>{label}</div>
    </label>
  );
};

export { Checkbox };
