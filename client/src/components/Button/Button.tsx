import React from 'react';
import cl from 'classnames';
import s from './Button.module.scss';

type Props = {
  isOutlined?: true;
  isSmall?: true;
  isWide?: true;
  isActive?: boolean;
};

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement> & Props) => {
  const {
    isOutlined = false,
    isSmall = false,
    isWide = false,
    isActive = false,
    className,
    ...buttonProps
  } = props;

  const classes = cl(
    s.root,
    { [s.outlined]: isOutlined },
    { [s.small]: isSmall },
    { [s.wide]: isWide },
    { [s.active]: isActive },
    className
  );

  return <button type="button" className={classes} {...buttonProps}></button>;
};

export { Button };
