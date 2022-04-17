import {createClientsElements} from "../view/create-clients-elements.js";

export async function onSave(data, method, contactsInputs) {
  const errors = [];
  const errorsContacts = [];
  const regExp = /^[a-zа-яе-ё]+$/i;
  const regExpNum = /[0-9\\+]+$/;

  if (!data.surname.trim()) {
    errors.push({
      name: 'surname',
      message: 'Фамилия обязательна для заполнения.'
    })
  }

  if (!data.name.trim()) {
    errors.push({
      name: 'name',
      message: 'Имя обязательно для заполнения.'
    })
  }
  if (!regExp.test(data.surname.trim()) && data.surname) {
    errors.push({
      name: 'surname',
      message: 'Фамилия не должна содержать спецсимволов и цифр.'
    })
  }
  if (!regExp.test(data.name.trim()) && data.name) {
    errors.push({
      name: 'name',
      message: 'Имя не должно содержать спецсимволов и цифр.'
    })
  }

  if (contactsInputs.length) {
    contactsInputs.forEach(input => {
      if (!input.value) {
        errorsContacts.push({
          element: input.element,
          message: 'Поле обязательно для заполнения.'
        })
      }
      if (input.type === 'number' && !regExpNum.test(input.value) && input.value) {
        errorsContacts.push({
          element: input.element,
          message: 'Введите только цифры и знак "+".'
        })
      }
      if (input.type === 'email' && input.value && (!input.value.includes('@') || !input.value.includes('.'))) {
        errorsContacts.push({
          element: input.element,
          message: 'Недопустимый формат'
        })
      }
    })
  }

  if (errors.length || errorsContacts.length) {
    const err = new TypeError();
    err.errorMessages = errors;
    err.errorContactsMessages = errorsContacts;

    throw err
  }

  const clientId = method === 'POST' ? '' : data._id;
  
  const response = await fetch(`https://salty-bayou-58928.herokuapp.com/api/clients/${clientId}`, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    }
  })

  if (response.status >= 400) {
    const err = new TypeError();
    errors.push({
      message: 'Не удалось добавить клиента, попробуйте обновить страницу.'
    })
    err.serverErrorMessage = errors;
    throw err;
  }

  const clients = await getClients();
  createClientsElements(clients);
}

export async function getClients() {
  const response = await fetch('https://salty-bayou-58928.herokuapp.com/api/clients', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    }
  })
  const result = await response.json();

  return result
}

export async function getClient(id) {
  const response = await fetch(`https://salty-bayou-58928.herokuapp.com/api/clients/`, {
    method: 'GET'
  })
  let result = await response.json();
  result = result.find(item => item._id === id)
  return result
}

export async function onDelete(client) {
  console.log(client)
  await fetch(`https://salty-bayou-58928.herokuapp.com/api/clients/${client._id}`, {
    method: 'DELETE'
  })
  const clients = await getClients();
  await createClientsElements(clients);
}
