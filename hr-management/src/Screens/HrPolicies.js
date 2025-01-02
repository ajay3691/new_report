import React, { useEffect, useRef, useState } from "react";
import { DeleteData, FetchData, postData } from "../apiservices";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal, Button } from "rsuite";
import { Loders } from "./Loders";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
function HrPolicies() {
  const initialized = useRef(false);
  const [filepath, setFilepath] = useState([]);
  const [filename, setfilename] = useState();
  const [pdfopen, setpdfopen] = useState(true);
  const [deletepopup, setdeletepopup] = useState(false);
  const [deleteFileID, setdeleteFileID] = useState();
  const [Loder, setLoder] = useState(true);
  const getpdfdata = () => {
    FetchData("HrManagement")
      .then((res) => {
        setFilepath(res);
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`, { autoClose: 1000 });
      });
  };

  const handleFileChange = (e) => {
    setLoder(true);
    const selectedFile = e.target.files[0];
    const storageRef = ref(storage, `/PDF_files/${selectedFile?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => {
        console.log("Error during file upload:", err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          if (url) {
            PDF_Upload(url, selectedFile?.name);
          }
        });
      }
    );
  };

  const PDF_Upload = (new_PDF_Path, name) => {
    postData("HrManagement", { name: name, path: new_PDF_Path })
      .then((res) => {
        getpdfdata();
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getpdfdata();
    }
  }, []);
  const DeleteFile = (id) => {
    DeleteData("HrManagement", `${id}`)
      .then((res) => {
        getpdfdata();
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`, { autoClose: 1000 });
      });
  };
  return (
    <div className="h-100 py-2">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100" : "h-100 card"}>
        {pdfopen ? (
          <div className="h-100 p-10">
            <div className="d-flex align-items-center justify-content-between h-10">
              <div>
                <h5>HR Policies</h5>
              </div>
              <div className="">
                <label
                  htmlFor="fileInput"
                  style={{
                    cursor: "pointer",
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "#244F96",
                    color: "#fff",
                  }}
                >
                  Document Upload
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept=".pdf ,.txt ,.doc" // Optional: Specify allowed file types
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="h-90" style={{ overflowY: "auto" }}>
              {filepath.map((item, index) => (
                <div key={index}>
                  <div className="d-flex">
                    <p
                      onClick={() => {
                        setfilename(item);
                        setpdfopen(false);
                      }}
                    >
                      {item.name},
                    </p>
                    <span
                      className="pl-10"
                      onClick={() => {
                        setdeleteFileID(item.deleteId);
                        setdeletepopup(true);
                      }}
                    >
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-100 p-10">
            <div className="d-flex align-items-center h-5">
              <BsFillArrowLeftCircleFill
                size={25}
                color="#1EB0DF"
                onClick={() => {
                  setpdfopen(true);
                }}
              />
              <div className="pl-20">
                <span style={{ color: "#1EB0DF", fontSize: 20 }}>
                  Document Details
                </span>
              </div>
            </div>
            <div className="h-95 pt-10">
              <iframe
                src={filename.path}
                className="w-100 h-100"
                title={filename.name}
              />
            </div>
          </div>
        )}
        <Modal
          open={deletepopup}
          onClose={() => {
            setdeletepopup(false);
          }}
        >
          <Modal.Header>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            Are you sure you want to delete this Document? This action cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                setLoder(true);
                DeleteFile(deleteFileID);
                setdeletepopup(false);
              }}
              style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
            >
              Ok
            </Button>
            <Button
              onClick={() => {
                setdeletepopup(false);
              }}
              style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default HrPolicies;
