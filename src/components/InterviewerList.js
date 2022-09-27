import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function (props) {
	const { interviewers, value, onChange } = props;

	const interviewerList = interviewers.map((interviewerItem) => {
		return (
			<InterviewerListItem
				key={interviewerItem.id}
				name={interviewerItem.name}
				avatar={interviewerItem.avatar}
				selected={value === interviewerItem.id}
				setInterviewer={() => onChange(interviewerItem.id)}
			/>
		);
	});

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">
				<>{interviewerList}</>
			</ul>
		</section>
	);
}