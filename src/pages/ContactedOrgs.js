import React, { useState } from 'react';
import { Input } from 'antd';
import Menu from '../components/SideMenu';
import CardList from '../components/CardList';
import { h1Style, cardListStyle } from './ContactedOrgs.AntdStyle';
import styles from './ContactedOrgs.module.css';

function ContactedOrgs() {
  const [searchText, setSearchText] = useState('');

  const onChangeSearch = e => {
    const { value } = e.target;
    setSearchText(() => value);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.MenuContainer}>
        <Menu currentItem="2" />
      </div>
      <div className={styles.InteractionContainer}>
        <h1 style={h1Style}>Organizações contactadas</h1>
        <Input
          className={styles.Search}
          placeholder="Pesquisar"
          value={searchText}
          onChange={onChangeSearch}
          bordered={false}
          maxLength={40}
        />
        <CardList filter={searchText} overrideStyle={cardListStyle} />
      </div>
    </div>
  );
}

export default ContactedOrgs;
