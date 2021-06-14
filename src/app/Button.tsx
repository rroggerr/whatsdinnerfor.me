import React from 'react';
import { css } from '@emotion/css';

const getStyles = (color: 'black' | 'white') => ({
  root: css`
    display: flex;
    justify-content: center;
    border: 2px solid black;
    background: ${color};
    color: ${color === 'white' ? 'black' : 'white'};
    padding: 12px 20px;
    font-size: 18px;
    font-weight: 600;
    font-family: Tahoma, sans-serif;
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 80%;

    &:hover {
      background: ${color === 'white' ? '#e3e3e3' : '#2e2e2e'};
    }

    &:active {
      background: ${color === 'white' ? '#bdbdbd' : '#4d4d4d'};
    }
  `,
});

interface CustomProps {
  styling: 'black' | 'white';
}

type ButtonProps = React.ComponentProps<'button'> & CustomProps;

export const Button: React.FC<ButtonProps> = ({
  styling,
  children,
  ...restProps
}) => {
  const styles = getStyles(styling);
  return (
    <button className={styles.root} {...restProps}>
      {children}
    </button>
  );
};
