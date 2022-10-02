import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "./Form.js";

export default function Appointment(props) {
	
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	
	const { id, time, interview, interviewers, save } = props;
	const { mode, transition, back } = useVisualMode(
		interview ? SHOW : EMPTY
	);


	return (
		<article className="appointment">
			<Header time={time}/>
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
				/>
			)}
			{mode === CREATE && <Form onCancel={() => back(EMPTY)} interviewers={interviewers} save={save} id={id} />}
		</article>
	);
}