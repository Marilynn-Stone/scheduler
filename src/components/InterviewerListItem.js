import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
	const { name, avatar, setInterviewer, selected } = props;

	const interviewerListClass = classNames("interviewers__item", {
		"interviewers__item--selected": selected,
	});

	const formatSelected = () => selected && name;

	return (
		<li className={interviewerListClass} onClick={setInterviewer}>
			<img className="interviewers__item-image" src={avatar} alt={name} />
			{formatSelected()}
		</li>
	);
}
