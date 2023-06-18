import React from "react";
import ContactUsInfo from "../contactus/ContactUsInfo";

const ContactUs = () => {
  async function addInfoHandler(info) {
    try {
      const res = await fetch(
        "https://ecommerce-site-57dcb-default-rtdb.firebaseio.com/info.json",
        {
          method: "POST",
          body: JSON.stringify(info),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        throw new Error("Error: " + res.status);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <ContactUsInfo key={new Date().getTime()} onAddInfo={addInfoHandler} />
    </div>
  );
};

export default ContactUs;
