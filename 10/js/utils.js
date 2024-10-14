const HTML_BODY = document.querySelector('body');
const ALERT_SHOW_DELAY = 5000;
const ScaleParams = {
  MIN_SCALE: 25,
  MAX_SCALE: 100,
  STEP_SCALE: 25
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

const createAlert = (container, message) => {
  container.style.zIndex = '100';
  container.style.position = 'absolute';
  container.style.left = 0;
  container.style.top = 0;
  container.style.right = 0;
  container.style.backgroundColor = 'rgb(60, 54, 20)';
  container.style.color = 'rgb(255, 231, 83)';
  container.style.lineHeight = '40px';
  container.style.padding = '30px 10px';
  container.style.fontSize = '32px';
  container.style.fontWeight = '700';
  container.style.textAlign = 'center';
  container.textContent = message;

  HTML_BODY.append(container);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  createAlert(alertContainer, message);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_DELAY);
};

export {
  HTML_BODY,
  isEscapeKey,
  isEnterKey,
  showAlert,
  ScaleParams
};
