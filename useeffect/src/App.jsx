import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);//array resopne to array wrna obejct response to object
const [loading , setLoading] = useState(true);
const [error, setError] = useState(null); 
  useEffect(() => {

//  const dummyData = [
//       { id: 1, title: "Learn React" },
//       { id: 2, title: "Practice DSA" },
//       { id: 3, title: "Build Projects" }
//     ];
//     setData(dummyData);

//   }, []);

    async function fetchData() {
      try {
        const resp = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const result = await resp.json();
        setData(result);
      } catch (err) {
        setError("Something went wrong!");
      }finally {
        setLoading(false); // 👈 always run
      }
    }

    fetchData();
  }, []); 


  // 🔥 Conditional Rendering
  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <>
      <div>
        <h2>Todo Data</h2>
        {data && data.map((item)=>{
          return(
            <div key={item.id}>
              <p>{item.title}</p>
            </div>
          )
        })}
      </div>
    </>
  );
}