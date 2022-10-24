// takes in two arguments, state and day, and returns an array of appointments for the given day

export function getAppointmentsForDay(state, day) {
	let dayApts = [];
	let aptsDetails = [];
	for (const weekday of state.days) {
		if (weekday.name === day) {
			dayApts = weekday.appointments;
		}
	}
	for (const appointment of dayApts) {
		const apt = state.appointments[appointment.toString()];
		aptsDetails.push(apt);
	}
	return aptsDetails;
}

// takes in an object that contains an interviewer, and returns a new object containing the interview data

export function getInterview(state, interview) {
	if (interview === null) {
		return null;
	}
	const result = {
		student: interview.student,
		interviewer: state.interviewers[interview.interviewer],
	};
	return result;
}

// takes in two arguments, state and day, and returns an array of interviewers for the given day

export function getInterviewersForDay(state, day) {
	let dayInts = [];
	let intsDetails = [];
	for (const weekday of state.days) {
		if (weekday.name === day) {
			dayInts = weekday.interviewers;
		}
	}
	for (const interviewer of dayInts) {
		const ints = state.interviewers[interviewer.toString()];
		intsDetails.push(ints);
	}

	return intsDetails;
}
