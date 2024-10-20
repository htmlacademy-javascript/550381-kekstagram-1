import { getData, sendData } from './api.js';
import { renderGalery } from './galery.js';
import { debounce, showAlert } from './utils.js';
import { onFormSubmit, closeModalForm } from './forms.js';
import { showErrorMessage, showSuccessMessage } from './message.js';
import { init, getFilteredPictures } from './filters.js';


try {
  const data = await getData();
  init(data, debounce(renderGalery));
  renderGalery(getFilteredPictures());
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
