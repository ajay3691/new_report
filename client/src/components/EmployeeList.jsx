import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../authCoponents/Sidenav";
import Topnav from "../authCoponents/Topnav";
import { Table, Button } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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
                console.log("Deleted employee with ID:", id);
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
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4 relative" style={{ display: "flex" }}>
                        <h2 className="text-2xl font-semibold">Employee List</h2>
                        <button
                            onClick={() => navigate("/dashboard/addEmployee")}
                            className="px- py-2 bg-blue-800 text-white rounded hover:bg-blue-800"
                        >
                            Add Employee
                        </button>
                    </div>

                    <Table
                        height={550}
                        data={employeeList}
                        width={1240}
                        onRowClick={(rowData) => console.log(rowData)}
                        bordered
                        cellBordered
                    >
                        <Column width={80} align="center" fixed>
                            <HeaderCell>S/No</HeaderCell>
                            <Cell>
                                {(rowData, rowIndex) => <span>{rowIndex + 1}</span>}
                            </Cell>
                        </Column>

                        <Column width={150}>
                            <HeaderCell>Employee ID</HeaderCell>
                            <Cell dataKey="employeeId" />
                        </Column>

                        <Column width={220}>
                            <HeaderCell>Name</HeaderCell>
                            <Cell dataKey="employeeName" />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>Designation</HeaderCell>
                            <Cell dataKey="designation" />
                        </Column>

                        <Column width={180}>
                            <HeaderCell>Mobile</HeaderCell>
                            <Cell dataKey="mobileNumber" />
                        </Column>

                        <Column width={250}>
                            <HeaderCell>Email</HeaderCell>
                            <Cell dataKey="email" />
                        </Column>

                        <Column width={150} fixed="right">
                            <HeaderCell>Actions</HeaderCell>
                            <Cell>
                                {(rowData) => (
                                    <div className="flex gap-2">
                                        <Button
                                            appearance="link"
                                            onClick={() => handleEdit(rowData.employeeId)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                        </Button>
                                        <Button
                                            appearance="link"
                                            color="red"
                                            onClick={() => handleDelete(rowData.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                        </Button>
                                    </div>
                                )}
                            </Cell>
                        </Column>
                    </Table>

                    {totalRecord > maxDisplayCount && (
                        <div className="flex justify-between items-center mt-4">
                            <span>
                                Showing {(page - 1) * maxDisplayCount + 1} to{" "}
                                {Math.min(page * maxDisplayCount, totalRecord)} of {totalRecord}{" "}
                                Entries
                            </span>
                            <div className="inline-flex">
                                <Button
                                    appearance="primary"
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                >
                                    Prev
                                </Button>
                                <Button
                                    appearance="primary"
                                    disabled={page * maxDisplayCount >= totalRecord}
                                    onClick={() => setPage(page + 1)}
                                    className="ml-2"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
