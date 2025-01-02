import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { postData, updateData } from "../../apiservices";
import { Modal, Button } from "rsuite";
import { Loders } from "../Loders";
import { toast } from "react-toastify";

function ExpensesForm() {
  const ExpensesItem = localStorage.getItem("Expenses");
  const item = JSON.parse(ExpensesItem);
  const navigate = useNavigate();
  const onlyLetters = /^[A-Za-z\s]+$/;
  const [items, setItems] = useState(item ? item.item : "");
  const [purchaseFrom, setpurchaseFrom] = useState(item ? item.purchasefrom : "");
  const [purchaseDate, setpurchaseDate] = useState(item ? item.purchasedate : "");
  const [purchaseBy, setpurchaseBy] = useState(item ? item.purchaseby : "");
  const [Amout, setAmount] = useState(item ? item.Amount : "");
  const [Paidby, setpaidby] = useState(item ? item.paidby : "");
  const [status, setstatus] = useState(item ? item.Status : "");
  const [openpopUp, setopenpopUp] = useState(false);
  const [itemError, setitemError] = useState(item ?'Valid':'');
  const [purchaseFromError, setpurchaseFromError] = useState(item ?'Valid':'');
  const [purchaseByError, setpurchaseByError] = useState(item ?'Valid':'');
  const [paidByError, setpaidByError] = useState(item ?'Valid':'');
  const [Loder, setLoder] = useState(false);

  const expensesdata = {
    item: items,
    purchasefrom: purchaseFrom,
    purchasedate: purchaseDate,
    purchaseby: purchaseBy,
    Amount: Amout,
    paidby: Paidby,
    Status: status,
  };
  const postdata = () => {
    postData("Expenses", expensesdata)
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
    updateData("Expenses", expensesdata, `${id}`)
      .then((res) => {
        setLoder(false)
        setopenpopUp(true)
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
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
                navigate("/Expenses");
                localStorage.removeItem("Expenses");
              }}
            />
          </div>
          <div className="pl-20">
            <span className="fs-20">Add Expenses</span>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className="col-md-3">
          <div className="pt-10">
            <label className="form-label">Item Name</label>
            <input
              className="form-control p-5"
              type="text"
              name="Lastname"
              value={items}
              onChange={(e) => {
                if(onlyLetters.test(e.target.value) || e.target.value===""){
                  setitemError('Valid')
                } else {
                  setitemError("Only Letters are allowed");
                }
                setItems(e.target.value);
              }}
            />
            <span className="fs-12 red">
              {itemError === "Valid" ? "" : itemError}
            </span>
          </div>
          <div className="pt-10">
            <label className="form-label">Purchased From</label>
            <input
              className="form-control p-5"
              type="text"
              name="employID"
              value={purchaseFrom}
              onChange={(e) => {
                if(onlyLetters.test(e.target.value) || e.target.value===""){
                  setpurchaseFromError('Valid')
                } else {
                  setpurchaseFromError("Only Letters are allowed");
                }
                setpurchaseFrom(e.target.value);
              }}
            />
             <span className="fs-12 red">
              {purchaseFromError === "Valid" ? "" : purchaseFromError}
            </span>
          </div>
          <div className="pt-10">
            <label className="form-label">Purchased Date</label>
            <input
              className="form-control p-5"
              type="date"
              value={purchaseDate}
              onChange={(e) => {
                setpurchaseDate(e.target.value);
              }}
            />
          </div>
          <div className="pt-10">
            <label className="form-label">Purchased BY</label>
            <input
              className="form-control p-5"
              type="text"
              name="employID"
              value={purchaseBy}
              onChange={(e) => {
                if(onlyLetters.test(e.target.value) || e.target.value===""){
                  setpurchaseByError('Valid')
                } else {
                  setpurchaseByError("Only Letters are allowed");
                }
                setpurchaseBy(e.target.value);
              }}
            />
             <span className="fs-12 red">
              {purchaseByError === "Valid" ? "" : purchaseByError}
            </span>
          </div>
        </div>
        <div className="col-md-3 pl-15">
          <div className="pt-10 d-flex" style={{ flexDirection: "column" }}>
            <label className="form-label">Amount</label>
            <input
              className="form-control p-5"
              type="number"
              value={Amout}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
          <div className="pt-10">
            <label className="form-label">Paid By</label>
            <input
              className="form-control p-5"
              type="text"
              name="employID"
              value={Paidby}
              onChange={(e) => {
                if(onlyLetters.test(e.target.value) || e.target.value===""){
                  setpaidByError('Valid')
                } else {
                  setpaidByError("Only Letters are allowed");
                }
                setpaidby(e.target.value);
              }}
            />
             <span className="fs-12 red">
              {paidByError === "Valid" ? "" : paidByError}
            </span>
          </div>
          <div className="pt-10">
            <label className="form-label">Status</label>
            <select
              className="form-select p-5"
              onChange={(e) => {
                setstatus(e.target.value);
              }}
              value={status}
            >
              <option></option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="">
            {item ? (
              <div className="mt-5 text-center">
                <button
                  type="button"
                  className="btn mb-3 submitbtn"
                  onClick={() => {
                    setLoder(true)
                    updatedata(item.deleteId);
                  }}
                  disabled={
                    !(
                      items &&
                      purchaseFrom &&
                      purchaseDate &&
                      purchaseBy &&
                      Amout &&
                      Paidby &&
                      status&&
                      itemError === "Valid" &&
                      purchaseFromError === "Valid" &&
                      purchaseByError === "Valid"&&
                      paidByError === "Valid"
                    )
                  }
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="text-center mt-5">
                <button
                  type="submit"
                  className="btn submitbtn"
                  onClick={() => {
                    setLoder(true)
                    postdata();
                  }}
                  disabled={
                    !(
                      items &&
                      purchaseFrom &&
                      purchaseDate &&
                      purchaseBy &&
                      Amout &&
                      Paidby &&
                      status&&
                      itemError === "Valid" &&
                      purchaseFromError === "Valid" &&
                      purchaseByError === "Valid"&&
                      paidByError === "Valid"
                    )
                  }
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
      </div>
      <Modal
        open={openpopUp}
        onClose={() => {
          setopenpopUp(false);
          navigate("/Expenses");
          localStorage.removeItem("Expenses");
        }}
      >
        <Modal.Header>
          <Modal.Title>Expenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!item ? (
            <p>Expense Addition Successfully!</p>
          ) : (
            <p>Expenses Update Successfully!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              navigate("/Expenses");
              localStorage.removeItem("Expenses");
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

export default ExpensesForm;
