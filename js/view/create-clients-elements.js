import {createModalDeleted} from "./create-modal-deleted.js";
import {createModalWithForm} from "./create-modal-with-form.js";
import {copyIcon} from "./svg.js";

export function createClientsElements(clients) {
  // if (!clients.length) return;
  const tableBody = document.querySelector('.table__body');
  tableBody.innerHTML = ' ';

  clients.forEach(client => {
    const bodyRow = document.createElement('tr');
    const clientId = document.createElement('td');
    const clientFullName = document.createElement('td');
    const clientDateCreated = document.createElement('td');
    const clientDateChanged = document.createElement('td');
    const clientContacts = document.createElement('td');
    const clientEvents = document.createElement('td');

    clientId.textContent = client._id;
    clientFullName.textContent = [client.surname, client.name, client.lastName].map(name => transformationNames(name)).join(' ');
    clientDateCreated.append(modificationDate(client.createdAt));
    clientDateChanged.append(modificationDate(client.updatedAt));
    clientContacts.append(createContactsElements(client.contacts));
    clientEvents.append(createContactsButtons(client));

    bodyRow.id = client._id;

    bodyRow.classList.add('body__row');
    clientId.classList.add('body__id');
    clientFullName.classList.add('body__name');

    bodyRow.append(
      clientId,
      clientFullName,
      clientDateCreated,
      clientDateChanged,
      clientContacts,
      clientEvents
    )

    tableBody.append(bodyRow)
  })
}

function createContactsElements(contacts) {
  const contactsList = document.createElement('ul');
  const btnMoreContacts = document.createElement('button');
  const btnMoreItem = document.createElement('li');

  contactsList.classList.add('list-reset', 'contacts__list');
  btnMoreContacts.classList.add('btn-reset', 'btn-more-contacts');

  function createContactsLinks(contacts) {
    contacts.forEach(contact => {
      const contactsItem = document.createElement('li');
      const contactLink = document.createElement('a');
      contactLink.href = createLinkHref(contact.type, contact.value);
      contactLink.dataset.description = createLinkDescription(contact.type);

      const linkDescription = contactLink.getAttribute('data-description');

      tippy(contactLink, {
        content: linkDescription + contact.value
      })

      contactLink.classList.add(`link-${contact.type}`, 'contacts-link');
      contactsItem.classList.add('contacts__item');

      contactsItem.append(contactLink);
      contactsList.append(contactsItem)
    })
  }

  if (contacts.length > 4) {
    btnMoreContacts.classList.add('active');
    createContactsLinks(contacts.slice(0, 4));
    btnMoreContacts.textContent = `+${contacts.length - 4}`;
  } else {
    createContactsLinks(contacts)
  }

  btnMoreContacts.addEventListener('click', () => {
    btnMoreContacts.classList.remove('active');
    createContactsLinks(contacts.slice(4));
  })

  btnMoreItem.append(btnMoreContacts);
  contactsList.append(btnMoreItem);

  return contactsList
}

function createLinkDescription(type) {
  if (type === 'number') return 'Телефон: ';
  if (type === 'email') return 'Email: ';
  if (type === 'vk') return 'Vk: ';
  if (type === 'fb') return 'Fb: ';
  if (type === 'other') return 'Контакт: ';
}

function modificationDate(date) {
  const dateWrapper = document.createElement('div');
  const inputDate = new Date(date);
  const dateElement = document.createElement('span');
  const timeElement = document.createElement('span');

  dateElement.textContent = `${(inputDate.getDay() < 28 ? '0' : '') + inputDate.getDay()}.${(inputDate.getMonth() < 10 ? '0': '') + inputDate.getMonth()}.${inputDate.getFullYear()}`;
  timeElement.textContent = `${inputDate.getHours()}:${(inputDate.getMinutes() < 10 ? '0' : '') + inputDate.getMinutes()}`;

  dateElement.classList.add('body__date');
  timeElement.classList.add('body__time');

  dateWrapper.append(dateElement, timeElement);

  return dateWrapper
}

function createLinkHref(type, value) {
  if (type === 'number') return `tel:${value}`;
  if (type === 'email') return `mailto: ${value}`;
  return value;
}

function createContactsButtons(client) {
  const buttonsElement = document.createElement('div');
  const editBtn = document.createElement('button');
  const editBtnIcon = document.createElement('span');
  const editBtnText = document.createElement('span');
  const deleteBtn = document.createElement('button');
  const deleteBtnIcon = document.createElement('span');
  const deleteBtnText = document.createElement('span');
  const btnCopyLink = document.createElement('button');
  const btnCopyLinkIcon = document.createElement('span');

  editBtnText.textContent = 'Изменить';
  deleteBtnText.textContent = 'Удалить';
  btnCopyLinkIcon.innerHTML = copyIcon;

  buttonsElement.classList.add('contacts-btn-container');
  editBtn.classList.add('contacts__btn-edit', 'btn-reset');
  editBtnIcon.classList.add('btn-edit-icon');
  editBtnText.classList.add('btn-edit-text');
  deleteBtn.classList.add('contacts__btn-delete', 'btn-reset');
  deleteBtnIcon.classList.add('btn-delete-icon');
  deleteBtnText.classList.add('btn-delete-text');
  btnCopyLink.classList.add('btn-reset', 'btn-copy');

  deleteBtn.addEventListener('click', () => {
    const modalDeleted = createModalDeleted(client);
    document.body.append(modalDeleted);
  });

  editBtn.addEventListener('click', () => {
    const editModal = createModalWithForm(client, 'Изменить данные');
    document.body.append(editModal);
  })

  const instance = tippy(btnCopyLink, {
    content: 'Нажмите чтобы скопировать ссылку на клиента',
    hideOnClick: false,
    onHidden(btnCopyLink) {
      btnCopyLink.setProps({
        content: 'Нажмите чтобы скопировать ссылку на клиента',
      })
    }
  });
  btnCopyLink.addEventListener('click', e => {
    const locationHref = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(`${locationHref}?id=${client._id}`).then(res => {
      instance.setProps({
        content: 'Ссылка скопирована в буфер обмена'
      })
    })
  })

  editBtn.append(editBtnIcon, editBtnText);
  deleteBtn.append(deleteBtnIcon, deleteBtnText);
  btnCopyLink.append(btnCopyLinkIcon);
  buttonsElement.append(editBtn, deleteBtn, btnCopyLink);

  return buttonsElement;
}

function transformationNames(string) {
  return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
}
