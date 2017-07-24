const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState().toObject());
  console.groupEnd(action.type);
  return result;
};

export default logger;