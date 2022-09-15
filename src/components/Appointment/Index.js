import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";

export default function Appointment(props) {
	
	const {time, interview, student, interviewer} = props;

	return (
		<article className="appointment">
			<Header time={time}/>
			{interview ? <Show student={student} interviewer={interviewer}/> : <Empty />}
		</article>
	);
}