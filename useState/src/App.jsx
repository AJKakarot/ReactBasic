import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");

  function handleChanges(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Name: " + name);
    console.log("Name:", name);
  }

  return (
    <>
      <h1>Making Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleChanges}
          placeholder="Enter your name"
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

//(Multiple Inputs Form)
// import React, { useState } from "react";

// function Form() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: ""
//   });

//   // handle input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // handle submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Enter name"
//         />
//       </div>

//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Enter email"
//         />
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default Form;