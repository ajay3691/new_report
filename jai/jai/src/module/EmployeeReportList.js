import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const EmployeeReportList = () => {
  const { employeeId } = useSelector((state) => state.login.userData);
  const [employeeReportList, setEmployeeReportList] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [totalRecord, setTotalRecord] = useState(0);
  const [page, setPage] = useState(1);
  const [maxDisplayCount, setMaxDisplayCount] = useState(5);
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  useEffect(() => {
    const fetchEmployeeReportList = async () => {
      try {
        const payload = {
          domain: "Development",
          page: page.toString(),
          limit: maxDisplayCount,
          fromDate,
          toDate,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/reportHistory_admin`,
          payload
        );

        const { status, data, totalRecords } = response.data;
        if (status === "Success") {
          setTotalRecord(totalRecords);
          setEmployeeReportList(data || []);
        } else {
          setEmployeeReportList([]);
        }
      } catch (error) {
        console.error("Error occurred:", error);
        setEmployeeReportList([]);
      }
    };

    fetchEmployeeReportList();
  }, [employeeId, fromDate, toDate, page, maxDisplayCount]);

  return (
    <>
      <div className="my-5 flex items-center justify-center gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            name="fromDate"
            onChange={(e) => setFromDate(e.target.value)}
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
            placeholder="Select start date"
          />
        </div>
        <span className="mx-4 text-gray-500">to</span>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            name="toDate"
            type="date"
            onChange={(e) => setToDate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
            placeholder="Select end date"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        {employeeReportList.map((dateItem, dateIndex) => (
          <button
            key={dateIndex}
            type="button"
            className={`flex-1 p-3 font-medium text-sm rounded-lg border ${
              expandedSection === dateIndex ? "bg-indigo-200" : "bg-gray-100"
            } border-indigo-200 text-gray-700 flex items-center justify-between shadow-md`}
            onClick={() => toggleSection(dateIndex)}
          >
            <div>
              {dateIndex + 1}. {dateItem.reportDate}
            </div>
            <svg
              className={`w-3 h-3 transition-transform duration-300 ${
                expandedSection === dateIndex ? "rotate-180" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5L5 1 1 5"
              />
            </svg>
          </button>
        ))}
      </div>

      <div id="accordion-collapse" data-accordion="collapse">
        {employeeReportList.map((dateItem, dateIndex) => (
          <div key={dateIndex}>
            <div
              id={`accordion-collapse-body-${dateIndex}`}
              className={`p-5 border border-b border-gray-300 ${
                expandedSection === dateIndex ? "" : "hidden"
              }`}
              aria-labelledby={`accordion-collapse-heading-${dateIndex}`}
            >
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Employee Name & ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Project Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Subcategories
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Report
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dateItem.reports.map((reportItem, reportIndex) => (
                    <React.Fragment key={reportIndex}>
                      {reportItem.reportDetails.map((detail, detailIndex) => (
                        <tr
                          key={detailIndex}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">
                            {reportItem.name} (ID: {reportItem.employeeId})
                          </td>
                          <td className="px-6 py-4">
                            {detail.projectName || "N/A"}
                          </td>
                          <td className="px-6 py-4">
                            {detail.subCategoryName ? (
                              <ul>
                                {Array.isArray(detail.subCategoryName) ? (
                                  detail.subCategoryName.map((subCat, subCatIndex) => (
                                    <li key={subCatIndex}>{subCat}</li>
                                  ))
                                ) : (
                                  <li>{detail.subCategoryName}</li>
                                )}
                              </ul>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {detail.report ? (
                              <p>{detail.report}</p>
                            ) : (
                              "No report available."
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EmployeeReportList;
