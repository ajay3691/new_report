//import { Context } from "./Screens/UseContext/context";
//import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import Login from './authCoponents/Login'
import DashBoard from './authCoponents/DashBoard'

//import Layout from "./Screens/Layout";



function App() {
 // const [isLoading, setIsLoading] = useState(true);
   /* const { setUserName } = useContext(Context); 

  useEffect(() => {
    const loginitem = localStorage.getItem("login");
    if (loginitem) {
      const item = JSON.parse(loginitem);
      try {
        const { first_name, profilepic, email } = item;
        setUserName({ first_name, profilepic, email });
      } catch (e) {
        console.error("Error setting user information:", e);
      }
    } else {
      console.log("LocalStorage Item not found");
    }

    setIsLoading(false);
  }, [setUserName, setIsLoading]);
 */
 /*  if (isLoading) {
    return <div>Loading...</div>;
  } */
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashBoard" element={<DashBoard />} />
      {/* <Route path="DashBoard" element={<DashBoard/>} />
      <Route path="/" element={<Layout />}>
        <Route path="DashBoard" element={<DashBoard />} />
        <Route path="Geo" element={<Geo />} />
        <Route path="Device" element={<Device />} />
      
      </Route> */}
      {/* <Route path="*" element={<Missing />} /> */}
    </Routes>
    </Router>
  );
}

export default App;
