import React, { useState } from 'react';
import { Button, Form, Input, Select, message, Spin } from 'antd';
import {
  FormOutlined,
  GlobalOutlined,
  MailOutlined,
  LinkedinFilled,
  ReconciliationOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import useAsync from '../hooks/useAsync';
import { required } from '../utils/validations';
import Menu from '../components/SideMenu';
import AvatarUpload from '../components/AvatarUpload';
import { INPUT_NAMES, REQUIRED_MSG } from '../utils/constants';
import ProfileAntdStyle from './Profile.AntdStyles';
import styles from './Profile.module.css';

let endpoint = null;
const getPrevEndpoint = () => endpoint;

function Profile() {
  const { user, update } = useAuth();
  const { isLoading, isError, error, run } = useAsync();
  const orgIdx = 0;
  const history = useHistory();
  const { TextArea } = Input;
  const { Option } = Select;
  const {
    iconStyle,
    contactIconsStyle,
    saveIconStyle,
    h1Style,
    formItemStyle,
    inputStyle,
    descriptionInputStyle,
    editableStyle,
    onBlurOrgName,
    onEditOrgName,
    btnLabelStyle,
    ghostBtnStyle,
  } = ProfileAntdStyle();

  const getAddonBefore = (subcontact, steps) =>
    user.orgs[orgIdx].contact[subcontact].substring(
      0,
      user.orgs[orgIdx].contact[subcontact].indexOf('/') + steps,
    );

  const getText = (subcontact, steps) =>
    user.orgs[orgIdx].contact[subcontact].replace(
      getAddonBefore(subcontact, steps),
      '',
    );

  const [state, setState] = useState({
    name: { text: user.orgs[orgIdx].name, disabled: true },
    description: {
      text: user.orgs[orgIdx].description,
      disabled: true,
    },
    imageSrc: { text: user.orgs[orgIdx].imageSrc },
    contact: {
      linkedin: {
        text: getText('linkedin', 1),
        addonBefore:
          getAddonBefore('linkedin', 1) !== ''
            ? getAddonBefore('linkedin', 1)
            : 'linkedin.com/',
      },
      mail: { text: user.orgs[orgIdx].contact.mail, addonBefore: '' },
      website: {
        text: getText('website', 2),
        addonBefore:
          getAddonBefore('website', 2) !== ''
            ? getAddonBefore('website', 2)
            : 'http://',
      },
    },
    contactedOrgs: { text: user.orgs[orgIdx].contactedOrgs },
  });

  const onChangeSelect = value => {
    setState(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        website: { ...prev.contact.website, addonBefore: value },
      },
    }));
  };

  const selectBefore = op => {
    switch (op) {
      case INPUT_NAMES.linkedin:
        return state.contact.linkedin.addonBefore;
      case INPUT_NAMES.website:
        return (
          <Select
            defaultValue={state.contact.website.addonBefore}
            onChange={onChangeSelect}
          >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
          </Select>
        );

      default:
        return null;
    }
  };

  const changeEditable = (property, value, isContactSubprop) => {
    if (isContactSubprop) {
      state.contact[property].disabled = value;
    } else {
      state[property].disabled = value;
    }
    setState({ ...state });
  };

  const onChangeInput = e => {
    const { name, value } = e.target;
    if (Object.keys(state.contact).some(key => name.includes(key))) {
      setState(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [name]: { ...prev.contact[name], text: value },
        },
      }));
    } else {
      setState(prev => ({ ...prev, [name]: { ...prev[name], text: value } }));
    }
  };

  const onFinishForm = () => {
    const data = { email: user.email };
    Object.keys(state).forEach(key => {
      if (key !== 'contact') {
        data[key] = state[key].text;
      } else {
        data[key] = {};
        Object.keys(state[key]).forEach(subkey => {
          data[key][subkey] =
            state[key][subkey].addonBefore + state[key][subkey].text;
        });
      }
    });

    run(update(data))
      .then(() => {
        message.success({
          key: 'successful',
          content: 'Alterações salvas com sucesso!',
          duration: 5,
          onClick: () => message.destroy('successful'),
        });
      })
      .catch(err =>
        message.error({
          key: 'error',
          content: err.response.data,
          duration: 5,
          onClick: () => message.destroy('error'),
        }),
      );
  };

  return (
    <div className={styles.Container}>
      <div className={styles.MenuContainer}>
        <Menu currentItem="3" />
      </div>
      <Form onFinish={onFinishForm}>
        <div className={styles.Header}>
          <Form.Item
            name={INPUT_NAMES.name}
            value={state.name.text}
            initialValue={state.name.text}
            rules={[required(REQUIRED_MSG)]}
            style={editableStyle}
          >
            <TextArea
              className={styles.OrgName}
              name={INPUT_NAMES.name}
              value={state.name.text}
              onChange={onChangeInput}
              onBlur={() => {
                changeEditable(INPUT_NAMES.name, true, false);
                onBlurOrgName();
              }}
              disabled={state.name.disabled}
              bordered={!state.name.disabled}
              style={editableStyle}
              autoSize
              maxLength={100}
            />
          </Form.Item>
          <FormOutlined
            className={styles.EditIcon}
            onClick={() => {
              changeEditable(INPUT_NAMES.name, false, false);
              onEditOrgName();
            }}
          />
        </div>

        <Form.Item
          name={INPUT_NAMES.description}
          value={state.description.text}
          initialValue={
            state.description.text === '' ? null : state.description.text
          }
          noStyle
        >
          <TextArea
            rows={8}
            name={INPUT_NAMES.description}
            value={state.description.text}
            placeholder="Insira uma descrição da sua organização"
            onChange={onChangeInput}
            disabled={state.description.disabled}
            onBlur={() => changeEditable(INPUT_NAMES.description, true, false)}
            style={descriptionInputStyle}
          />
        </Form.Item>
        <div
          className={styles.EditContainer}
          role="button"
          tabIndex={0}
          onClick={() => changeEditable(INPUT_NAMES.description, false, false)}
          onKeyPress={null}
        >
          <span>Editar descrição</span>
          <FormOutlined className={styles.EditIcon} />
        </div>
        <AvatarUpload imgSrcState={state.imageSrc.text} setState={setState} />
        <h1 style={h1Style}>Contato</h1>
        <div className={styles.ContactContainer}>
          <ul className={styles.ContactList}>
            <li>
              <div>
                <LinkedinFilled style={contactIconsStyle.linkedin} />
                <Form.Item
                  name={INPUT_NAMES.linkedin}
                  value={state.contact.linkedin.text}
                  initialValue={
                    state.contact.linkedin.text === ''
                      ? null
                      : state.contact.linkedin.text
                  }
                  style={formItemStyle}
                >
                  <Input
                    name={INPUT_NAMES.linkedin}
                    value={state.contact.linkedin.text}
                    placeholder="linkedin-da-organização"
                    addonBefore={selectBefore(INPUT_NAMES.linkedin)}
                    onChange={onChangeInput}
                    maxLength={50}
                    style={inputStyle}
                  />
                </Form.Item>
              </div>
            </li>
            <li>
              <div>
                <MailOutlined style={contactIconsStyle.mail} />
                <Form.Item
                  name={INPUT_NAMES.mail}
                  value={state.contact.mail.text}
                  initialValue={
                    state.contact.mail.text === ''
                      ? null
                      : state.contact.mail.text
                  }
                  style={formItemStyle}
                >
                  <Input
                    name={INPUT_NAMES.mail}
                    value={state.contact.mail.text}
                    placeholder="email@organizacao.com"
                    onChange={onChangeInput}
                    maxLength={50}
                    style={inputStyle}
                  />
                </Form.Item>
              </div>
            </li>
            <li>
              <div>
                <GlobalOutlined style={contactIconsStyle.website} />
                <Form.Item
                  name={INPUT_NAMES.website}
                  value={state.contact.website.text}
                  initialValue={
                    state.contact.website.text === ''
                      ? null
                      : state.contact.website.text
                  }
                  style={formItemStyle}
                >
                  <Input
                    name={INPUT_NAMES.website}
                    value={state.contact.website.text}
                    placeholder="sitedaorganizacao.com"
                    addonBefore={selectBefore(INPUT_NAMES.website)}
                    onChange={onChangeInput}
                    maxLength={50}
                    style={inputStyle}
                  />
                </Form.Item>
              </div>
            </li>
          </ul>
        </div>

        <div>
          {isLoading ? <Spin /> : null}
          {isError ? <p>{error.response.data}</p> : null}
        </div>

        <Button
          className={styles.SubmitBtn}
          type="primary"
          htmlType="submit"
          disabled={state.name.text === ''}
          size="large"
          shape="round"
          icon={<SaveOutlined style={saveIconStyle} />}
        >
          Salvar alterações
        </Button>
      </Form>

      <Button
        type="dashed"
        ghost
        icon={<ReconciliationOutlined style={iconStyle} />}
        onClick={() => {
          endpoint = history.location.pathname;
          history.push('/register');
        }}
        shape="round"
        style={ghostBtnStyle}
      >
        <span style={btnLabelStyle}>Preferências para conexões</span>
      </Button>
    </div>
  );
}

export default Profile;
export { getPrevEndpoint };
