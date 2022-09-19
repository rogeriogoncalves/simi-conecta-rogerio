import React from 'react';
import { Menu, Button, Popover } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  MenuOutlined,
  HomeFilled,
  PartitionOutlined,
  IdcardOutlined,
  LockOutlined,
  QuestionCircleTwoTone,
  ExportOutlined,
} from '@ant-design/icons';
import { useAuth } from '../contexts/auth';
import Logo from './Logo';
import { primaryOrange } from '../utils/colors';
import {
  iconStyleFirst,
  iconStyleOthers,
  menuStyle,
  menuItemStyle,
  menuLastItemStyle,
} from './SideMenu.AntdStyle';
import styles from './SideMenu.module.css';

function SideMenu({ currentItem, hidden }) {
  const history = useHistory();
  const { logout } = useAuth();

  const state = {
    collapsed: false,
  };

  const content = (
    <Menu
      defaultSelectedKeys={[currentItem]}
      mode="inline"
      theme="light"
      inlineCollapsed={state.collapsed}
      style={menuStyle}
    >
      <Menu.Item
        key="1"
        icon={<HomeFilled style={iconStyleFirst} />}
        style={menuItemStyle}
        onClick={() => history.push('/')}
      >
        Página Inicial
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<PartitionOutlined style={iconStyleOthers} />}
        style={menuItemStyle}
        onClick={() => history.push('/contacted-orgs')}
      >
        Organizações contactadas
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<IdcardOutlined style={iconStyleOthers} />}
        style={menuItemStyle}
        onClick={() => history.push('/profile')}
      >
        Minha organização
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={<LockOutlined style={iconStyleOthers} />}
        onClick={() => history.push('/security')}
        style={menuItemStyle}
      >
        Segurança
      </Menu.Item>
      <Menu.Item
        key="5"
        icon={
          <QuestionCircleTwoTone
            style={iconStyleOthers}
            twoToneColor={primaryOrange}
          />
        }
        onClick={() => history.push('/about')}
        style={menuItemStyle}
      >
        Sobre
      </Menu.Item>
      <Menu.Item
        key="6"
        icon={<ExportOutlined style={iconStyleOthers} />}
        onClick={() => {
          logout();
          history.push('/');
        }}
        style={menuLastItemStyle}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={hidden ? styles.HideItem : styles.MenuPopover}>
      <Popover
        placement="bottomLeft"
        title={<Logo />}
        content={content}
        trigger="click"
      >
        <Button className={styles.MenuButton} type="primary">
          <MenuOutlined />
        </Button>
      </Popover>
    </div>
  );
}

export default SideMenu;
