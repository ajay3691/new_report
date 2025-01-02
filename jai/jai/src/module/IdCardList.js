import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const toCamelCase = (str) => str.toLowerCase().replace(/([-_\s]+[a-z])/g, (match) => match.toUpperCase().replace(/[-_\s]/g, ""));

const IdCardList = () => {
  const { employeeId } = useSelector((state) => state.login.userData);
  const [idCardList, setIdCardtList] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [totalRecord, setTotalRecord] = useState(0);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [maxDisplayCount, setMaxDisplayCount] = useState(5);
  const tableData1 = ["Report Date", "Application", "Location", "Received Date", "Reg No", "No of Forms", "Scanning", "Typing", "Photoshop", "Coraldraw", "Under Printing", "To be Delivered", "Delivered"];


  useEffect(() => {
    const fetchIdCardList = async () => {
      try {
        const payload = {
          domain: "",
          page,
          limit: maxDisplayCount,
          fromDate,
          toDate,
        };
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/reportHistory/${employeeId}`, payload);

        const { status, data, totalRecords } = response.data;
        if (status === "Success") {
          setTotalRecord(totalRecords);
          setIdCardtList(data);
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchIdCardList();
  }, [employeeId, fromDate, maxDisplayCount, page, toDate]);

  return (
    <>
      <div date-rangepicker class="my-5 flex items-center">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input name="fromDate" onChange={(e) => setFromDate(e.target.value)} type="date" class="ReportHistory_date_input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5" placeholder="Select date start" />
        </div>
        <span class="mx-4 text-gray-500">to</span>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input name="toDate" type="date" onChange={(e) => setToDate(e.target.value)} class="ReportHistory_date_input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full ps-10 p-2.5" placeholder="Select date end" />
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-t-md">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-slate-200">
            <tr>
              {tableData1.map((title) => (
                <th scope="col" class="px-4 py-2">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          {idCardList.length > 0 ? (
            <tbody>
              {idCardList.map((value, index) => (
                <tr class="odd:bg-white even:bg-gray-50 border text-gray-600 whitespace-nowrap">
                  {/* <th scope="row" class="px-4 py-3 font-medium text-gray-900">
                      {value.reportDate}
                    </th> */}
                  {tableData1.map((item) => (
                    <td className="px-4 py-3">{value[toCamelCase(item)]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="flex justify-center font-bold">No Data</div>
          )}
        </table>
      </div>

      {totalRecord > 5 && (
        <div className="flex flex-col items-center p-3">
          <span className="text-sm text-gray-700">
            Showing <span className="font-semibold text-gray-900">1</span> to <span className="font-semibold text-gray-900 dark:text-white">5</span> of <span className="font-semibold text-gray-900">{totalRecord}</span> Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900">
              <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
              </svg>
              Prev
            </button>
            <button disabled={page * maxDisplayCount >= totalRecord} onClick={() => setPage(page + 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900">
              Next
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IdCardList;
