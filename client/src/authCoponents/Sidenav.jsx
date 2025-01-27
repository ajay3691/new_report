import React, { useContext, useEffect, useState } from "react";
import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import { Navigate, useNavigate } from "react-router-dom";
import { History } from "@rsuite/icons"; // Import a relevant icon for history

const Sidenavbar = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(true);
    const [activeKey, setActiveKey] = React.useState('1');
    const [clickEvent, setclickEvent] = useState("")
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        console.log('useEffect triggered because clickEvent changed:', clickEvent);
        const handleResize = () => {
            console.log('009091qssjhjh')
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            if (window.innerWidth < 500) {
                setExpanded(false);
                console.log('00909')
            } else {
                setExpanded(true);
            }
        };

        window.addEventListener("resize", handleResize);
        if (window.innerWidth < 500) {
            setExpanded(false);
            console.log('00909')
        } else {
            setExpanded(true);
        }
        return () => window.removeEventListener("resize", handleResize);
    }, [activeKey]);


    return (
        //<div className="w-20 row  " style={{ height: '100vh'}}>
        <div
            style={{
                display: "flex",
                height: "100vh",
            }}
        >
            <div
                style={{
                    width: expanded ? "240px" : "60px", // Maintain consistent width
                    backgroundColor: "#34495e", // Sidebar background color
                    transition: "width 0.3s", // Smooth transition
                    
                }}
            >
                {/* 
      </div>
      <div className="w-20 row" style={{  height: '100vh' }} > */}

                <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}

                >
                    <Sidenav.Body>
                        <Nav activeKey={activeKey} onSelect={(item) => { setActiveKey(item) }}>
                            <Nav.Item eventKey="1" onClick={()=>{navigate("/admin")}} icon={<DashboardIcon />} className="Nav_Item">
                                Dashboard
                            </Nav.Item>
                            <Nav.Item eventKey="2" onClick={()=>{navigate("/employeeList")}} icon={<GroupIcon />} className="Nav_Item">
                                Employees List
                            </Nav.Item>
                            <Nav.Menu placement="rightStart" eventKey="3" title="Report History" icon={<History />}
                                style={{
                                    color: expanded ? "#fff" : "#34495e",
                                    backgroundColor: expanded ? "#34495e" : "transparent",
                                }}
                            >
                                <Nav.Item eventKey="3-1" onClick={() => {
                                    // if (windowSize.width < 500) {
                                    //     setExpanded(false)
                                    // }
                                    navigate("/Geo");
                                }} className="Nav_Item">Daily Task</Nav.Item>
                                <Nav.Item eventKey="3-2" onClick={() => {
                                    // if (windowSize.width < 500) {
                                    //     setExpanded(false)
                                    // }
                                    navigate("/Device");
                                }} className="Nav_Item">Development report</Nav.Item>
                                <Nav.Item eventKey="3-3" className="Nav_Item">IdCard report</Nav.Item>
                                {/* <Nav.Item eventKey="3-4" className="Nav_Item">IdCard report</Nav.Item> */}
                            </Nav.Menu>
                            <Nav.Menu placement="rightStart" eventKey="4" title="Advanced" icon={<MagicIcon />}
                                style={{
                                    color: expanded ? "#fff" : "#34495e",
                                    backgroundColor: expanded ? "#34495e" : "transparent",
                                }}
                            >
                                <Nav.Item eventKey="4-1" onClick={() => {
                                    // if (windowSize.width < 500) {
                                    //     setExpanded(false)
                                    // }
                                    navigate("/Geo");
                                }} className="Nav_Item">Designation</Nav.Item>
                                <Nav.Item eventKey="4-2" onClick={() => {
                                    // if (windowSize.width < 500) {
                                    //     setExpanded(false)
                                    // }
                                    navigate("/Device");
                                }} className="Nav_Item">Development report</Nav.Item>
                                <Nav.Item eventKey="3-3" className="Nav_Item">IdCard report</Nav.Item>
                                {/* <Nav.Item eventKey="3-4" className="Nav_Item">IdCard report</Nav.Item> */}
                            </Nav.Menu>
                            <Nav.Menu
                                placement="rightStart"
                                eventKey="5"
                                title="Settings"
                                icon={<GearCircleIcon />}
                                style={{
                                    color: expanded ? "#fff" : "#34495e",
                                    backgroundColor: expanded ? "#34495e" : "transparent",
                                }}
                            >
                                <Nav.Item eventKey="5-1">Change Password</Nav.Item>
                                <Nav.Item eventKey="5-2">Profile</Nav.Item>
                                <Nav.Item eventKey="5-3">Lagout</Nav.Item>
                                {/*  <Nav.Menu eventKey="4-5" title="Custom Action">
                                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
                            </Nav.Menu> */}
                            </Nav.Menu>
                        </Nav>
                    </Sidenav.Body>
                    <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
                </Sidenav>
            </div>
            {/* <div
        style={{
          flex: 1,
          backgroundColor: "#ecf0f1", // Main content background color
        }}
      >
        <h1>Main Content Area</h1>
        <p>This is where your main content will go.</p>
      </div> */}
        </div>
    );
};

export default Sidenavbar;