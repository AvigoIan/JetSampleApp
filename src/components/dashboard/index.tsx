import { h } from "preact";
import { useState } from "preact/hooks";

import "ojs/ojbutton";

export function Dashboard() {
  const [count, countSetter] = useState(0);
  const onAction = () => countSetter(count + 1);
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Counter: {count}</p>
      <oj-button onojAction={onAction}>Count</oj-button>
    </div>
  );
}
