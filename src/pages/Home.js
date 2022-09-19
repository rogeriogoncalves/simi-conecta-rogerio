import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useAuth } from '../contexts/auth';
import ProxyHandler from '../proxy/proxy-handler';
import Menu from '../components/SideMenu';
import CardList from '../components/CardList';
import { h1Style, innovationStyle, linkStyle } from './Home.AntdStyle';
import styles from './Home.module.css';

function Home() {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');

  const onChangeSearch = e => {
    const { value } = e.target;
    setSearchText(() => value);
  };

  const InnovationBallot = () => (
    <div className={styles.Innovation} style={innovationStyle}>
      Gostaria de estar visível para o ecossistema de inovação de MG?
      Inscreva-se em{' '}
      <a
        href="http://www.simi.org.br/cadastro"
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
      >
        simi.org.br/cadastro
      </a>
    </div>
  );

  const [innovState, setInovState] = useState({
    loading: true,
    innovation: <InnovationBallot />,
  });

  useEffect(() => {
    ProxyHandler.get('/database-empresas')
      .then(res => {
        const orgs = res.data;
        orgs.forEach(org => {
          if (org.contact.mail === user.email) {
            setInovState(prev => ({ ...prev, inovation: null }));
          }
        });
        setInovState(prev => ({ ...prev, loading: false }));
      })
      .catch(err => err.message);
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.MenuContainer}>
        <Menu currentItem="1" />
      </div>
      <div className={styles.InteractionContainer}>
        <h1 style={h1Style}>Novas Associações</h1>
        <p>
          Encontramos as seguintes empresas de acordo com as suas
          caracteristicas. Gostaria de filtrar as indicações por palavra-chave?
        </p>
        <Input
          className={styles.Search}
          placeholder="Pesquise por cidade, tipo de organização..."
          value={searchText}
          onChange={onChangeSearch}
          bordered={false}
          maxLength={40}
        />
        <CardList filter={searchText} />
      </div>
      {innovState.loading ? null : innovState.innovation}
    </div>
  );
}

export default Home;
