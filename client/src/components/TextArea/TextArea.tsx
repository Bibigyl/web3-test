import React from 'react';
import cl from 'classnames';
import commonS from 'styles/common.module.scss';
import s from './TextArea.module.scss';

type Props = {
  label?: string;
};

const TextArea = (props: React.InputHTMLAttributes<HTMLTextAreaElement> & Props) => {
  const { className, label = '', ...textAreaProps } = props;

  return (
    <label className={cl(s.root, className)}>
      {label && <div className={commonS.label}>{label}</div>}
      <textarea {...textAreaProps} className={s.textArea} />
    </label>
  );
};

export { TextArea };
