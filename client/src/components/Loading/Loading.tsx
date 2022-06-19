import React from 'react';
import cl from 'classnames';
import s from './Loading.module.scss';

type Props = {
  isLoading?: boolean;
  isDark?: boolean;
};

const Loading = ({ isLoading = true, isDark =  false }: Props) => (
  <span className={cl(s.root, { [s.hidden]: !isLoading, [s.dark]: isDark })} />
);

export { Loading };
