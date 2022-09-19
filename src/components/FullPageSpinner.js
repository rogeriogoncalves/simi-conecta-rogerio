import React from 'react';
import { Spin } from 'antd';
import styles from './FullPageSpinner.module.css';

function FullPageSpinner() {
  return (
    <div className={styles.Container}>
      <Spin size="large" />
    </div>
  );
}

export default FullPageSpinner;
