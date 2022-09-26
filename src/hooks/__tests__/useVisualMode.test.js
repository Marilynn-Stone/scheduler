import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});

test.only("useVisualMode should return to previous mode", () => {
    console.log("initial")
  const { result } = renderHook(() => useVisualMode(FIRST));
  console.log("transition to second");
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
  console.log("transition to third");
  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);
  console.log("back to second");
  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);
  console.log("back to first");
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);

});