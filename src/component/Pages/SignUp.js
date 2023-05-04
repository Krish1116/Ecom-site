import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./SignUp.css";
import { Alert, Button, Spinner } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { MDBBtn, MDBSpinner } from "react-bootstrap/Button";

function SignUp(props) {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(
      "Submitting form with data: ",
      enteredName,
      enteredEmail,
      enteredPassword
    );
    setIsLoading(true);
    // sign up request
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDyUk1qwIsUPo_Y4jdQZfGaLkSpqx7pzA",
      {
        method: "POST",
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        // handle successful response
        console.log("Sign up successful!");
        navigate("/login");
      } else {
        console.log("Sign up failed with status code ", res.status);

        // and if it does fail so the res.json method takes optinal parameters which the data that is being sent back in the response and res.json will also returns promise so .then use
        res.json().then((data) => {
          let errormsg = "Authentication Failed!"; //question when this mssg will print
          // console.log("Error response: ", data);
          if (data && data.error && data.error.message) {
            errormsg = data.error.message;
          }
          setResponse(errormsg);
        });
      }
    });
  };

  return (
    <>
      <div
        className="music-title-container"
        style={{ position: "absolute", top: "100px", right: "33%" }}
      >
        <span className="text-center fs-1">Create Your Free Account </span>
      </div>
      {response && <Alert variant="danger">{response}</Alert>}

      <Form
        className="box"
        onSubmit={submitHandler}
        style={{ position: "relative", margin: "102px" }}
      >
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
        <div className="d-flex justify-content-center">
          {!isLoading && (
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
            <Spinner animation="border" role="status" className="mx-auto my-4">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
        <div>
          <p
            style={{
              position: "absolute",
              top: "20rem",
              right: "40%",
              fontSize: "medium",
              fontWeight: "bold",
            }}
          >
            If Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </Form>
    </>
  );
}

export default SignUp;
