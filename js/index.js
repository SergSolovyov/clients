import {createHeader} from "./view/create-header.js";
import {createMain} from "./view/create-main.js";
import {getClients} from "./api/on-save-edit.js";
import {createClientsElements} from "./view/create-clients-elements.js";
import {createPreloader} from './view/create-preloader.js';
import {sortedClients} from "./view/sorted-table.js";
import {selectSortedField} from "./view/sorted-table.js";
import {getClient} from "./api/on-save-edit.js";
import {createModalWithForm} from "./view/create-modal-with-form.js";
(async () => {
  async function createApp() {
    const header = createHeader();
    const main = createMain();

    document.body.append(header, main);

    const preloader = createPreloader();
    const table = document.querySelector('.table');

    try {
      table.append(preloader)
      const clients = await getClients();
      if (clients.length) createClientsElements(clients);
    } finally {
      preloader.remove()
    }

    const headButtons = document.querySelectorAll('.head-btn');
    headButtons.forEach(headBtn => {
      headBtn.addEventListener('click', async (e) => {
        const selectField = selectSortedField(headButtons, e.target)
        const field = selectField.field;
        const flag = selectField.flagSorted;
        const sortedArr = await sortedClients(field, flag);
        await createClientsElements(sortedArr);
      })
    })


  }

  const clientId = new URLSearchParams(window.location.search).get('id');

  if (clientId) {
    const client = await getClient(clientId);
    const clientPage = await createModalWithForm(client, 'Данные клиента');
    clientPage.querySelectorAll('button').forEach(btn => {
      btn.setAttribute('disabled', 'true');
      btn.style.pointerEvents = 'none';
      btn.style.opacity = '0.5';
    })
    document.body.append(clientPage);

  } else {
    await createApp();
  }
})();


