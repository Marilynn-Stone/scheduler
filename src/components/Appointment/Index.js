import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "./Form.js";
import Status from "./Status.js";
import Confirm from "./Confirm.js";

export default function Appointment(props) {
	
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
	
	const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	function onDelete(id) {
		transition(CONFIRM);
	};

	function onConfirm() {
		transition(DELETING);
		cancelInterview(id)
		.then(() => transition(EMPTY));
	}

	function save(name, interviewer, id) {
  	const interview = {
    	student: name,
    	interviewer
  	};
		transition(SAVING);
		bookInterview(id, interview)
			.then(() => transition(SHOW));
	}

  function onEdit(id) {
    transition(EDIT);
    bookInterview(id, interview)
			.then(() => transition(SHOW));
  }
	
	return (
		<article className="appointment">
			<Header time={time}/>
        {mode === EMPTY && 
          <Empty 
            onAdd={() => transition(CREATE)} 
          />}
        {mode === SAVING && 
          <Status 
            message={"Saving"} 
          />}
        {mode === DELETING && 
          <Status 
            message={"Deleting"}
          />}
        {mode === CONFIRM && 
          <Confirm 
            message={"Are you sure you want to delete?"} 
            onConfirm={() => onConfirm()} 
            onCancel={() => back()}
          />}
        {mode === SHOW && 
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
            onDelete={onDelete}
            onEdit={onEdit}
            id={id}
          />}
        {mode === CREATE && 
          <Form 
            onCancel={() => back()} 
            interviewers={interviewers} 
            save={save} 
            id={id} 
          />}
        {mode === EDIT && 
          <Form 
            onCancel={() => back()} 
            student={interview.student}
            interviewer={interview.interviewer}
            interviewers={interviewers} 
            save={save} 
            id={id} 
          />}
		</article>
	);
}