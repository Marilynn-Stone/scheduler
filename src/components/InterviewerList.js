import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

function InterviewerList(props) {
	const { interviewers, setInterviewer, value } = props;

	const interviewer = interviewers.map((interviewerItem) => {
		return (
			<InterviewerListItem
				key={interviewerItem.id}
				id={interviewerItem.id}
				name={interviewerItem.name}
				avatar={interviewerItem.avatar}
				selected={value === interviewerItem.id}
				setInterviewer={setInterviewer}
			/>
		);
	});

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">
				<>{interviewer}</>
			</ul>
		</section>
	);
}

InterviewerList.propTypes = {
	interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
