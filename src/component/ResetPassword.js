import { useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useProductCart } from "./CartProvider";
import { useNavigate } from "react-router-dom";

const ResetPassword = ({ isPassword }) => {
  const { closePassword, token } = useProductCart();

  const newPassInputRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    const enteredNewPass = newPassInputRef.current.value;
    if (!enteredNewPass) {
      console.log("Please enter a new password");
      return;
    }
    if (!token) {
      console.log("No token found");
      return;
    }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCDyUk1qwIsUPo_Y4jdQZfGaLkSpqx7pzA",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPass,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      // .then((res) => {
      //   // assumption: always succedds!
      //   if (!res.ok) {
      //     throw new Error("Failed to update password");
      //   }
      //   console.log("Password updated successfully");
      //   navigate("/");
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update password");
        }
        console.log("Password updated successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* <Modal show={show} onHide={handleClose} animation={false}> */}
      <Modal animation={false} show={isPassword} onHide={closePassword}>
        <Modal.Header closeButton>
          <Modal.Title>Forget Password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>you can change your password here!</p>
        </Modal.Body>
        <FloatingLabel
          controlId="floatingInput"
          label="Enter New Password"
          className="mb-3 w-50 mx-auto"
        >
          <Form.Control
            type="password"
            placeholder="password"
            ref={newPassInputRef}
            minLength="7"
          />
        </FloatingLabel>

        <Modal.Footer>
          <Button variant="primary" onClick={submitHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResetPassword;
