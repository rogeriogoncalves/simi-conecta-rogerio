import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { Button, Select, Form, message, Pagination, Spin } from 'antd';
import {
  CheckOutlined,
  QuestionCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import {
  DATA_ITEMS_PER_PAGE,
  REGISTER_STARTUP_TOTAL_PAGES,
  FIRST_PAGE,
  SECOND_PAGE,
  THIRD_PAGE,
  FOURTH_PAGE,
  IBGE_LOCALIDADES_BASE_URL,
  MG,
  STAGES,
  DIFICULTIES,
  DEVELOPMENTS,
  REQUIRED_MSG,
  STARTUP_CONNECTION_PREFS,
} from '../../utils/constants';
import isFirefoxAndMobile from '../../utils/browsers';
import ModalInfo from '../../components/ModalInfo';
import { useAuth } from '../../contexts/auth';
import useAsync from '../../hooks/useAsync';
import { required } from '../../utils/validations';
import { getPrevEndpoint } from '../Profile';
import {
  h1Style,
  formItemStyle,
  selectStyle,
  submitBtnStyle,
} from './OnboardingStartup.AntdStyle';
import styles from './OnboardingStartup.module.css';

const { Option } = Select;

function OnboardingStartup() {
  const { isLoading, isError, error, run } = useAsync();
  const { user, logout, register, updatePrefs } = useAuth();
  const orgIdx = 0;
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [formData, setFormData] = useState(
    _.pick(user.orgs[orgIdx].connectionPrefs, STARTUP_CONNECTION_PREFS),
  );
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get(
          `${IBGE_LOCALIDADES_BASE_URL}/estados/${MG}/municipios?orderBy=nome`,
        )
        .catch(error => error);

      const cities = response.data;

      setLocations(() => {
        const neededValues = [];
        cities.forEach(city => {
          neededValues.push({ value: city.id, label: city.nome });
        });
        locations.push(neededValues);
        return neededValues;
      });
    };

    fetchData();
  }, []);

  const onChangeLocation = value => {
    setFormData(prev => ({ ...prev, headOfficeCity: value }));
  };

  const onChangeStages = value => {
    setFormData(prev => ({ ...prev, stage: value }));
  };

  const onChangeDificulties = value => {
    setFormData(prev => ({ ...prev, dificulties: value }));
  };

  const onChangeDevelopments = value => {
    setFormData(prev => ({ ...prev, developments: value }));
  };

  const onArrowLeftClick = () => {
    const prevEndpoint = getPrevEndpoint();
    if (prevEndpoint === '/profile') {
      history.goBack();
    } else {
      logout();
      history.push('/register');
    }
  };

  const onFinishForm = () => {
    const prevEndpoint = getPrevEndpoint();
    if (prevEndpoint === '/profile') {
      const data = { email: user.email, connectionPrefs: formData };
      run(updatePrefs(data)).then(() =>
        message.success({
          key: 'successful',
          content: 'Preferências atualizadas com sucesso!',
          duration: 5,
          onClose: history.push(prevEndpoint),
          onClick: () => message.destroy('successful'),
        }),
      );
    } else {
      const newUser = { ...user };
      newUser.orgs[orgIdx].connectionPrefs = formData;
      run(register(newUser)).then(() =>
        message.success({
          key: 'successful',
          content: 'Cadastro efetuado com sucesso!',
          duration: 3,
          onClose: history.push('/'),
          onClick: () => message.destroy('successful'),
        }),
      );
    }
  };

  return (
    <div className={styles.Container}>
      <h1 style={h1Style}>{user.orgs[orgIdx].startupOuEBT}</h1>
      <Form
        className={styles.FormContainer}
        requiredMark={false}
        onFinish={onFinishForm}
      >
        <Form.Item
          className={styles.ArrowBack}
          hidden={currentPage !== FIRST_PAGE}
          name="arrowBack"
        >
          <ArrowLeftOutlined onClick={onArrowLeftClick} />
        </Form.Item>

        <Form.Item
          hidden={currentPage !== FIRST_PAGE}
          name={STARTUP_CONNECTION_PREFS[FIRST_PAGE - 1]}
          initialValue={formData.headOfficeCity}
          label={
            <span>
              Em qual cidade a sede da <strong>{user.orgs[orgIdx].name}</strong>
              <br /> se encontra?
            </span>
          }
          colon={false}
          rules={[required(REQUIRED_MSG)]}
          required
          className={styles.FormItem}
          style={formItemStyle}
        >
          <Select
            size="large"
            placeholder="Selecione a cidade"
            optionLabelProp="label"
            value={formData.headOfficeCity}
            onChange={onChangeLocation}
            showSearch
            menuItemSelectedIcon={
              <CheckOutlined className={styles.OptionItem} />
            }
            style={selectStyle}
          >
            {locations.map(location => (
              <Option
                size="large"
                key={location.value}
                value={location.label}
                label={location.label}
              >
                <div className={styles.OptionItem}>{location.label}</div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          hidden={currentPage !== SECOND_PAGE}
          name={STARTUP_CONNECTION_PREFS[SECOND_PAGE - 1]}
          initialValue={formData.stage}
          label={
            <span>
              Qual a fase de negócios da{' '}
              <strong>{user.orgs[orgIdx].name}</strong>?
            </span>
          }
          colon={false}
          rules={[required(REQUIRED_MSG)]}
          required
          className={styles.FormItem}
          style={formItemStyle}
        >
          <Select
            size="large"
            placeholder="Selecione a fase"
            optionLabelProp="label"
            value={formData.stage}
            onChange={onChangeStages}
            showSearch={false}
            menuItemSelectedIcon={
              <CheckOutlined className={styles.OptionItem} />
            }
            listHeight={260}
            style={selectStyle}
          >
            {STAGES.map(stage => (
              <Option
                size="large"
                key={stage.value}
                value={stage.label}
                label={stage.label}
              >
                <div className={styles.OptionItem}>{stage.label}</div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item hidden={currentPage !== SECOND_PAGE}>
          <QuestionCircleOutlined
            className={styles.Help}
            onClick={() => ModalInfo(STARTUP_CONNECTION_PREFS[SECOND_PAGE - 1])}
          />
        </Form.Item>

        <Form.Item
          hidden={currentPage !== THIRD_PAGE}
          name={STARTUP_CONNECTION_PREFS[THIRD_PAGE - 1]}
          initialValue={formData.dificulties}
          label={
            <span>
              Qual(ais) é(são) a(s) principal(is) dificuldade(s) da{' '}
              <strong>{user.orgs[orgIdx].name}</strong>?
            </span>
          }
          colon={false}
          rules={[required(REQUIRED_MSG)]}
          required
          className={styles.FormItem}
          style={formItemStyle}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Selecione a(s) dificuldade(s)"
            optionLabelProp="label"
            value={formData.dificulties}
            onChange={onChangeDificulties}
            showSearch={false}
            virtual={false}
            menuItemSelectedIcon={
              <CheckOutlined className={styles.OptionItem} />
            }
            style={selectStyle}
          >
            {DIFICULTIES.map(dificulty => (
              <Option
                size="large"
                key={dificulty.value}
                value={dificulty.label}
                label={dificulty.label}
              >
                <div className={styles.OptionItem}>{dificulty.label}</div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          hidden={currentPage !== FOURTH_PAGE}
          name={STARTUP_CONNECTION_PREFS[FOURTH_PAGE - 1]}
          initialValue={formData.developments}
          label={
            <span>
              Quais programas de desenvolvimento a{' '}
              <strong>{user.orgs[orgIdx].name}</strong> participou?
            </span>
          }
          colon={false}
          rules={[required(REQUIRED_MSG)]}
          required
          className={styles.FormItem}
          style={formItemStyle}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Selecione o(s) programa(s)"
            optionLabelProp="label"
            value={formData.developments}
            onChange={onChangeDevelopments}
            showSearch={false}
            virtual={false}
            menuItemSelectedIcon={
              <CheckOutlined className={styles.OptionItem} />
            }
            style={selectStyle}
          >
            {DEVELOPMENTS.map(development => (
              <Option
                size="large"
                key={development.value}
                value={development.label}
                label={development.label}
              >
                <div className={styles.OptionItem}>{development.label}</div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item hidden={currentPage !== FOURTH_PAGE} style={submitBtnStyle}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={currentPage !== FOURTH_PAGE}
          >
            Concluir
          </Button>
        </Form.Item>
      </Form>
      <div
        className={
          isFirefoxAndMobile() ? styles.PaginationFirefox : styles.Pagination
        }
      >
        <Pagination
          size="default"
          simple
          onChange={page => setCurrentPage(page)}
          current={currentPage}
          defaultPageSize={DATA_ITEMS_PER_PAGE}
          total={REGISTER_STARTUP_TOTAL_PAGES}
        />
      </div>
      {isLoading ? <Spin /> : null}
      {isError ? <p>{error.response.data}</p> : null}
    </div>
  );
}

export default OnboardingStartup;
