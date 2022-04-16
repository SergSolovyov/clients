
export function createTable() {
  const table = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableHeadRow = document.createElement('tr');

  const tableColumnId = document.createElement('th');
  const tableColumnName = document.createElement('th');
  const tableColumnDateCreated = document.createElement('th');
  const tableColumnDateChanged = document.createElement('th');
  const tableColumnContacts = document.createElement('th');
  const tableColumnEvents = document.createElement('th');

  const tableBody = document.createElement('tbody');

  const buttonId = document.createElement('button');
  const buttonIdText = document.createElement('span');
  const buttonIdIcon = document.createElement('span');
  buttonId.dataset.field = 'id';
  buttonId.dataset.sorted = 'true';

  const buttonName = document.createElement('button');
  const buttonNameText = document.createElement('span');
  const buttonNameIcon = document.createElement('span');
  const buttonNameIconLetters = document.createElement('span');
  buttonName.dataset.field = 'name';
  buttonName.dataset.sorted = 'false';

  const buttonDateCreated = document.createElement('button');
  const buttonDateCreatedText = document.createElement('span');
  const buttonDateCreatedIcon = document.createElement('span');
  buttonDateCreated.dataset.field = 'createdAt';
  buttonDateCreated.dataset.sorted = 'false';

  const buttonDateChanged = document.createElement('button');
  const buttonDateChangedText = document.createElement('span');
  const buttonDateChangedIcon = document.createElement('span');
  buttonDateChanged.dataset.field = 'updatedAt';
  buttonDateChanged.dataset.sorted = 'false';

  const contactsTitle = document.createElement('span');
  const eventsTitle = document.createElement('span');

  table.classList.add('table');
  tableHead.classList.add('table__head');
  tableBody.classList.add('table__body');

  buttonId.classList.add('btn-reset', 'head__btn--id', 'head-btn', 'selected');
  buttonIdText.classList.add('btn-id-text', 'head-btn-text');
  buttonIdIcon.classList.add('btn-id-icon', 'icon-arrow');

  buttonIdText.textContent = 'ID';

  buttonName.classList.add('btn-reset', 'head__btn--name', 'head-btn');
  buttonNameText.classList.add('btn-name-text', 'head-btn-text');
  buttonNameIcon.classList.add('btn-name-icon', 'icon-arrow');
  buttonNameIconLetters.classList.add('btn-name-icon-letters');

  buttonNameText.textContent = 'Фамилия Имя Отчество';
  buttonNameIconLetters.textContent = 'А-Я';

  buttonDateCreated.classList.add('btn-reset', 'head__btn--date-created', 'head-btn');
  buttonDateCreatedText.classList.add('btn-date-created-text', 'head-btn-text');
  buttonDateCreatedIcon.classList.add('btn-date-created-icon', 'icon-arrow');

  buttonDateCreatedText.textContent = 'Дата и время создания';

  buttonDateCreated.classList.add('btn-reset', 'head__btn--date-created', 'head-btn');
  buttonDateCreatedText.classList.add('btn-date-created-text', 'head-btn-text');
  buttonDateCreatedIcon.classList.add('btn-date-created-icon', 'icon-arrow');

  buttonDateCreatedText.textContent = 'Дата и время создания';

  buttonDateChanged.classList.add('btn-reset', 'head__btn--date-created', 'head-btn');
  buttonDateChangedText.classList.add('btn-date-created-text', 'head-btn-text');
  buttonDateChangedIcon.classList.add('btn-date-created-icon', 'icon-arrow');

  buttonDateChangedText.textContent = 'Последние изменения';

  contactsTitle.classList.add('head-btn-text');
  eventsTitle.classList.add('head-btn-text');

  contactsTitle.textContent = 'Контакты';
  eventsTitle.textContent = 'Действия';

  table.append(tableHead, tableBody);
  tableHead.append(tableHeadRow);
  tableHeadRow.append(
    tableColumnId,
    tableColumnName,
    tableColumnDateCreated,
    tableColumnDateChanged,
    tableColumnContacts,
    tableColumnEvents
  );

  tableColumnId.append(buttonId);
  buttonId.append(buttonIdText, buttonIdIcon);
  tableColumnName.append(buttonName);
  buttonName.append(buttonNameText, buttonNameIcon, buttonNameIconLetters);
  tableColumnDateCreated.append(buttonDateCreated);
  buttonDateCreated.append(buttonDateCreatedText, buttonDateCreatedIcon)
  tableColumnDateChanged.append(buttonDateChanged);
  buttonDateChanged.append(buttonDateChangedText, buttonDateChangedIcon)
  tableColumnContacts.append(contactsTitle);
  tableColumnEvents.append(eventsTitle);

  return table
}
