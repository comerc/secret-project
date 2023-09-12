import dayjs from 'dayjs'
import getLiteralDate from '.../utils/getLiteralDate'

// TODO: надо подобное для BoardMenu, но вместо "эта карточка" > "карточка [название](ссылка)"

const actionRecords = {
  comment: () => null,
  addAttachment: () => 'прикрепил(а) вложение',
  deleteAttachment: () => 'удалил(а) вложение',
  inviteMember: () => 'присоединился(-ась) к этой карточке',
  leftMember: () => 'покинул(а) эту карточку',
  addCard: ({ listName }) => `добавил(а) эту карточку в список ${listName}`,
  moveCard: ({ oldListName, newListName }) =>
    `переместил(а) эту карточку из списка ${oldListName} в список ${newListName}`,
  archiveCard: () => 'архивировал(а) эту карточку',
  unarchiveCard: () => 'вернул(а) из архива эту карточку',
  closeDueDate: () => 'отметил(а) срок как завершённый',
  reopenDueDate: () => 'отметил(а) срок как незавершённый',
  setDueDate: ({ dueDate }) =>
    (({ dueDate }) => `установил(а) срок ${dueDate}`)({
      dueDate: getLiteralDate(dayjs(dueDate), { withTime: true }),
    }),
  changeDueDate: ({ dueDate }) =>
    (({ dueDate }) => `изменил(а) срок на ${dueDate}`)({
      dueDate: getLiteralDate(dayjs(dueDate), { withTime: true }),
    }),
  deleteDueDate: () => 'удалил(а) срок',
  addChecklist: ({ checklistName }) => `добавил(а) чек-лист ${checklistName}`,
  deleteChecklist: ({ checklistName }) => `удадил(а) чек-лист ${checklistName}`,
  renameChecklist: ({ oldChecklistName, newChecklistName }) =>
    `переименовал(а) чек-лист ${newChecklistName} (с ${oldChecklistName})`,
}

export default actionRecords
