import React, { useEffect, useState } from "react";
import { FetchData } from "../../apiservices";
import { Table, Pagination } from "rsuite";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Loders } from "../Loders";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function Userwork() {
  const name = localStorage.getItem("login");
  const item = JSON.parse(name);
  const { Column, HeaderCell, Cell } = Table;
  const [Tabledata, setTabledata] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [Completedstatus, setcompletedstatus] = useState([]);
  const [pendingstatus, setpendingstatus] = useState([]);
  const [Ongoingstatus, setOngoingstatus] = useState([]);
  const [Loder, setLoder] = useState(true);
  const get = () => {
    FetchData("Tasks").then((res) => {
      setTabledata([]);
      setOngoingstatus([]);
      setcompletedstatus([]);
      setpendingstatus([]);
      res.forEach((data) => {
        if (data.firstname === item.first_name) {
          setTabledata((previewadata) => [...previewadata, data]);
          if (data.status === "Completed") {
            setcompletedstatus((item) => [...item, data]);
          } else if (data.status === "Pending") {
            setpendingstatus((item) => [...item, data]);
          } else if (data.status === "Ongoing") {
            setOngoingstatus((prev) => [...prev, data]);
          }
        }
        setLoder(false)
      });
    });
  };
  useEffect(() => {
    get();
  }, []);
  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  const workdata = Tabledata.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  const getData = (j) => {
    if (sortColumn && sortType) {
      return workdata.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortColumn === "joiningdate") {
          x = new Date(...a[sortColumn].split("/").reverse());
          y = new Date(...b[sortColumn].split("/").reverse());
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }

    return workdata;
  };
  const options = {
    responsive: true,
    // plugins: {
    //     legend: {
    //         position: 'chartArea',
    //         labels: {
    //             boxHeight: 5,
    //             textAlign: 'cener',

    //         }
    //     },
    // },
  };
  const data = {
    labels: ["Completed", "Pending", "Ongoing"],
    datasets: [
      {
        data: [
          Completedstatus.length,
          pendingstatus.length,
          Ongoingstatus.length,
        ],
        backgroundColor: [
          "#1EB0DF",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
      },
    ],
  };
  return (
    <div className="py-2 h-100 ">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100 w-100 d-flex" : "h-100 w-100 d-flex"}>
        <div className="mr-10 h-100 card p-10" style={{ width: "66%" }}>
          <div className="h-90">
            <Table
              cellBordered
              wordWrap="break-word"
              bordered
              data={getData()}
              onRowClick={(rowData) => {
                console.log(rowData);
              }}
              fillHeight={true}
              sortColumn={sortColumn}
              sortType={sortType}
              onSortColumn={handleSortColumn}
              loading={loading}
              className="tablesort"
            >
              <Column width={65} align="center">
                <HeaderCell className="tableheader">Sl.No</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column  width={140}>
                <HeaderCell className="tableheader">First Name</HeaderCell>
                <Cell dataKey="firstname" />
              </Column>
              <Column  width={120}>
                <HeaderCell className="tableheader">Employ ID</HeaderCell>
                <Cell dataKey="employid" style={{ marginLeft: 15 }} />
              </Column>
              <Column  width={160}>
                <HeaderCell className="tableheader">Task</HeaderCell>
                <Cell dataKey="task" />
              </Column>
              <Column  width={140}>
                <HeaderCell className="tableheader">Status</HeaderCell>
                <Cell dataKey="status" />
              </Column>
              <Column  width={150}>
                <HeaderCell className="tableheader">Date</HeaderCell>
                <Cell dataKey="date" />
              </Column>
            </Table>
          </div>
          <div className="h-10 pt-20">
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="xs"
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              total={Tabledata.length}
              limitOptions={[2, 5, 10, 30, 50]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
          </div>
        </div>
        <div className="card h-100">
          <div className="align-items-center justify-content-center d-flex h-100 flex-column">
            <Pie data={data} options={options} className="circle" />
            <h6 className="pt-20">{Tabledata.length}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userwork;
