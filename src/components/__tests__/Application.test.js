import React from "react";
import {
	render,
	cleanup,
	waitForElement,
	prettyDOM,
	getByText,
	getAllByTestId,
	getByAltText,
	getByPlaceholderText,
	fireEvent,
	queryByText,
	queryByAltText,
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

		const appointment = getAllByTestId(container, "appointment")[0];
		const day = getAllByTestId(container, "day").find((day) =>
			queryByText(day, "Monday")
		);

		fireEvent.click(getByAltText(appointment, "Add"));
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" },
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));

		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

		expect(getByText(day, "no spots remaining")).toBeInTheDocument();
	});

	it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
		// 1. Render the Application.
		const { container } = render(<Application />);

		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, "Archie Cohen"));
		// 3. Click the "Delete" button on the booked appointment.
		const appointment = getAllByTestId(container, "appointment").find(
			(appointment) => queryByText(appointment, "Archie Cohen")
		);
		console.log(prettyDOM(appointment));

		fireEvent.click(queryByAltText(appointment, "Delete"));
		// 3. Check that the confirmation message is shown.
		await waitForElement(() =>
			getByText(appointment, "Are you sure you want to delete?")
		);
		console.log(prettyDOM(appointment));
		// 4. Click the "Confirm" button on the confirmation.
		fireEvent.click(getByText(appointment, "Confirm"));
		console.log(prettyDOM(appointment));
		// 5. Check that the element with the text "Deleting" is displayed.
		expect(getByText(appointment, "Deleting")).toBeInTheDocument();
		console.log(prettyDOM(appointment));
		// 6. Wait until the element with the "add" button is displayed.
		await waitForElement(() => getByAltText(appointment, "Add"));
		console.log(prettyDOM(appointment));
		// 7. Check that the DayListItem with the text "Monday" has the text "2 spot remaining".
		expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
	});
});
