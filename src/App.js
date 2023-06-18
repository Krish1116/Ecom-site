import React, { Suspense } from "react";
import { Container } from "react-bootstrap";
import Footer from "./component/Footer/Footer";
import Navbar from "./component/navbar/Navbar";
// import Home from "./component/Pages/Home";
// import { About } from "./component/Pages/About";
// import { Store } from "./component/Pages/Store";
// import { NotFund } from "./component/Pages/NotFund";
// import { ContactUs } from "./component/Pages/ContactUs";
// import { StoreInfo } from "./component/Pages/StoreInfo";
// import UserEntryIn from "./component/Authentication/UserEntryIn";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./component/CartProvider";

const Home = React.lazy(() => import("./component/Pages/Home"));
const About = React.lazy(() => import("./component/Pages/About"));
const Store = React.lazy(() => import("./component/Pages/Store"));
const ContactUs = React.lazy(() => import("./component/Pages/ContactUs"));
const StoreInfo = React.lazy(() => import("./component/Pages/StoreInfo"));
const NotFund = React.lazy(() => import("./component/Pages/NotFund"));
const UserEntryIn = React.lazy(() =>
  import("./component/Authentication/UserEntryIn")
);

function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            {/* <Route path="/" element={<UserEntryIn />} /> */}
            <Route
              path="/"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <UserEntryIn />
                </Suspense>
              }
            />
            {/* <Route path="/home" element={<Home />} match="exact" /> */}
            <Route
              path="/home"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <Home />
                </Suspense>
              }
            />

            {/* <Route path="/about" element={<About />} /> */}
            <Route
              path="/about"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <About />
                </Suspense>
              }
            />
            {/* <Route path="/store" element={<Store />} match="exact" /> */}
            <Route
              path="/store"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <Store />
                </Suspense>
              }
            />
            {/* <Route path="/contactus" element={<ContactUs />} /> */}
            <Route
              path="/contactus"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <ContactUs />
                </Suspense>
              }
            />
            {/* /:store_id is anything it would be changable */}
            {/* <Route path="/store/:store_id" element={<StoreInfo />} /> */}
            <Route
              path="/store/:store_id"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <StoreInfo />
                </Suspense>
              }
            />

            {/* <Route path="*" element={<NotFund />} /> */}
            <Route
              path="*"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <NotFund />
                </Suspense>
              }
            />
          </Routes>
        </Container>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
