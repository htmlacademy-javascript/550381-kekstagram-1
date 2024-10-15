import { getData, sendData } from './api.js';
import { renderGalery } from './galery.js';
import { showAlert } from './utils.js';
import { onFormSubmit, closeModalForm } from './forms.js';
import { showErrorMessage, showSuccessMessage } from './message.js';


try {
  const data = await getData();
  renderGalery(data);
} catch (err) {
  showAlert(err.message);
}


onFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModalForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
