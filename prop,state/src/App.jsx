import { useState } from "react";
import Child from "./Component/child"; // 👈 import child

export default function App() {
  const [name, setName] = useState("Ajeet");

  return (
    <>
      <h1>Props vs State</h1>

      {/* state ko props ke through bheja */}
      <Child name={name} />

      <button onClick={() => setName("Rahul")}>
        Change Name
      </button>
    </>
  );
}

// import { useState } from "react";

// // 👇 Child component same file me
// function Child({ name }) {
//   return <h2>Hello {name}</h2>;
// }

// export default function App() {
//   const [name, setName] = useState("Ajeet");

//   return (
//     <>
//       <h1>Parent Component</h1>

//       <Child name={name} />

//       <button onClick={() => setName("Rahul")}>
//         Change Name
//       </button>
//     </>
//   );
// }



// () => setName("Rahul")

// ITS like 

// fucntion handleClick() {
//   setName("Rahul");
// }

// <button onClick={handleClick}>
//   Change Name
// </button>


// import { useState } from "react";

// export default function App() {
//   const [list, setList] = useState([
//     { id: 1, value: "A" },
//     { id: 2, value: "B" },
//     { id: 3, value: "C" }
//   ]);

//   const addItem = () => {
//     const newItem = {
//       id: Date.now(),
//       value: "X"
//     };

//     setList((prev) => [newItem, ...prev]);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Todo List</h2>

//       <button onClick={addItem}>Add Item</button>

//       <div style={{ marginTop: "15px" }}>
//         {list.map((item) => (
//           <div key={item.id}>
//             <input value={item.value} readOnly />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }