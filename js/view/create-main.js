import {createTable} from "./create-table.js";
import {createBtnAddClient} from "./create-btn-add-client.js";

export function createMain() {
  const main = document.createElement('main');
  const mainContainer = document.createElement('div');
  const mainTitle = document.createElement('h1');
  const table = createTable();
  const btnAddClient = createBtnAddClient();

  main.classList.add('main');
  mainContainer.classList.add('main__container', 'container');
  mainTitle.classList.add('main__title');

  mainTitle.textContent = 'Клиенты';

  mainContainer.append(mainTitle, table, btnAddClient);
  main.append(mainContainer);

  return main
}
