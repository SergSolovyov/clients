import {iconAddClient} from "./svg.js";
import {createModalWithForm} from './create-modal-with-form.js';

export function createBtnAddClient() {
  const btnAdd = document.createElement('button');
  const btnAddIcon = document.createElement('span')
  const btnAddText = document.createElement('span');

  btnAddIcon.innerHTML = iconAddClient;
  btnAddText.textContent = 'Добавить клиента';

  btnAdd.classList.add('btn-reset', 'btn-add-client');
  btnAddText.classList.add('btn-add-client-text');
  btnAddIcon.classList.add('btn-add-icon');

  btnAdd.append(btnAddIcon, btnAddText);

  btnAdd.addEventListener('click', () => {
    const modal = createModalWithForm();
    document.body.append(modal);
  })


  return btnAdd;

}
