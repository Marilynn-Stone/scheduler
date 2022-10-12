import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
	const { selected, spots, name, setDay } = props;

	const dayClass = classNames("day-list__item", {
		"day-list__item--selected": selected,
		"day-list__item--full": spots === 0,
	});

	const formatSpots = () => {
		if (spots === 0) {
			return "no spots";
		}
		return `${spots} ${parseInt(spots) > 1 ? "spots" : "spot"}`;
	};

	return (
		<li className={dayClass} data-testid="day" onClick={setDay}>
			<h2 className="text--regular">{name}</h2>
			<h3 className="text--light">{formatSpots()} remaining</h3>
		</li>
	);
}
