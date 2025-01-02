import React, { useContext, useEffect, useState } from "react";
import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import { Navigate, useNavigate } from "react-router-dom";

const DashBoard2 = () => {
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
        <div style={{ width: 240, height: '100vh' }}>
            <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}

            >
                <Sidenav.Body>
                    <Nav activeKey={activeKey} onSelect={(item) => { setActiveKey(item) }}>
                        <Nav.Item eventKey="1" icon={<DashboardIcon />} className="Nav_Item">
                            Dashboard
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<GroupIcon />}  className="Nav_Item">
                            User Group
                        </Nav.Item>
                        <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
                            <Nav.Item eventKey="3-1" onClick={() => {
                                // if (windowSize.width < 500) {
                                //     setExpanded(false)
                                // }
                                navigate("/Geo");
                            }}  className="Nav_Item">Geo</Nav.Item>
                            <Nav.Item eventKey="3-2" onClick={() => {
                                // if (windowSize.width < 500) {
                                //     setExpanded(false)
                                // }
                                navigate("/Device");
                            }}  className="Nav_Item">Devices</Nav.Item>
                            <Nav.Item eventKey="3-3"  className="Nav_Item">Loyalty</Nav.Item>
                            <Nav.Item eventKey="3-4"  className="Nav_Item">Visit Depth</Nav.Item>
                        </Nav.Menu>
                        <Nav.Menu
                            placement="rightStart"
                            eventKey="4"
                            title="Settings"
                            icon={<GearCircleIcon />}
                        >
                            <Nav.Item eventKey="4-1">Applications</Nav.Item>
                            <Nav.Item eventKey="4-2">Channels</Nav.Item>
                            <Nav.Item eventKey="4-3">Versions</Nav.Item>
                            <Nav.Menu eventKey="4-5" title="Custom Action">
                                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
                            </Nav.Menu>
                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
                <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
            </Sidenav>
        </div>
    );
};

export default DashBoard2;