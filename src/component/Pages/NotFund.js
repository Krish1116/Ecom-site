import React from "react";
import "./NotFound.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFund = () => {
  React.useEffect(() => {
    document.getElementsByClassName("navbar")[0].style.display = "none";
    document.getElementsByClassName("footer")[0].style.display = "none";
  }, []);
  return (
    <>
      <div className="container-fluid error">
        <div className="row d-flex justify-content-center align-items-center height-vh">
          <div className="col-lg-6 col-12">
            <div className="col-md-12">
              <img
                alt="Page not Found"
                src="https://raw.githubusercontent.com/Rustcodeweb/404-Error-Page-Design/main/image.png"
                width="100%"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
              <h1 className="main-heading">404</h1>
              <h2>we couldn't find this page.</h2>
              <div className="text-center mt-4 mb-5">
                <Link to="/home">
                  <Button className="ml-4 bg-primary">Go to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFund;
