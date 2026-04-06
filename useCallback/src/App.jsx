import React, { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child Rendered");
  return <button onClick={onClick}>Click</button>;
});

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return (
    <>
    {count}
      <Child onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </>
  );
}