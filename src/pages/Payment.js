import React from "react";
import "./Payment.css";
import { Link } from "react-router-dom";
const Payment = () => {
  return (
    <div>
      <div className="pay-container mt-5 px-5 fs-4">
        <div className="mb-4">
          <h1>Confirm order and Payment</h1>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="pay-card p-3">
              <h4 className="text-uppercase">Payment details</h4>
              <div className="inputbox mt-3 ">
                
                <input
                  type="text"
                  name="name"
                  className="form-control "
                  required="required"
                />
                <span>Name on card</span>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required="required"
                    />
                    <i className="fa fa-credit-card"></i> <span>Card Number</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-row">
                    <div className="inputbox mt-3 mr-2">
                      
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />
                      <span>Expiry</span>
                    </div>

                    <div className="inputbox mt-3 mr-2">
                      
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />
                      <span>CVV</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 mb-4">
                <h4 className="text-uppercase">Billing Address</h4>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="inputbox mt-3 mr-2">
                      
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />
                      <span>Street Address</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="inputbox mt-3 mr-2">
                      
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />
                      <span>City</span>
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="inputbox mt-3 mr-2">
                      
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />
                      <span>State/Province</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="inputbox mt-3 mr-2">
                      
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />
                      <span>Zip code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-4 d-flex justify-content-between">
                <Link to="/Buy">
              <span>Previous step</span></Link>

              <button className="btn btn-success px-3 fs-3">Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
