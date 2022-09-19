import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { loadingStyle, imgStyle } from './AvatarUpload.AntdStyle';
import styles from './AvatarUpload.module.css';

const { Dragger } = Upload;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Apenas arquivos JPG/PNG são permitidos!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Imagem deve ter tamanho menor que 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class AvatarUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleChange = info => {
    const { status } = info.file;
    const { setState } = this.props;
    if (status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (status === 'done') {
      getBase64(info.file.originFileObj, imgBase64Url => {
        this.setState({
          loading: false,
        });
        setState(prev => ({ ...prev, imageSrc: { text: imgBase64Url } }));
      });
    } else if (status === 'error') {
      message.error(`Upload do arquivo "${info.file.name}" falhou.`);
      this.setState({ loading: false });
      setState(prev => ({ ...prev, imageSrc: { text: '' } }));
    }
  };

  customRequest = ({ onError, onSuccess, file }) => {
    try {
      onSuccess(null, file);
    } catch (e) {
      onError(e);
    }
  };

  render() {
    const { loading } = this.state;
    const { imgSrcState } = this.props;
    const uploadButton = (
      <div>
        {loading ? (
          <LoadingOutlined style={loadingStyle} />
        ) : (
          <UploadOutlined style={loadingStyle} />
        )}
        <div style={{ marginTop: 8 }}>
          Clique ou arraste a imagem da logo da empresa aqui para fazer o upload
        </div>
      </div>
    );
    return (
      <Dragger
        name="avatar"
        className={styles.AvatarUploader}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        customRequest={this.customRequest}
      >
        {imgSrcState ? (
          <img src={imgSrcState} alt="avatar" style={imgStyle} />
        ) : (
          uploadButton
        )}
      </Dragger>
    );
  }
}

export default AvatarUpload;
