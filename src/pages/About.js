import React, { useState } from 'react';
import { Collapse } from 'antd';
import { InfoCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import Menu from '../components/SideMenu';
import Logo from '../components/Logo';
import { LOREM } from '../utils/constants';
import { panelHeaderStyle, infoIconStyle } from './About.AntdStyle';
import styles from './About.module.css';

function About() {
  const { Panel } = Collapse;

  const [isCollapsed, setIsCollapsed] = useState(
    Array(3).fill(true).fill(false, 0, 1),
  );

  const onChangeCollapsed = key => {
    const idxOpen = isCollapsed.indexOf(false);
    if (idxOpen !== -1) {
      isCollapsed[idxOpen] = !isCollapsed[idxOpen];
    }
    if (key != null) {
      isCollapsed[key] = !isCollapsed[key];
    }
    setIsCollapsed(Object.values({ ...isCollapsed }));
  };

  const createPanelHeader = (key, title) => (
    <div style={panelHeaderStyle}>
      {React.createElement(
        isCollapsed[key] ? InfoCircleOutlined : InfoCircleFilled,
        { style: infoIconStyle },
      )}
      <h2>{title}</h2>
    </div>
  );

  return (
    <div className={styles.Container}>
      <div className={styles.MenuContainer}>
        <Menu currentItem="5" />
      </div>
      <div className={styles.InteractionContainer}>
        <Logo />
        <Collapse
          accordion
          defaultActiveKey={['0']}
          onChange={onChangeCollapsed}
        >
          <Panel header={createPanelHeader(0, 'Sobre o SIMI')} key="0">
            <p>
              “O Sistema Mineiro de Inovação foi instituído em 12 de dezembro de
              2006 por meio do Decreto nº 44.418. Tem por finalidade promover a
              convergência de ações governamentais, empresariais, acadêmicas de
              pesquisa e tecnologia para, de forma cooperada, desenvolver a
              inovação no estado de Minas Gerais.”
            </p>
          </Panel>
          <Panel
            header={createPanelHeader(1, 'Política de privacidade')}
            key="1"
          >
            <p>{LOREM}</p>
          </Panel>
          <Panel header={createPanelHeader(2, 'F.A.Q.')} key="2">
            <p>{LOREM}</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}

export default About;
