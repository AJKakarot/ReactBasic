// import react, { useRef,useEffect } from "react";

// export default function App(){

// const inputRef = useRef(null);

// useEffect(()=>{
// inputRef.current.focus();
// },[]);

// return(
//   <>
//   <h1>hello world</h1>
// <input ref={inputRef}/>
//   </>
// )


// }
//useRef is a React hook used to access DOM elements directly. 
// For auto-focus, we attach a ref to the input and call .focus() 
// inside useEffect so that when the component mounts, 
// the input gets focused automatically.





import { useRef } from "react";

export default function App() {
  const boxRef = useRef(null);

  const changeColor = () => {
    if (boxRef.current.style.backgroundColor === "orange"){
      boxRef.current.style.backgroundColor = "red"
    }else
    boxRef.current.style.backgroundColor = "orange";
  };

  return (
    <>
      <div
        ref={boxRef}
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "orange",
          marginBottom: "10px"
        }}
      ></div>

      <button onClick={changeColor}>
        Change Color
      </button>
    </>
  );
}