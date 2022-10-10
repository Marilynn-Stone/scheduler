import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
	const { days, value, onChange } = props;

	const DayList = days.map((dayItem) => {
		return (
			<DayListItem
				key={dayItem.id}
				name={dayItem.name}
				spots={dayItem.spots}
				setDay={() => onChange(dayItem.name)}
				selected={dayItem.name === value}
			/>
		);
	});

	return <ul>{DayList}</ul>;
}
