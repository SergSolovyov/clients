import {getClients} from "../api/on-save-edit.js";

export function createHeader() {
  const header = document.createElement('header');
  const container = document.createElement('div');
  const logo = document.createElement('a');
  const logoImg = document.createElement('img');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const searchList = document.createElement('ul');

  logo.href = 'index.html';
  logoImg.src = './images/logo.svg';
  logoImg.alt = 'Логотип сайта';
  input.placeholder = 'Введите запрос';

  container.classList.add('container', 'header__container');
  header.classList.add('header');
  logo.classList.add('header__logo');
  form.classList.add('header__form');
  input.classList.add('header__input');
  searchList.classList.add('list-reset', 'search-list');

  let timerId;

  input.addEventListener('input', async () => {
    clearTimeout(timerId);
    searchList.innerHTML = '';
    searchList.classList.remove('active');

    timerId = setTimeout(async () => {
      await createSearchElements(input, searchList);
    }, 300);
  })

  form.append(input, searchList);
  logo.append(logoImg);
  container.append(logo, form)
  header.append(container);

  return header
}

async function filter(value) {
  value = value.toLowerCase()
  const clientsArr = await getClients();
  return [...clientsArr.filter(client => {
    return client['name'].toLowerCase().includes(value) ||
      client['surname'].toLowerCase().includes(value) ||
      client['lastName'].toLowerCase().includes(value)
  })]
}

async function createSearchElements(searchValue, root) {
  const searchClientsArr = await filter(searchValue.value);
  if (!searchValue.value || !searchClientsArr.length) return;
  root.classList.add('active');
  const clientsElements = document.querySelectorAll('.body__row');
  clientsElements.forEach(element => element.classList.remove('focus'));

  let clientFocusedElement;
  let currentLink;
  searchClientsArr.forEach(client => {
    const listItem = document.createElement('li');
    const listLink = document.createElement('a');

    listLink.href = `#${client.id}`;
    listLink.classList.add('search-link', 'link-reset');
    listLink.textContent = client.name + ' ' + client.surname + ' ' + client.lastName;

    listLink.addEventListener('click', (e) => {
      currentLink = e.target;
      root.classList.remove('active');
      root.innerHTML = '';
      searchValue.value = '';

      clientFocusedElement = document.getElementById(client.id);
      clientFocusedElement.classList.add('focus');
    })

    listItem.append(listLink);
    root.append(listItem);
  })

  document.addEventListener('click', e => {
    if (e.target !== currentLink) {
      clientsElements.forEach(element => element.classList.remove('focus'));
    }
  }, true);
}
