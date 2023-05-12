import { Container } from "react-bootstrap";
import { Home } from "./component/Pages/Home";
import { Footer } from "./component/Footer/Footer";
import { Navbar } from "./component/navbar/Navbar";
// import { Login } from "./component/Authentication/Login";
import { About } from "./component/Pages/About";
import { Store } from "./component/Pages/Store";
import { NotFund } from "./component/Pages/NotFund";
import { ContactUs } from "./component/Pages/ContactUs";
import { StoreInfo } from "./component/Pages/StoreInfo";
import { Routes, Route } from "react-router-dom";
import UserEntryIn from "./component/Authentication/UserEntryIn";
import { CartProvider } from "./component/CartProvider";
// import SignUp from "./component/Authentication/SignUp";

function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/home" element={<Home />} match="exact" />
            <Route path="/store" element={<Store />} match="exact" />
            {/* /:store_id is anything it would be changable */}
            <Route path="/store/:store_id" element={<StoreInfo />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<UserEntryIn />} />
            <Route path="*" element={<NotFund />} />
          </Routes>
        </Container>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
