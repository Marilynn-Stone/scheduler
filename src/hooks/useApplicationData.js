import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
	SET_DAY,
	SET_APPLICATION_DATA,
	SET_INTERVIEW,
} from "../reducers/useApplicationReducers";

export default function useApplicationData() {
	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => {
		dispatch({ type: SET_DAY, value: day });
	};

	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		]).then((all) => {
			const [days, appointments, interviewers] = all;
			dispatch({
				type: SET_APPLICATION_DATA,
				value: {
					days: days.data,
					appointments: appointments.data,
					interviewers: interviewers.data,
				},
			});
		});
	}, []);

	function cancelInterview(id) {
		return axios.delete(`/api/appointments/${id}`).then((res) => {
			dispatch({ type: SET_INTERVIEW, id, interview: null });
		});
	}

	function bookInterview(id, interview) {
		return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
			dispatch({ type: SET_INTERVIEW, id, interview });
		});
	}

	return { state, setDay, bookInterview, cancelInterview };
}
