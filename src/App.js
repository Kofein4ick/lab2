import { useEffect, useState } from "react";
import rozenbruh from "./rozenbruh.js";

function App() {
  const [table,setTable]=useState([]);
  useEffect({

  },[table])
  return (
    <div className="App">
      <button onClick={()=>{rozenbruh()}}>aa</button>
    </div>
  );
}

export default App;
