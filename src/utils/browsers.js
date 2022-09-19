const USER_AGENT = window.navigator.userAgent;

function isFirefox() {
  return /FxiOS|Firefox/i.test(USER_AGENT);
}

function isMobile() {
  return /mobile/i.test(USER_AGENT.toLowerCase());
}

export default function isFirefoxAndMobile() {
  return isMobile() && isFirefox();
}
