const logger = store => next => action => {
	console.group = console.group || console.log;
	console.groupEnd = console.groupEnd || console.log;
	console.group('start: ' + action.type);
	console.info('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	console.groupEnd('end: ' + action.type);
	return result;
};

export default logger;
