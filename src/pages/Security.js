import React from 'react';
import { Card, List } from 'antd';
import { useHistory } from 'react-router-dom';
import Menu from '../components/SideMenu';
import { useAuth } from '../contexts/auth';
import { CHANGE_PASSWORD, FINISH_SESSION } from '../utils/constants';
import { h1Style, listItemStyle, cardBodyStyle } from './Security.AntdStyle';
import styles from './Security.module.css';

const { Meta } = Card;

function Security() {
  const history = useHistory();
  const { logout } = useAuth();

  const logoutAction = () => {
    logout();
    history.push('/');
  };

  const changePasswordAction = () => history.push('/change-password');

  return (
    <div className={styles.Container}>
      <div className={styles.MenuContainer}>
        <Menu currentItem="4" />
      </div>
      <div className={styles.InteractionContainer}>
        <h1 style={h1Style}>Segurança</h1>
        <List
          grid={{ column: 1 }}
          dataSource={[CHANGE_PASSWORD, FINISH_SESSION]}
          renderItem={item => (
            <List.Item style={listItemStyle}>
              <Card
                className={styles.Card}
                bodyStyle={cardBodyStyle}
                onClick={
                  item.title === FINISH_SESSION.title
                    ? logoutAction
                    : changePasswordAction
                }
              >
                <Meta
                  title={<h2>{item.title}</h2>}
                  description={item.description}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default Security;
