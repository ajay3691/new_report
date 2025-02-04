import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../authCoponents/Sidenav";
import Topnav from "../authCoponents/Topnav";
import { Table, Button } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";

const { Column, HeaderCell, Cell } = Table;

const EmployeeList = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [page, setPage] = useState(1);
    const [maxDisplayCount, setMaxDisplayCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeList = async () => {
            try {
                const payload = { domain: "", page, limit: maxDisplayCount };
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/employee_list/`,
                    payload
                );
                const { status, data, totalRecords } = response.data;
                if (status === "Success") {
                    setTotalRecord(totalRecords);
                    setEmployeeList(data);
                }
            } catch (error) {
                console.error("Error occurred:", error);
            }
        };
        fetchEmployeeList();
    }, [maxDisplayCount, page]);

    const handleEdit = async (employeeId) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/getEmployeeById/${employeeId}`
            );
            if (response.data.status === "Success") {
                navigate("/dashboard/addEmployee", {
                    state: { employee: response.data.data },
                });
            }
        } catch (error) {
            console.error("Error fetching employee details:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/deleteEmployee/${id}`
            );
            if (response.data.status === "Success") {
                setEmployeeList(employeeList.filter((emp) => emp.id !== id));
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidenav />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Topnav />
                <div className="p-4" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* <h2>Employee List</h2> */}
                    <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
                    <Table
                        height={500}
                        data={employeeList}
                        bordered
                        cellBordered
                        hover={true}
                        autoHeight={false}
                        bodyRef={(ref) => {
                            if (ref) {
                                ref.style.overflowY = "auto"; 
                                ref.style.maxHeight = "500px"; 
                            }
                        }}
                    >
                            <Column width={50} align="center" fixed>
                                <HeaderCell style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>S/No</HeaderCell>
                                <Cell>{(rowData, rowIndex) => rowIndex + 1}</Cell>
                            </Column>
                            <Column width={50} align="center" fixed>
                                <HeaderCell style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Profile</HeaderCell>
                                <Cell>
                                    {(rowData) => (
                                        <img
                                            src={rowData.profileUrl}
                                            alt="Profile"
                                            style={{ width: 40, height: 40, borderRadius: "50%" }}
                                        />
                                    )}
                                </Cell>
                            </Column>
                            <Column flexGrow={1} align="center">
                                <HeaderCell style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Employee Id</HeaderCell>
                                <Cell dataKey="employeeId" />
                            </Column>
                            <Column flexGrow={1} align="center">
                                <HeaderCell style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Designation</HeaderCell>
                                <Cell dataKey="designation" />
                            </Column>
                            <Column flexGrow={1} align="center">
                                <HeaderCell style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Name</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>
                            <Column flexGrow={1} align="center">
                                <HeaderCell style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Mobile</HeaderCell>
                                <Cell dataKey="mobileNumber" />
                            </Column>
                            <Column flexGrow={1} align="center">
                                <HeaderCell style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Email</HeaderCell>
                                <Cell dataKey="email" />
                            </Column>
                            <Column width={120} align="center">
                                <HeaderCell style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Actions</HeaderCell>
                                <Cell>
                                    {(rowData) => (
                                        <>
                                            <Button
                                                appearance="subtle"
                                                onClick={() => handleEdit(rowData.id)}
                                                title="Edit"
                                            >
                                                <FontAwesomeIcon icon={faEdit} color="blue" />
                                            </Button>
                                            <Button
                                                appearance="subtle"
                                                onClick={() => handleDelete(rowData.id)}
                                                title="Delete"
                                            >
                                                <FontAwesomeIcon icon={faTrash} color="red" />
                                            </Button>
                                        </>
                                    )}
                                </Cell>
                            </Column>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
