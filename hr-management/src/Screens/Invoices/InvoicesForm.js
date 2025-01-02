import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { postData, updateData } from "../../apiservices";
import { Modal, Button } from "rsuite";
import { Loders } from "../Loders";
import { toast } from "react-toastify";
function InvoicesForm() {
  const Invoicesdata = localStorage.getItem("Invoices");
  const item = JSON.parse(Invoicesdata);
  const navigate = useNavigate();
  const [invoiceNo, setinvoiceNo] = useState(item ? item.invoiceNumber : "");
  const [clientName, setclientName] = useState(item ? item.clientName : "");
  const [createDate, setcreateDate] = useState(item ? item.createDate : "");
  const [duedate, setduedate] = useState(item ? item.dueDate : "");
  const [Amount, setAmount] = useState(item ? item.amount : "");
  const [Status, setStatus] = useState(item ? item.status : "");
  const [clientnameError, setclientnameError] = useState(item ? "Valid":"");
  const [openpopUp, setopenpopUp] = useState(false);
  const [Loder, setLoder] = useState(false);

  const invoicedata = {
    invoiceNumber: invoiceNo,
    clientName: clientName,
    createDate: createDate,
    dueDate: duedate,
    amount: Amount,
    status: Status,
  };
  const postdata = () => {
    postData("Invoices", invoicedata)
      .then((res) => {
        setLoder(false)
        setopenpopUp(true)
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  const updatedata = (id) => {
    updateData("Invoices", invoicedata, `${id}`)
      .then((res) => {
        setLoder(false)
        setopenpopUp(true)
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  const onlyLetters = /^[A-Za-z\s]+$/;

  return (
    <div className="container-fluid">
       {Loder ? <Loders/> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
      <div className="d-flex pt-15">
        <div className="text-center d-flex align-items-center">
          <div>
            <BsFillArrowLeftCircleFill
              size={25}
              color="#244E96"
              onClick={() => {
                navigate("/Invoices");
                localStorage.removeItem("Invoices");
              }}
            />
          </div>
          <div className="pl-20">
            <span className="fs-20">Add Invoices</span>
          </div>
        </div>
      </div>
      <div className="col-8">
        <div className="d-flex">
          <div className="col-6">
            <div className="pt-10">
              <label className="form-label">Invoice Number</label>
              <input
                className="form-control w-80 p-5"
                type="Number"
                name="Lastname"
                value={invoiceNo}
                onChange={(e) => {
                  setinvoiceNo(e.target.value);
                }}
              />
            </div>
            <div className="pt-10">
              <label className="form-label">Client Name</label>
              <input
                className="form-control w-80 p-5"
                type="text"
                name="clientName"
                value={clientName}
                onChange={(e) => {
                  if (
                    onlyLetters.test(e.target.value) ||
                    e.target.value === ""
                  ) {
                    setclientnameError("Valid");
                  } else {
                    setclientnameError("Only Letters are allowed");
                  }
                  setclientName(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {clientnameError === "Valid" ? "" : clientnameError}
              </span>
            </div>
            <div className="pt-10">
              <label className="form-label">Create Date</label>
              <input
                className="form-control w-80 p-5"
                type="date"
                value={createDate}
                onChange={(e) => {
                  setcreateDate(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="pt-10">
              <label className="form-label">Due Date</label>
              <input
                className="form-control w-80 p-5"
                type="date"
                value={duedate}
                onChange={(e) => {
                  setduedate(e.target.value);
                }}
              />
            </div>
            <div className="pt-10">
              <label className="form-label">Amount</label>
              <input
                className="form-control w-80 p-5"
                type="Number"
                name="Jobrole"
                value={Amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <div className="pt-10">
              <label className="form-label">Status</label>
              <select
                className="form-select p-5 w-80"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                value={Status}
              >
                <option></option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-5 w-80 ms-5">
          {item ? (
            <div className="pt-20 text-center">
              <button
                type="button"
                className="btn mb-3 submitbtn"
                onClick={() => {
                  setLoder(true)
                  updatedata(item.deleteId);
                }}
                disabled={!(
                  invoiceNo&&
                  clientName&&
                  createDate&&
                  duedate&&
                  Amount&&
                  Status&&
                  clientnameError==='Valid'
                )}
              >
                Update
              </button>
            </div>
          ) : (
            <div className="pt-20 text-center">
              <button
                type="submit"
                className="btn mb-3 submitbtn"
                onClick={() => {
                  setLoder(true)
                  postdata();
                }}
                disabled={!(
                  invoiceNo&&
                  clientName&&
                  createDate&&
                  duedate&&
                  Amount&&
                  Status&&
                  clientnameError==='Valid'
                )}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="col-4"></div>
      </div>
      <Modal
        open={openpopUp}
        onClose={() => {
          setopenpopUp(false);
          navigate("/Invoices");
          localStorage.removeItem("Invoices");
        }}
      >
        <Modal.Header>
          <Modal.Title>Invoices</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!item ? (
            <p>Invoice Added Successfully!</p>
          ) : (
            <p>Invoice Updated Successfully!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              navigate("/Invoices");
              localStorage.removeItem("Invoices");
            }}
            style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InvoicesForm;
