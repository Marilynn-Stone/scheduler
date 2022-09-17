import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";

export default function Appointment(props) {

	const {time, interview} = props;

	return (
		<article className="appointment">
			<Header time={time}/>
			{interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}
		</article>
	);
}