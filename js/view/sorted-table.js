import {getClients} from "../api/on-save-edit.js";

export async function sortedClients(field, flag) {
  const clients = await getClients();
  const clientsSortedArr = clients.slice();

  clientsSortedArr.sort((a, b) => a[field] > b[field] ? 1 : -1);

  if (flag === 'false') return clientsSortedArr;
  if (flag === 'true') return clientsSortedArr.reverse();

}

export function selectSortedField(buttonsArray, targetBtn) {
  let field = null;
  let flagSorted = null;
  buttonsArray.forEach(btnAll => btnAll.classList.remove('selected'));
  targetBtn.classList.add('selected');
  buttonsArray.forEach(current => {
    if (!current.classList.contains('selected')) current.dataset.sorted = 'false';
  })

  field = targetBtn.getAttribute('data-field');
  flagSorted = targetBtn.getAttribute('data-sorted');

  flagSorted === 'true' ? targetBtn.dataset.sorted = 'false' : targetBtn.dataset.sorted = 'true';

  return {field, flagSorted}
}
