import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./ContactUsInfo.css";
import { Button } from "react-bootstrap";
import { useState } from "react";

function ContactUsInfo(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhono] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      name: name,
      mail: email,
      ph_no: phno,
    };

    // console.log(obj);
    props.onAddInfo(obj);
    setName("");
    setEmail("");
    setPhono("");
    e.target.reset();
  };

  return (
    <>
      <div className="text-white title">
        <h1 className="text-center">The Generics</h1>
      </div>
      <div className="music-title-container">
        <span className="text-cente">Contact Us</span>
      </div>

      <Form className="box" onSubmit={submitHandler}>
        <FloatingLabel
          controlId="floatingPassword"
          label="Name"
          className="mb-3 w-50 mx-auto"
        >
          <Form.Control
            type="text"
            placeholder="Name"
            className="lbl"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3 w-50 mx-auto"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            className="lbl"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Phone Number"
          className="w-50 mx-auto"
        >
          <Form.Control
            type="number"
            placeholder="Phone Number"
            className="lbl"
            onChange={(e) => {
              setPhono(e.target.value);
            }}
          />
        </FloatingLabel>
        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-3 w-50 mb-5"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}

export default ContactUsInfo;
