import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  console.log("mode:", mode);
  console.log("history:", history);
  
  const transition = (newMode) => {
    setMode(newMode);
    setHistory((prev) => {
      const newHistory = [...prev, newMode]
      return newHistory;
    })
  }

  const back = () => {
    setHistory((prev) => {
      prev.pop()
      return history;);
    setMode(history[history.length - 1]);
  }
  

  return { mode, transition, back};
}