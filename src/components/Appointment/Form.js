// Displays form that allows student to book an interview with a specific interviewer.

import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "../Button";

export default function Form(props) {
	const { onCancel, interviewers, onSave, id } = props;

	const [student, setStudent] = useState(props.student || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [error, setError] = useState("");

	const reset = function () {
		return [setStudent(""), setInterviewer(null)];
	};

	const cancel = function () {
		return [setError(""), reset(), onCancel()];
	};

	function validate() {
		if (student === "") {
			setError("Student name cannot be blank");
			return;
		}
		if (interviewer === null) {
			setError("Please select an interviewer");
			return;
		}
		setError("");
		onSave(student, interviewer, id);
	}

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						onChange={(event) => setStudent(event.target.value)}
						value={student}
						data-testid="student-name-input"
					/>
					<section className="appointment__validation">{error}</section>
					<InterviewerList
						interviewers={interviewers}
						value={interviewer}
						setInterviewer={setInterviewer}
					/>
				</form>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
