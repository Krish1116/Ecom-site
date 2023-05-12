// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import Form from "react-bootstrap/Form";
// import { Alert, Button, Spinner } from "react-bootstrap";
// import { useState, useRef, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useProductCart } from "../CartProvider";
// import ResetPassword from "./ResetPassword";

// function Login(props) {
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [error, setError] = useState("");
//   // const { login } = useProductCart();
//   // const navigate = useNavigate();

//   // const submitHandler = async (e) => {
//   //   setError("");
//   //   e.preventDefault();
//   //   try {
//   //     await login(email, password);
//   //     navigate("/");
//   //   } catch (err) {
//   //     setError(err.message);
//   //     console.log(err.message);
//   //   }
//   // };

//   const { loginHandler, openPassword } = useProductCart();

//   const emailInputRef = useRef();
//   const passwordInputRef = useRef();
//   const [response, setResponse] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   const submitHandler = (e) => {
//     e.preventDefault();

//     const enteredEmail = emailInputRef.current.value;
//     const enteredPassword = passwordInputRef.current.value;
//     console.log("Submitting form with data: ", enteredEmail, enteredPassword);
//     setIsLoading(true);
//     // sign up request
//     fetch(
//       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDyUk1qwIsUPo_Y4jdQZfGaLkSpqx7pzA",
//       {
//         method: "POST",
//         body: JSON.stringify({
//           email: enteredEmail,
//           password: enteredPassword,
//           // displayName: enteredName, //for display name
//           returnSecureToken: true,
//         }),
//         headers: { "Content-Type": "application/json" },
//       }
//     )
//       .then((res) => {
//         setIsLoading(false);
//         if (res.ok) {
//           // handle successful response
//           console.log("Login successful!");
//           // localStorage.setItem();
//           navigate("/store");
//           return res.json();
//         } else {
//           console.log("Sign up failed with status code ", res.status);

//           // and if it does fail so the res.json method takes optional parameters which the data that is being sent back in the response and res.json will also returns promise so .then use
//           return res.json().then((data) => {
//             let errormsg = "Authentication Failed!";
//             console.log("Error response: ", data);
//             if (data && data.error && data.error.message) {
//               errormsg = data.error.message;
//             }
//             throw new Error(errormsg);
//           });
//         }
//       })
//       .then((data) => {
//         console.log(data);
//         loginHandler(data.idToken);
//         // setUserName(data.displayName);
//       })
//       .catch((err) => {
//         setResponse(err.message);
//       });
//   };

//   // const submitHandler = (e) => {
//   //   e.preventDefault();

//   //   const enteredEmail = emailInputRef.current.value;
//   //   const enteredPassword = passwordInputRef.current.value;
//   //   console.log("Submitting form with data: ", enteredEmail, enteredPassword);
//   //   setIsLoading(true);
//   //   // sign up request
//   //   fetch(
//   //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDyUk1qwIsUPo_Y4jdQZfGaLkSpqx7pzA",
//   //     {
//   //       method: "POST",
//   //       body: JSON.stringify({
//   //         email: enteredEmail,
//   //         password: enteredPassword,
//   //         returnSecureToken: true,
//   //       }),
//   //       headers: { "Content-Type": "application/json" },
//   //     }
//   //   ).then((res) => {
//   //     setIsLoading(false);
//   //     if (res.ok) {
//   //       // handle successful response
//   //       console.log("Login successful!");
//   //       navigate("/");
//   //       return <res className="json"></res>;
//   //     } else {
//   //       console.log("Sign up failed with status code ", res.status);

//   //       let errormsg = "Authentication Failed!";
//   //       res
//   //         .json()
//   //         .then((data) => {
//   //           console.log(data);
//   //           throw new Error(errormsg);
//   //         })
//   //         .then((data) => {
//   //           console.log(data);
//   //         })
//   //         .catch((err) => {
//   //           setResponse(err.message);
//   //         });
//   //     }

//   // else {
//   //   console.log("Sign up failed with status code ", res.status);

//   //   // and if it does fail so the res.json method takes optinal parameters which the data that is being sent back in the response and res.json will also returns promise so .then use
//   //   res.json().then((data) => {
//   //     let errormsg = "Authentication Failed!"; //question when this mssg will print
//   //     // console.log("Error response: ", data);
//   //     // if (data && data.idToken) {
//   //     //   console.log(data.idToken);
//   //     //   loginHandler(data.idToken);
//   //     // }

//   //     // if (data && data.error && data.error.message) {
//   //     //   errormsg = data.error.message;
//   //     // }

//   //     throw new Error(errormsg)
//   //   })
//   // }.then(data => {
//   //   console.log(data);
//   // }).catch(err => {setResponse(errormsg)})
//   //   });
//   // };

//   return (
//     <>
//       <div
//         className="music-title-container"
//         style={{ position: "absolute", top: "133px", right: "35%" }}
//       >
//         <span className="text-center fs-2">Login to Generics Dashboard</span>
//       </div>

//       {response && <Alert variant="danger">{response}</Alert>}
//       <Form
//         className="box pt-5"
//         onSubmit={submitHandler}
//         style={{ position: "relative", margin: "99px" }}
//       >
//         <FloatingLabel
//           controlId="floatingInput"
//           label="Email address (required)"
//           className="mb-3 w-50 mx-auto"
//         >
//           <Form.Control
//             type="email"
//             placeholder="name@example.com"
//             className="lbl"
//             // onChange={(e) => setEmail(e.target.value)}
//             ref={emailInputRef}
//           />
//         </FloatingLabel>
//         <FloatingLabel
//           controlId="floatingPassword"
//           label="Password (required)"
//           className="w-50 mx-auto"
//         >
//           <Form.Control
//             type="password"
//             placeholder="password"
//             className="lbl"
//             // onChange={(e) => setPassword(e.target.value)}
//             ref={passwordInputRef}
//           />
//         </FloatingLabel>
//         <div className="d-flex justify-content-center">
//           {!isLoading && (
//             <Button
//               type="submit"
//               variant="primary"
//               size="lg"
//               className="mt-5 w-50 mb-5"
//               // disabled={submitButtonDisable}
//             >
//               Log In
//             </Button>
//           )}
//           {isLoading && (
//             <div className="row align-items-center mt-4">
//               <div className="col-auto">
//                 <h5>Loading</h5>
//               </div>
//               <div className="col-auto">
//                 <Spinner animation="border" role="status">
//                   <span className="visually-hidden"></span>
//                 </Spinner>
//               </div>
//             </div>
//           )}
//         </div>
//         <div>
//           <p
//             style={{
//               position: "absolute",
//               top: "18rem",
//               right: "44%",
//               fontSize: "medium",
//               fontWeight: "bold",
//             }}
//           >
//             New Here? <Link to="/signup">Sign up</Link>
//           </p>
//         </div>
//         <div>
//           <p
//             style={{
//               position: "absolute",
//               top: "11rem",
//               right: "26%",
//               fontSize: "medium",
//               fontWeight: "bold",
//             }}
//           >
//             <Link to="/signup" onClick={openPassword}>
//               Forgot Password?
//             </Link>
//           </p>
//         </div>
//       </Form>
//     </>
//   );
// }

// export { Login };
