import React from "react";

import { render, cleanup } from "@testing-library/react";

import Index from "components/Appointment";

afterEach(cleanup);

describe("Index", () => {
	it("renders without crashing", () => {
		render(<Index />);
	});
});
