import dayjs from 'dayjs'
import getLiteralDate from '.../utils/getLiteralDate'

// TODO: надо подобное для BoardMenu, но вместо "эта карточка" > "карточка [название](ссылка)"

const actionRecords = {
  comment: () => null,
  addAttachment: () => 'прикрепил(а) вложение',
  deleteAttachment: () => 'удалил(а) вложение',
  inviteMember: () => 'присоединился(-ась) к этой карточке',
  leftMember: () => 'покинул(а) эту карточку',
  addCard: ({ listTitle }) => `добавил(а) эту карточку в список ${listTitle}`,
  moveCard: ({ oldListTitle, newListTitle }) =>
    `переместил(а) эту карточку из списка ${oldListTitle} в список ${newListTitle}`,
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
  addChecklist: ({ checklistTitle }) => `добавил(а) чек-лист ${checklistTitle}`,
  deleteChecklist: ({ checklistTitle }) => `удадил(а) чек-лист ${checklistTitle}`,
  renameChecklist: ({ oldChecklistTitle, newChecklistTitle }) =>
    `переименовал(а) чек-лист ${newChecklistTitle} (с ${oldChecklistTitle})`,
}

export default actionRecords
