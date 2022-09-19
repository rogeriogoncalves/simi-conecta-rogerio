import React from 'react';
import {
  GlobalOutlined,
  MailOutlined,
  LinkedinFilled,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import useAsync from '../hooks/useAsync';
import updateContactedOrgs from '../utils/commonFunctions';
import OrgDetailsAntdStyle from './OrgDetails.AntdStyles';
import styles from './OrgDetails.module.css';

function OrgDetails() {
  const history = useHistory();
  const { user, update } = useAuth();
  const { run } = useAsync();
  const {
    iconStyle,
    linkedinIconStyle,
    h1Style,
    linkTextStyle,
  } = OrgDetailsAntdStyle();

  const orgData = { ...history.location.state };

  const onArrowLeftClick = () => history.goBack();

  return (
    <div className={styles.Container}>
      <div className={styles.InteractionContainer}>
        <div className={styles.Header}>
          <ArrowLeftOutlined
            className={styles.ArrowBack}
            onClick={onArrowLeftClick}
          />
          <h1 style={h1Style}>{orgData.name}</h1>
        </div>

        <p className={styles.Description}>{orgData.description}</p>

        <div className={styles.OrgImgContainer}>
          <img src={orgData.imageSrc} alt="Logo" />
        </div>

        <h1 style={h1Style}>Contato</h1>
        <div className={styles.ContactContainer}>
          <ul className={styles.ContactList}>
            <li>
              <a
                href={`${orgData.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => updateContactedOrgs(orgData, user, update, run)}
                onKeyPress={() => {}}
                role="button"
                tabIndex={0}
              >
                <LinkedinFilled style={linkedinIconStyle} />
                <span style={linkTextStyle}>{orgData.contact.linkedin}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${orgData.contact.mail}`}
                rel="noopener noreferrer"
                onClick={() => updateContactedOrgs(orgData, user, update, run)}
                onKeyPress={() => {}}
                role="button"
                tabIndex={0}
              >
                <MailOutlined style={iconStyle} />
                <span style={linkTextStyle}>{orgData.contact.mail}</span>
              </a>
            </li>
            <li>
              <a
                href={`${orgData.contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => updateContactedOrgs(orgData, user, update, run)}
                onKeyPress={() => {}}
                role="button"
                tabIndex={0}
              >
                <GlobalOutlined style={iconStyle} />
                <span style={linkTextStyle}>{orgData.contact.website}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrgDetails;
