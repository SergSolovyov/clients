import {onDelete} from "../api/on-save-edit.js";

export function createModalDeleted(clientElement, client) {
  const modalElement = document.createElement('div');
  const deletedModalWrapper = document.createElement('div');
  const modalTitle = document.createElement('span');
  const modalText = document.createElement('span');
  const modalBtnDelete = document.createElement('button');
  const modalBtnCancel = document.createElement('button');
  const btnCancelModal = document.createElement('button');

  modalTitle.textContent = 'Удалить клиента';
  modalText.textContent = 'Вы действительно хотите удалить данного клиента?';
  modalBtnDelete.textContent = 'Удалить';
  modalBtnCancel.textContent = 'Отмена';

  modalElement.classList.add('modal-element');
  deletedModalWrapper.classList.add('modal-deleted-container');
  modalTitle.classList.add('main-title', 'modal-deleted-title');
  modalText.classList.add('modal-deleted-text');
  modalBtnDelete.classList.add('btn-reset', 'btn-main', 'modal-btn-deleted');
  modalBtnCancel.classList.add('btn-reset', 'modal-btn-second');
  btnCancelModal.classList.add('btn-reset', 'btn-cancel-modal');

  deletedModalWrapper.append(modalTitle, modalText, modalBtnDelete, modalBtnCancel, btnCancelModal);
  modalElement.append(deletedModalWrapper);

  document.body.addEventListener('click', e => {
    if (e.target === modalElement || e.target === btnCancelModal || e.target === modalBtnCancel) modalElement.remove()
  });

  modalBtnDelete.addEventListener('click', async() => {
    await onDelete(clientElement, client);
    modalElement.remove();
  })
  return modalElement
}
