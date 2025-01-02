import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Navbar/Sidebar";

const TodayReports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:9000/api/reports", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setReports(response.data.reports);
            } catch (error) {
                console.error("Error fetching today's reports", error);
            }
        };

        fetchReports();
    }, []);

    return (
        <div>
            <Navbar />
            <Container fluid>
                <div className="d-flex">
                   {/*  <Sidebar /> */}
                    <div className="flex-grow-1">
                        <h2 className="mt-3">Today's Reports</h2>
                        <Table striped bordered hover className="mt-3">
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Employee Name</th>
                                    <th>Project Name</th>
                                    <th>Subcategory</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(reports) && reports.length > 0 ? (
                                    reports.map((report, index) => (
                                        <tr key={index}>
                                            <td>{report.employeeId}</td>
                                            <td>{report.employeeName}</td>
                                            <td>{report.projectName}</td>
                                            <td>{report.subcategoryName}</td>
                                            <td>{report.description}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No reports available</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TodayReports;
