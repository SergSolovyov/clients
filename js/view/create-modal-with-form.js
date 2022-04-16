import {iconSetContact} from "./svg.js";
import {iconDeleteContact} from "./svg.js";
import {onSave} from "../api/on-save-edit.js";
import {createModalDeleted} from "./create-modal-deleted.js";
import {createPreloader} from "./create-preloader.js";

export function createModalWithForm(client = null, title = 'Новый клиент') {
  const modalElement = document.createElement('div');
  const modalBtnClosed = document.createElement('button');

  const form = document.createElement('form');
  const formWrapperData = document.createElement('div');
  const formWrapperContacts = document.createElement('div');
  const formTitle = document.createElement('span');
  const placeholderContainerSurname = document.createElement('div');
  const inputSurname = document.createElement('input');
  const labelSurname = document.createElement('label');
  const placeholderContainerName = document.createElement('div');
  const inputName = document.createElement('input');
  const labelName = document.createElement('label');
  const placeholderContainerLastname = document.createElement('div');
  const inputLastname = document.createElement('input');
  const labelLastname = document.createElement('label');
  const btnAddContact = document.createElement('button');
  const btnAddContactIcon = document.createElement('span');
  const btnAddContactText = document.createElement('span');
  const btnSaveClient = document.createElement('button');
  const btnCancelClient = document.createElement('button');
  const contactElements = document.createElement('div');
  const clientId = document.createElement('span');
  const formErrors = document.createElement('div');

  formTitle.textContent = title;
  // client === null ? formTitle.textContent = 'Новый клиент' : formTitle.textContent = 'Изменить данные';
  client === null ? clientId.textContent = '' : clientId.textContent = `ID: ${client.id}`;
  labelSurname.textContent = 'Фамилия';
  labelName.textContent = 'Имя';
  labelLastname.textContent = 'Отчество';

  if (client !== null) {
    inputSurname.value = client.surname;
    inputName.value = client.name;
    inputLastname.value = client.lastName

    btnCancelClient.addEventListener('click', () => {
      const modalDeleted = createModalDeleted(client);
      document.body.append(modalDeleted);
    })

    if (client.contacts.length > 0) {
      client.contacts.forEach(contact => {
        contactElements.append(createContactInput(contact));
      })
    }
  }

  inputSurname.placeholder = ' ';
  inputName.placeholder = ' ';
  inputLastname.placeholder = ' ';

  btnAddContact.type = 'button';
  btnAddContactText.textContent = 'Добавить контакт';

  btnSaveClient.textContent = 'Сохранить';
  client === null ? btnCancelClient.textContent = 'Отмена' : btnCancelClient.textContent = 'Удалить клиента';
  btnSaveClient.type = 'submit';
  btnCancelClient.type = 'button';
  modalBtnClosed.type = 'button';

  modalElement.classList.add('modal-element');
  form.classList.add('form');
  formWrapperData.classList.add('form-wrapper-data');
  formWrapperContacts.classList.add('form-wrapper-contacts');
  formTitle.classList.add('form-title', 'main-title');
  placeholderContainerSurname.classList.add('placeholder-container');
  placeholderContainerName.classList.add('placeholder-container');
  placeholderContainerLastname.classList.add('placeholder-container');
  inputSurname.classList.add('form-input', 'input-reset');
  inputName.classList.add('form-input', 'input-reset');
  inputLastname.classList.add('form-input', 'input-reset');
  labelSurname.classList.add('form-label');
  labelName.classList.add('form-label');
  labelLastname.classList.add('form-label-lastname');
  contactElements.classList.add('contact-elements');
  clientId.classList.add('modal-client-id');
  formErrors.classList.add('form-errors');

  inputName.name = 'name';
  inputSurname.name = 'surname';
  inputLastname.name = 'lastName';

  btnAddContact.classList.add('btn-reset', 'btn-add-contact');
  btnAddContactIcon.classList.add('btn-add-contact-icon');
  btnAddContactText.classList.add('btn-add-contact-text');

  btnSaveClient.classList.add('btn-reset', 'btn-save-client', 'btn-main');
  btnCancelClient.classList.add('btn-reset', 'btn-cancel-client', 'modal-btn-second');
  modalBtnClosed.classList.add('btn-reset', 'btn-cancel-modal');

  form.append(formWrapperData, modalBtnClosed, formWrapperContacts, formErrors, btnSaveClient, btnCancelClient);
  formWrapperData.append(formTitle, clientId, placeholderContainerSurname, placeholderContainerName, placeholderContainerLastname);
  placeholderContainerSurname.append(inputSurname, labelSurname);
  placeholderContainerName.append(inputName, labelName);
  placeholderContainerLastname.append(inputLastname, labelLastname);

  formWrapperContacts.append(contactElements ,btnAddContact);
  btnAddContact.append(btnAddContactIcon, btnAddContactText);

  modalElement.append(form);

  document.body.addEventListener('click', e => {
    if (e.target === modalElement || e.target === btnCancelClient || e.target === modalBtnClosed) {
      modalElement.remove();
    }
  }, true);


  btnAddContact.addEventListener('click', () => {
    const contactInput = createContactInput();
    contactElements.append(contactInput);
    if (contactElements.children.length >= 10) btnAddContact.setAttribute('disabled', 'true');
  });

  [inputSurname, inputName, inputLastname].forEach(input => {
    input.addEventListener('input', () => input.classList.remove('is-invalid'));
  });


  form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = {};
    const contacts = [];
    const contactsInputs = document.querySelectorAll('.contact-input');
    const inputs = {};
    const contactsInputsArr = [];

    [inputSurname, inputName, inputLastname].forEach(input => {
      data[input.name] = input.value;
      inputs[input.name] = input;
      input.classList.remove('is-invalid');
    })

    contactsInputs.forEach(inputContact => {
      contacts.push({
        type: inputContact.name,
        value: inputContact.value,
      });
      contactsInputsArr.push({
        element: inputContact,
        value: inputContact.value,
        type: inputContact.name
      })
    })

    try {
      btnSaveClient.setAttribute('disabled', 'true');
      let method = null;
      data.contacts = contacts;
      if (client !== null) {
        method = 'PATCH';
        client.name = data.name;
        client.surname = data.surname;
        client.lastname = data.lastName;
        client.contacts = data.contacts

        await onSave(client, method, contactsInputsArr);
        modalElement.remove();
      } else {
        method = 'POST';
        await onSave(data, method, contactsInputsArr);
        modalElement.remove();
      }

    } catch (error) {
      if (error.name !== 'TypeError') throw error;

      if (error.errorMessages) {
        error.errorMessages.forEach(errorMessage => {
          inputs[errorMessage.name].classList.add('is-invalid');
        })

        formErrors.textContent = error.errorMessages.map(errorMessage => errorMessage.message).join(' ');
      }

      if (error.errorContactsMessages) {
        error.errorContactsMessages.forEach(input => {
          input.element.classList.add('is-invalid');
          input.element.nextElementSibling.textContent = input.message;
        })
      }

      if (error.serverErrorMessage) {
        formErrors.textContent = error.serverErrorMessage.map(message => message.message).join(' ');
      }
    } finally {
      btnSaveClient.removeAttribute('disabled');
    }
  })

  return modalElement;
}

