import React from 'react';
import { RobotOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const EmptyInfo = () => {
  const history = useHistory();

  return (
    <div style={{ fontSize: '18px' }}>
      <div>
        <RobotOutlined style={{ fontSize: '25px' }} />
      </div>
      {history.location.pathname === '/contacted-orgs'
        ? 'Nenhuma organização contactada por enquanto'
        : 'Nenhum resultado encontrado'}
    </div>
  );
};

export default EmptyInfo;
