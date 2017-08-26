const logger = store => next => action => {
	console.log('start: ' + action.type);
	console.info('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	console.log('end: ' + action.type);
	return result;
};

export default logger;
