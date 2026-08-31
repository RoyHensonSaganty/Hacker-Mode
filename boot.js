import { useEffect, useState } from "react";

export function Boot({ onComplete, terminalRef }) {
  const bootTexts = [
    "Initializing......",
    "Loading request......",
    "Connecting to server......",
    " Authenticating......",
  ];

  const [display, setDisplay] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;

    const interval = setInterval(() => {


      if (textIndex >= bootTexts.length) {
        clearInterval(interval);

        const accessResult =
          Math.random() < 0.5
            ? "granted"
            : "denied";

        setResult(accessResult);

        return;
      }


      const currentText = bootTexts[textIndex];

      setDisplay((prev) => {
        const copy = [...prev];

        copy[textIndex] =
          currentText.slice(0, charIndex + 1);

        return copy;
      });

      charIndex++;


      if (charIndex >= currentText.length) {
        textIndex++;
        charIndex = 0;
      }


      if (terminalRef?.current) {
        terminalRef.current.scrollTop =
          terminalRef.current.scrollHeight;
      }

    }, 70);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete, terminalRef]);


  useEffect(() => {
    if (!result) {
      return;
    }

    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [result, onComplete]);

  return (
    <div className="bmain">

      {display.map((text, index) => (
        <div key={index} className="bmain">
          {text}
        </div>
      ))}

      {result && (
        <div className={`access-window ${result}`}>

          <div className="access-title">
            {result === "granted"
              ? "ACCESS GRANTED"
              : "ACCESS DENIED"}
          </div>

          <div className="access-message">
            {result === "granted"
              ? "Request approved"
              : "Request rejected"}
          </div>

        </div>
      )}

    </div>
  );
}