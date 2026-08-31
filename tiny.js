import a, { s, m } from "./App.js";

export function Hero() {
  return (
    <div>
      <ul>
        <li>{s(3, 2)}</li>
        <li>{m(2, 3)}</li>
        <li>{a(2, 3)}</li>
      </ul>
    </div>
  );
}
