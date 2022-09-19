import React from 'react';
import logo from '../assets/images/logo.png';
import styles from './Logo.module.css';

function Logo() {
  return (
    <div className={styles.Container}>
      <img src={logo} alt="Logo Simi Context" />
    </div>
  );
}

export default Logo;
