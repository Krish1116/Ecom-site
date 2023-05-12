import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { Alert, Button, Form, Spinner, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const UserEntryIn = () => {
  // const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const switchSignInToLogIn = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(
      "Submitting form with data: ",
      // enteredName,
      enteredEmail,
      enteredPassword
    );
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDyUk1qwIsUPo_Y4jdQZfGaLkSpqx7pzA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDyUk1qwIsUPo_Y4jdQZfGaLkSpqx7pzA";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        // name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setIsLoading(false);
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // console.log(data);
            let errorMessg = "Authentication Failed";
            // if (data && data.error && data.error.message) {
            //   errorMessg = data.error.message;
            // }
            setResponse(errorMessg);
            throw new Error(errorMessg);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        authCtx.login(data.idToken);
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("emailId", data.email);
        if (!isLogin) {
          switchSignInToLogIn();
          setResponse(null);
        } else {
          navigate("/store");
        }
      })
      .catch((err) => setResponse(err.message));
  };

  return (
    <>
      <div
        className="music-title-container"
        style={{ position: "absolute", top: "100px", right: "35%" }}
      >
        {" "}
        {isLogin ? (
          <span className="text-center fs-2">Login Generics Dashboard</span>
        ) : (
          <span className="text-center fs-2">Create Your Free Account </span>
        )}
      </div>
      {response && <Alert variant="danger">{response}</Alert>}
      <Form
        className="box"
        onSubmit={submitHandler}
        style={{ position: "relative", margin: "102px" }}
      >
        {/* {!isLogin && (
          <FloatingLabel
            controlId="floatingPassword"
            label="Name (required)"
            className="mb-3 w-50 mx-auto"
          >
            <Form.Control
              type="text"
              placeholder="Name"
              className="lbl"
              ref={nameInputRef}
            />
          </FloatingLabel>
        )} */}
        <FloatingLabel
          controlId="floatingInput"
          label="Email address (required)"
          className="mb-3 w-50 mx-auto"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            className="lbl"
            ref={emailInputRef}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password (required)"
          className="w-50 mx-auto"
        >
          <Form.Control
            type="password"
            placeholder="password"
            className="lbl"
            ref={passwordInputRef}
          />
        </FloatingLabel>
        {/* <div className="d-flex justify-content-center">
          {isLogin ? (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="mt-3 w-50 mb-5 "
            >
              Login
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="mt-3 w-50 mb-5 "
            >
              Create Your Account
            </Button>
          )}
          {isLoading && (
            <div className="row align-items-center mt-4 mt-3 w-50 mb-5">
              <div className="col-auto">
                <h5>Loading</h5>
              </div>
              <div className="col-auto">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner>
              </div>
            </div>
          )} */}
        {/* </div> */}
        <div className="d-flex justify-content-center">
          {!isLoading && (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="mt-3 w-50 mb-5 "
            >
              {isLogin ? "Login" : "Create Your Account"}
            </Button>
          )}
          {isLoading && (
            <div className="row align-items-center mt-4">
              <div className="col-auto">
                <h5>Loading</h5>
              </div>
              <div className="col-auto">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner>
              </div>
            </div>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link
            style={{
              fontSize: "medium",
              fontWeight: "bold",
            }}
            onClick={switchSignInToLogIn}
          >
            {isLogin
              ? "New Here? Sign up"
              : "If Already have an account? Login"}
          </Link>
        </div>
      </Form>
    </>
  );
};

export default UserEntryIn;
