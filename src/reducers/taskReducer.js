const taskReducer = (tasks, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD':
      return [...tasks, payload];
    default:
      return tasks;
  }
};

export default taskReducer;
