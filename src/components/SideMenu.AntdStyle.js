import { primaryRed } from '../utils/colors';

const iconStyleFirst = { fontSize: 20 };

const iconStyleOthers = { fontSize: 20, position: 'relative', top: 2 };

const menuStyle = { fontFamily: 'RotisSansSerif' };

const menuItemStyle = { paddingTop: 2 };

const menuLastItemStyle = {
  color: primaryRed,
  fontWeight: 'bold',
  paddingTop: menuItemStyle.paddingTop,
};

export {
  iconStyleFirst,
  iconStyleOthers,
  menuStyle,
  menuItemStyle,
  menuLastItemStyle,
};
