import { primaryRed, linkDefaultColor, linkedinBlue } from '../utils/colors';

function OrgDetailsAntdStyle() {
  const iconStyle = {
    fontSize: 24,
    color: 'black',
    marginRight: 7,
  };

  const linkedinIconStyle = { ...iconStyle, color: linkedinBlue };

  const h1Style = { color: primaryRed };

  const linkTextStyle = {
    fontSize: 16,
    padding: 0,
    maxWidth: 'calc(100% - 35px)',
    verticalAlign: 'text-bottom',
    color: linkDefaultColor,
  };

  return {
    iconStyle,
    linkedinIconStyle,
    h1Style,
    linkTextStyle,
  };
}

export default OrgDetailsAntdStyle;
