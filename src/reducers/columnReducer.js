import uuid from 'uuid/v1'

const columnReducer = (columns, action) => {
  const { type, id, payload } = action;
  const targetedColumn = columns.find(column => column.id === id);

  switch (type) {
    case 'ADD':
      return [...columns, {id: uuid(), taskIds: [], ...payload}];
    case 'UPDATE':
      return columns.map(column => column.id === id ? {...targetedColumn, ...payload } : column);
    case 'REARRANGE':
      return payload;
    default:
      return columns;
  }
};

export default columnReducer;
