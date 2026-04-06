import { useState, useMemo } from "react";

function App() {
  const [num, setNum] = useState(0);
  const [dummy, setDummy] = useState(0);

  const result = useMemo(() => {
    console.log("🔥 Calculating...");

    for (let i = 0; i <= 10000000; i++) {}

    return num * 2;
  }, [num]);

  return (
    <>
      <h2>Result: {result}</h2>
      <h3>Re-render count: {dummy}</h3>

      <button onClick={() => setNum(num + 1)}>
        Increase Number (Heavy)
      </button>

      <button onClick={() => setDummy(dummy + 1)}>
        Re-render Only
      </button>
    </>
  );
}

export default App;

// useMemo is a React hook used to memoize the result of an expensive calculation.
//  It ensures that the calculation is only re-executed 
//  when its dependencies change,
//  otherwise it returns the cached value, improving performance.