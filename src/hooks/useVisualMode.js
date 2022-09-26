import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace === true) {
      setHistory((prev) => {
        prev.splice(-1, 1, newMode);
        return history;
      })
    } else {
      setHistory((prev) => {
        const newHistory = [...prev, newMode]
        return newHistory;
      })
    }
  }
  
  const back = () => {
    if (history.length <= 1) {
      return;
    }
    setHistory((prev) => [...prev.slice(0, -1)]);
    setMode(history[history.length - 2]);
  }
  console.log(history);
  return { mode, transition, back};

}