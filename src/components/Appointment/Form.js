import React, {useState} from 'react'
// import InterviewerList from 'components/InterviewerList';
// import Button from '../Button';
// import interviewerItem from "components/InterviewerListItem";

export default function Form(props) {
  
  const { interviewers, interviewer, student, onSave, onCancel } = props;
  
  const [student, setStudent] = useState(student || "");
  const [interviewer, setInterviewer] = useState(interviewer || null);

  const reset = function() {
    return (
      setStudent(""),
      setInterviewer(null)
    )
  };

  const cancel = function() {
    return (
      reset(),
      {onCancel}
    )
  };
  
  return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off">
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						onChange={(event) => setStudent(event.target.value)}
						reset={reset()}
						cancel={cancel()}
					/>
				</form>
				<InterviewerList
					key={interviewerItem.id}
					name={interviewerItem.name}
					avatar={interviewerItem.avatar}
					selected={value === interviewerItem.id}
					setInterviewer={() => onChange(interviewerItem.id)}
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={onCancel}>
						Cancel
					</Button>
					<Button confirm onClick={onSave}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}