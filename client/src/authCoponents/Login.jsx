import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
  
function Login() {
  const navigate = useNavigate();
  /* const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [passwordhide, setpasswordhide] = useState(true); */
  /* const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "" && password === "") {
      handleOpen();
    } else if (name === "Admin" && password === "admin@123") {
      const item = {
        first_name: "Admin",
        profilepic: "",
        email: "admin@123",
      };
      localStorage.setItem("login", JSON.stringify(item));
      setUserName(item);
      navigate("/DashBoard");
    } else {
      FetchData("Employees").then((res) => {
        res.forEach((item) => {
          if (item.Office_Mail === name && item.password === password) {
            let storeItem = {
              first_name: item.first_name,
              profilepic: item.profilepic,
              email: item.email,
            };
            setUserName(item);
            localStorage.setItem("login", JSON.stringify(storeItem));
            navigate("/Userwork");
          } else {
            handleOpen();
          }
        });
      });
    }
  }; */

  return (
    // <div className="bgg d-flex justify-content-around align-items-center">
    //   <div className="col-6 text-center">
    //     <img
    //       src={require("../../Assets/thingsalivelogo.png")}
    //       className="w-50 h-15"
    //       alt="Things alive logo"
    //     />
    //   </div>
    //   <div className="col-6">
    //     <div className="w-55 py-4 border border-white borderRadius">
    //       <p className="LoginText text-center">Login</p>
    //       <form onSubmit={handleSubmit}>
    //         <div className="px-5">
    //           <label className="form-label lablecolor">Name:</label>
    //           <input
    //             type="text"
    //             name="name"
    //             className="form-control"
    //             value={name}
    //             onChange={(e) => {
    //               setName(e.target.value);
    //             }}
    //           />
    //         </div>
    //         <div className="pt-20 px-5">
    //           <label className="form-label lablecolor">password:</label>
    //           <div className="input-group">
    //             <input
    //               type={passwordhide ? "password" : "text"}
    //               className="form-control"
    //               name="password"
    //               value={password}
    //               onChange={(e) => {
    //                 setPassword(e.target.value);
    //               }}
    //             />
    //             <span className="input-group-text">
    //               {passwordhide ? (
    //                 <BsEyeSlashFill
    //                   onClick={() => {
    //                     setpasswordhide(false);
    //                   }}
    //                 />
    //               ) : (
    //                 <BsEyeFill
    //                   onClick={() => {
    //                     setpasswordhide(true);
    //                   }}
    //                 />
    //               )}
    //             </span>
    //           </div>
    //         </div>
    //         <div className="text-center pt-60">
    //           <button type="submit" className="btn mb-3 loginBtn">
    //             Submit
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //     <Modal open={open} onClose={handleClose}>
    //       <Modal.Header>
    //         <Modal.Title>Login Failed</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <p>Please Check Password or Name</p>
    //       </Modal.Body>
    //       <Modal.Footer>
    //         <Button
    //           onClick={handleClose}
    //           style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
    //         >
    //           Ok
    //         </Button>
    //         <Button
    //           onClick={handleClose}
    //           appearance="subtle"
    //           style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
    //         >
    //           Cancel
    //         </Button>
    //       </Modal.Footer>
    //     </Modal>
    //   </div>
    // </div>
    <div className="w-100 row  d-flex align-items-center justify-content-center" style={{ height: '100vh'}}>
      <div className="boxshadow h-80 w-80 m-5 row">
        <div className="col-6 d-flex align-items-center justify-content-center">
          <img
            src="https://picsum.photos/200/300"
            alt="example img"
            // className="w-100 h-100"
          />
        </div>
        <div className="col-6 h-100">
          <div className="w-50 h-100">
            <div className="h-30 d-flex align-items-end">
              <h1>Log in</h1>
            </div>
            <div class="input-group mb-3 pt-2">
              <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg></span>
              <input type="text" className="form-control focusHide" placeholder="Your Name" />
              <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
                </svg>
              </span>
            </div>
            <div class="input-group mb-3 pt-2">
              <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg></span>
              <input type="text" className="form-control focusHide" placeholder="Your Name" />
              <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
                </svg>
              </span>
            </div>
            <div className="py-3 d-flex justify-content-between">
              <div>
                <input
                  type="checkbox"
                />
                <span style={{ marginLeft: '10px' }}>Rember me</span>
              </div>
              <div>
                Forgot password
              </div>
            </div>
            <div className="mt-3">
              <button type="button" class="btn btn-primary" 
              onClick={()=>{
                navigate("/dashBoard");
              }}
              >Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
