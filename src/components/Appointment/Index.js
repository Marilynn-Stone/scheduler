import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "./Form.js";
import Status from "./Status.js";

export default function Appointment(props) {
	
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	
	const { id, time, interview, interviewers, bookInterview} = props;
	const { mode, transition, back } = useVisualMode(
		interview ? SHOW : EMPTY
	);

	function save(name, interviewer, id) {
  	const interview = {
    	student: name,
    	interviewer
  	};
		transition(SAVING);
		bookInterview(id, interview)
			.then(() => transition(SHOW));
	}
	
	return (
		<article className="appointment">
			<Header time={time}/>
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SAVING && <Status />}
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