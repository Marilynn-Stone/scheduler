import React from "react";
import {
	render,
	cleanup,
	waitForElement,
	prettyDOM,
	getByText,
	getAllByTestId,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
	it("defaults to Monday and changes the schedule when a new day is selected", () => {
		const { getByText } = render(<Application />);

		return waitForElement(() => getByText("Monday"));
	});

	it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointments = getAllByTestId(container, "appointment");
		const appointment = getAllByTestId(container, "appointment")[0];
		console.log(prettyDOM(appointments));
		console.log(prettyDOM(appointment));
		console.log(prettyDOM(container));
	});
});
