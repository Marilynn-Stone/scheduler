import React from "react";
import axios from "axios";
import {
	render,
	cleanup,
	waitForElement,
	getByText,
	getAllByTestId,
	getByAltText,
	getByPlaceholderText,
	fireEvent,
	queryByText,
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
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointment = getAllByTestId(container, "appointment").find(
			(appointment) => queryByText(appointment, "Archie Cohen")
		);
		const day = getAllByTestId(container, "day").find((day) =>
			queryByText(day, "Monday")
		);

		fireEvent.click(getByAltText(appointment, "Delete"));

		await waitForElement(() =>
			getByText(appointment, "Are you sure you want to delete?")
		);

		fireEvent.click(getByText(appointment, "Confirm"));

		expect(getByText(appointment, "Deleting")).toBeInTheDocument();
		await waitForElement(() => getByAltText(appointment, "Add"));
		expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
	});

	it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointment = getAllByTestId(container, "appointment").find(
			(appointment) => queryByText(appointment, "Archie Cohen")
		);
		const day = getAllByTestId(container, "day").find((day) =>
			queryByText(day, "Monday")
		);

		fireEvent.click(getByAltText(appointment, "Edit"));
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" },
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));

		expect(getByText(appointment, "Saving")).toBeInTheDocument();
		await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
	});

	it("shows the save error when failing to save an appointment", async () => {
		axios.put.mockRejectedValueOnce();

		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointment = getAllByTestId(container, "appointment")[0];

		fireEvent.click(getByAltText(appointment, "Add"));
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" },
		});
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		fireEvent.click(getByText(appointment, "Save"));

		expect(getByText(appointment, "Saving")).toBeInTheDocument();
		await waitForElement(() => getByAltText(appointment, "Close"));

		fireEvent.click(getByAltText(appointment, "Close"));

		expect(getByText(appointment, "Save")).toBeInTheDocument();
	});

	it("shows the delete error when failing to delete an existing appointment", async () => {
		axios.delete.mockRejectedValueOnce();

		const { container } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		const appointment = getAllByTestId(container, "appointment").find(
			(appointment) => queryByText(appointment, "Archie Cohen")
		);

		fireEvent.click(getByAltText(appointment, "Delete"));

		await waitForElement(() =>
			getByText(appointment, "Are you sure you want to delete?")
		);

		fireEvent.click(getByText(appointment, "Confirm"));

		expect(getByText(appointment, "Deleting")).toBeInTheDocument();
		await waitForElement(() =>
			getByText(appointment, "Could not delete appointment.")
		);

		fireEvent.click(getByAltText(appointment, "Close"));
	});
});
