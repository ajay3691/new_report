import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import back from '../img/back/13.png'
import logo from '../img/logo/logo_bg_r.png'
  
function Login() {
  const navigate = useNavigate();

  return (
    <div
    className="w-100 row d-flex align-items-center justify-content-center  mainlog"
    style={{
       /*  backgroundImage: `url(${back})`,  */ 
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100vw",
      overflow: "hidden", // Prevent scrolling
    }}
  >
    <div className="w-100 row  d-flex align-items-center justify-content-center" style={{ height: '100vh'}}>
      <div className="boxshadow h-80 w-80 m-5 row ">
        <div className="col-6 d-flex align-items-center justify-content-center" >
          <img
            src=/* "https://picsum.photos/200/300" */{logo}
            alt="example img"
            className="w-40 h-30"
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
              <button type="button" class="btn loginBtn" 
              onClick={()=>{
                navigate("/dashBoard");
              }}
              >Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
