import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

const logFunc = (state: string[], action: PayloadAction<any[]>) => {
	const logs: string[] = state.concat(action.payload.map(line => typeof line === "string" ? line : JSON.stringify(line)));
	while(logs.length > 50) {
		logs.shift();
	}
	return logs;
};

const logsSlice = createSlice({
	name: 'logs',
	initialState,
	reducers: {
		doLog: logFunc
	}
});

export const {
	doLog
} = logsSlice.actions;

export default logsSlice.reducer;
