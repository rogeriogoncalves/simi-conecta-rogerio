import { useState } from 'react';
import { primaryRed, transparentTitle, linkedinBlue } from '../utils/colors';

function ProfileAntdStyle() {
  const iconStyle = {
    fontSize: 24,
    color: 'black',
    marginRight: 7,
  };

  const saveIconStyle = { ...iconStyle, color: 'white' };

  const contactIconStyle = { float: 'left', marginTop: 4 };

  const contactIconsStyle = {
    linkedin: { ...iconStyle, color: linkedinBlue, ...contactIconStyle },
    mail: { ...iconStyle, ...contactIconStyle },
    website: { ...iconStyle, ...contactIconStyle },
  };

  const h1Style = { color: primaryRed };

  const formItemStyle = { margin: 0, maxWidth: 'calc(100% - 35px)' };

  const inputStyle = {
    maxWidth: '95%',
    verticalAlign: 'text-bottom',
  };

  const descriptionInputStyle = {
    fontSize: 16,
    height: 217,
    resize: 'none',
  };

  const [editableStyle, setEditableStyle] = useState({
    color: transparentTitle,
    width: '100%',
    minWidth: '100px',
    margin: 0,
    padding: inputStyle.padding,
  });

  const onBlurOrgName = () =>
    setEditableStyle(prev => ({
      ...prev,
      color: transparentTitle,
    }));

  const onEditOrgName = () =>
    setEditableStyle(prev => ({
      ...prev,
      ...h1Style,
    }));

  const btnLabelStyle = { alignSelf: 'center' };

  const ghostBtnStyle = {
    color: 'black',
    borderColor: 'black',
    margin: '10px auto',
    fontSize: 16,
    display: 'inline-flex',
    flexDirection: 'row',
    alignContent: btnLabelStyle.alignSelf,
  };

  return {
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
  };
}

export default ProfileAntdStyle;
