const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const succesTemplate = document.querySelector('#success').content.querySelector('.success');


const showErrorMessage = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    errorElement.remove();
  });
};

const showSuccessMessage = () => {
  const successElement = succesTemplate.cloneNode(true);
  document.body.append(successElement);

  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    successElement.remove();
  });
};

export {showErrorMessage, showSuccessMessage};