function createContactInput(contact = null ) {
  const contactElement = document.createElement('div');
  const contactListWrapper = document.createElement('div');
  const contactList = document.createElement('ul');
  const contactInput = document.createElement('input');
  const btnDeleteContact = document.createElement('button');

  const contactListItemEmail = document.createElement('li');
  const contactListItemVk = document.createElement('li');
  const contactListItemFb = document.createElement('li');
  const contactListItemOther = document.createElement('li');

  const btnNumber = document.createElement('button');
  const btnNumberText = document.createElement('span');
  const btnNumberIcon = document.createElement('span');
  const btnOther = document.createElement('button');
  const btnEmail = document.createElement('button');
  const btnVk = document.createElement('button');
  const btnFb = document.createElement('button');
  const contactError = document.createElement('div');

  let buttonsTypeArr = [
    {name: 'number', text: 'Телефон'},
    {name: 'email', text: 'Email'},
    {name: 'vk', text: 'Vk'},
    {name: 'fb', text: 'Facebook'},
    {name: 'other', text: 'Другое'},
  ]

  if (contact !== null) {
    const searchIndex = buttonsTypeArr.findIndex(btn => btn.name === contact.type);
    buttonsTypeArr.unshift(buttonsTypeArr[searchIndex]);
    buttonsTypeArr.splice(searchIndex + 1, 1);

    btnDeleteContact.classList.add('active');
  }

  contactInput.addEventListener('input', () => {
    contactInput.value.length > 0 ? btnDeleteContact.classList.add('active') : btnDeleteContact.classList.remove('active');
    contactInput.classList.remove('is-invalid');
    contactInput.nextElementSibling.textContent = '';
  })

  for (let i = 0; i < buttonsTypeArr.length; i++) {
    btnNumberText.textContent = buttonsTypeArr[0].text;
    btnEmail.textContent = buttonsTypeArr[1].text;
    btnVk.textContent = buttonsTypeArr[2].text;
    btnFb.textContent = buttonsTypeArr[3].text;
    btnOther.textContent = buttonsTypeArr[4].text;

    btnNumber.dataset.name = buttonsTypeArr[0].name;
    btnEmail.dataset.name = buttonsTypeArr[1].name;
    btnVk.dataset.name = buttonsTypeArr[2].name;
    btnFb.dataset.name = buttonsTypeArr[3].name;
    btnOther.dataset.name = buttonsTypeArr[4].name;
  }

  btnNumberIcon.innerHTML = iconSetContact;

  contactInput.placeholder = 'Введите данные контакта';
  contactInput.name = btnNumber.dataset.name;
  contact === null ? contactInput.name = btnNumber.dataset.name : contactInput.name = contact.type;
  contact === null ? contactInput.value = '' : contactInput.value = contact.value
  btnDeleteContact.innerHTML = iconDeleteContact;
  btnDeleteContact.type = 'button';

  contactElement.classList.add('contact-element');
  contactListWrapper.classList.add('contact-list-wrapper');
  contactList.classList.add('contact-list', 'list-reset');
  contactInput.classList.add('input-reset', 'contact-input');
  btnDeleteContact.classList.add('btn-reset', 'btn-delete-contact');

  [btnNumber, btnOther, btnEmail, btnVk, btnFb].forEach(btn => {btn.type = 'button'});

  [btnEmail, btnVk, btnFb, btnOther].forEach(btnSet => {
    btnSet.addEventListener('click', (e) => {
      let btnTextMain = btnNumberText.textContent;
      let btnNameMain = btnNumber.getAttribute('data-name');

      btnNumberText.textContent = e.currentTarget.textContent;
      e.currentTarget.textContent = btnTextMain;

      btnNumber.dataset.name = e.currentTarget.getAttribute('data-name');
      e.currentTarget.dataset.name = btnNameMain;

      contactInput.name = btnNumber.getAttribute('data-name')

      btnNumber.classList.remove('active');
    });
  });

  btnNumber.classList.add('btn-reset', 'btn-setted-contact');
  btnNumberIcon.classList.add('btn-icon-number');
  btnEmail.classList.add('btn-reset', 'btn-set-contact');
  btnVk.classList.add('btn-reset', 'btn-set-contact');
  btnFb.classList.add('btn-reset', 'btn-set-contact');
  btnOther.classList.add('btn-reset', 'btn-set-contact');
  contactError.classList.add('contact-error');

  btnNumber.addEventListener('click', () => {
    btnNumber.classList.toggle('active');
  });

  btnDeleteContact.addEventListener('click', () => {
    contactElement.remove();
  })

  btnNumber.append(btnNumberText, btnNumberIcon);

  contactListItemEmail.append(btnEmail);
  contactListItemVk.append(btnVk);
  contactListItemFb.append(btnFb);
  contactListItemOther.append(btnOther);

  contactListWrapper.append(btnNumber, contactList)
  contactList.append(contactListItemEmail, contactListItemVk, contactListItemFb, contactListItemOther);
  contactElement.append(contactListWrapper, contactInput, contactError, btnDeleteContact);

  return contactElement
}
