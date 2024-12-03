import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

import "ojs/ojbutton";

export const Summary: FunctionalComponent = () => {
  const [count, countSetter] = useState(0);
  const onAction = () => countSetter(count + 1);
  return (
    <div>
      <h2>Summary</h2>
    </div>
  );
};
