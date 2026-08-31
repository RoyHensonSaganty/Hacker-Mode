import { useState, useEffect } from "react";
import { Input } from "./input.js";
import { MatrixRain } from "./MatrixRain.js";

export function Home() {
  const [dt, setdt] = useState("");
  const [start, setStart] = useState(false);

  const text = "WELCOME TO HACKER MODE";

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setdt(text.slice(0, index + 1));

      index++;

      if (index === text.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    function key() {

      if (
        document.documentElement
          .requestFullscreen
      ) {
        document.documentElement
          .requestFullscreen();
      }

      setStart(true);
    }

    window.addEventListener(
      "keydown",
      key
    );

    return () => {
      window.removeEventListener(
        "keydown",
        key
      );
    };
  }, []);

  if (start) {
    return (
      <div className="hackermode">
  
        <MatrixRain />
  
        <Input />
  
      </div>
    );
  }

  return (
    <div className="main">

      <div className="home">

        <h1>{dt}</h1>

        <p className="blinkd">
          Become the movie hacker
          you've always wanted.
        </p>

        <h3 className="blink">
          [ Press any key]
        </h3>

      </div>

    </div>
  );
}