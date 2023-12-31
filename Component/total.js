import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Arrow from "../public/arrow.svg";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useRef } from "react";
// Add state variable to store the selected userId
let moon;
let sun;
let start_time;
let entry_fee;
let firstprize;
// let players;

const MyRefferal = () => {

  const [referrals, setReferrals] = useState([]); // Initialize as an empty array
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);
  const firstRef = useRef()
  const firstRef1 = useRef()
  const firstRef2 = useRef()
  // const firstRef3 = useRef()

  async function myReferrals() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/totalUser", { token: token });
      const response = res.data;
      console.log(response.data, "to get the data from api");
      setReferrals(response.data.data); // Update to access data property correctly
    } catch (err) {
      console.log(err);
    }
  }
  // model setup
  async function apiFunction(e) {
    try {
      console.log("hit function",e);
      setModalOpen(!modalOpen)
      moon = e
      console.log(moon, "userId");

    } catch (err) {
      console.log(err, "api error here")
    }
  }
  async function apiFunction1(e) {
    try {
      console.log("hit function",e);
      setModalOpen(!modalOpen)
      sun = e
      console.log(sun, "userId!!!!");
      let active = 2;
      const data  = {
        id:sun,
        active
      }
      console.log(data,"rejevt data");
      let res = await axios.post("/api/profile",data );
      const response = res.data;
      setModalOpen(false);
      console.log("model closed");
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.log(err, "api error here")
    }
  }
  // handle modle onclick
  const handleAddChips = async (e) => {
    try {
      let active = 1;
      const data = {
        id:moon,
        active
      };
      console.log(data, "moon hererererererere ");
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/profile",data );
      const response = res.data;
      setModalOpen(false);
      console.log("model closed");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    myReferrals();
  }, []);

  return (

    <div>
      
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className="modal-header d-flex justify-content-between align-items-center m-0">
          <h5 className="modal-title">Approve </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
         

        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={handleAddChips} // Call handleAddChips function when the "Save Changes" button is clicked
          >
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>

      {/* reject */}
      
      <section className="profile-sec">
        <div className="container">
          <div className="row justify-content-center">
            <form className="input-sec" id="ref-code">
              <h3 className="heading-text pink-text mt-2">
                <span
                  className="arrows-icon"
                  id="left-rfset"
                  style={{
                    position: "relative",
                    left: "-44%",
                    cursor: "pointer",
                  }}
                >
                  <img src={Arrow.src} onClick={() => router.back()} />
                </span>
                Withdraw Request
              </h3>

              <table className="table funds-table mt-3" id="funds-color">
                <thead>
                  <tr>
                    <th id="fuds" scope="col">
                      Id
                    </th>
                    <th id="fuds" scope="col">
                     Email
                    </th>
                    <th id="fuds" scope="col">
                      PaymentMethod
                    </th>
                    <th id="fuds" scope="col">
                       Amount
                    </th>
                    <th id="fuds" scope="col">
                    TransactionId
                    </th>
                    <th id="fuds" scope="col">
                    Status
                    </th>
                    <th id="fuds" scope="col">
                      Approve
                    </th>
                    <th id="fuds" scope="col">
                      Reject
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {referrals.length > 0 ? (
                    referrals.map((referral, index) => (
                      <tr key={referral.id}>
                        <td>{index + 1}</td>
                        <td>{referral.email}</td>
                        <td>{referral.paymentMethod}</td>
                        <td>{referral.totalAmount}</td>
                        <td> {referral.transactionId } </td>
                        <td>  {referral.active === 0  ? "Pending" : referral.active === 1 ? "Success" : referral.active === 2
    ? "Reject"
    : "Unknown Status"}
</td>
                        
                        <td> <Button
  color="primary"
  type="button"
  onClick={() => apiFunction(referral.id)}
  disabled={referral.active === 1 ||referral.active === 2}
>
  Approve
</Button></td>
                        <td> <Button color="danger" type="button"
                          onClick={() => apiFunction1(referral.id)}
                          disabled={referral.active === 2 ||referral.active === 1 }>
                           
                          Reject
                        </Button></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No data found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </section>
    </div>
    // model

  );
};

export default MyRefferal;
