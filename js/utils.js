const alertTemplate = document.querySelector('#alert-loader-data').content.querySelector('.alert-loader-data');
const HTML_BODY = document.querySelector('body');
const ALERT_SHOW_DELAY = 5000;
const ScaleParams = {
  MIN_SCALE: 25,
  MAX_SCALE: 100,
  STEP_SCALE: 25
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';


const showAlert = (message) => {
  const alertElement = alertTemplate.cloneNode(true);
  alertElement.textContent = message;
  HTML_BODY.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_DELAY);
};

export {
  HTML_BODY,
  isEscapeKey,
  isEnterKey,
  showAlert,
  ScaleParams
};
