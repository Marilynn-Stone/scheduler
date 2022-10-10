export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

const countNullInterviews = (day, appointments) => {
	let count = 0;
	for (const id of day.appointments) {
		if (!appointments[id].interview) {
			count++;
		}
	}
	return count;
};

const updateSpots = (days, appointments) => {
	return days.map((day) => {
		const spots = countNullInterviews(day, appointments);
		return { ...day, spots };
	});
};

const setDay = (state, action) => {
	return { ...state, day: action.value };
};

const setApplicationData = (state, action) => {
	return {
		...state,
		days: action.value.days,
		appointments: action.value.appointments,
		interviewers: action.value.interviewers,
	};
};

const setInterview = (state, action) => {
	const appointment = {
		...state.appointments[action.id],
		interview: action.interview && { ...action.interview },
	};
	const appointments = {
		...state.appointments,
		[action.id]: appointment,
	};
	const days = updateSpots(state.days, appointments);
	return { ...state, appointments, days };
};

const reducers = {
  [SET_DAY]: setDay,
  [SET_APPLICATION_DATA]: setApplicationData,
  [SET_INTERVIEW]: setInterview
};

export default function useReducer(state, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }
  throw new Error( `Tried to reduce with unsupported action type: ${action.type}`);
}  