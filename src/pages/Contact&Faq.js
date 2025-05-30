import React, { useEffect, useState } from "react";
import OnboardHeader from "../components/OnboardHeader";
import CustomButton from "../components/custom/CustomButton";
import Logo from "../assets/icons/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { createContact, getAllFaq } from "../store/slices/contactAndFaqSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function ContactFaq() {
  const [activeTab, setActiveTab] = useState("contact");
  const dispatch = useDispatch();
  const { allFaqs,contactLoading, loading } = useSelector((state) => state.contactAndFaq);
  const lang = localStorage.getItem("language") || "eng";


  // Get active tab from localStorage if exists
  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    const validTabs = ["contact", "faq"];
    const initialTab = validTabs.includes(storedTab) ? storedTab : "contact";
    if (initialTab) {
      setActiveTab(initialTab);
    }
    dispatch(getAllFaq());
  }, [dispatch]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Name should be at least 3 characters long"),
    phone: Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/, "Invalid phone number"),
    feedback: Yup.string().required("Feedback is required").min(10, "Feedback should be at least 10 characters long"),
  })

  // Function to handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab); 
  };

  const handleSubmit = (values) => {
    dispatch(createContact(values));
  }

  return (
    <>
      <div style={{ marginTop: 10 }}>
        <OnboardHeader />
      </div>

      <div style={{ backgroundColor: "#E0E0E0", width: "100vw", height: "3px", padding: "0", boxSizing: "border-box",
          marginTop: 10, }} />
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", }} >
          <img src={Logo} alt="logo" />
          <div style={{ display: "flex", flexDirection: "column", marginTop: "10px"}} >
            <span style={{ color: "#000000", fontSize: 20, fontWeight: "600" }}> TAGIS </span>
            <span style={{ color: "#2D008C", fontSize: 16, fontWeight: "bold" }}>  {lang == "eng" ? "Tap Connect Experience" : "Ei sovellusta, napauta vain!"} </span>
          </div>
        </div>

      <div style={{ margin: 20 }}>
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => handleTabChange("contact")}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              backgroundColor: activeTab == "contact" ? "#E7DCFF" : "white",
              color: activeTab == "contact" ? "#2D008C" : "#000000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
              fontWeight: "600",
            }} >
            {lang == "eng" ? "CONTACT US" : "OTA YHTEYTTÄ"}
          </button>
          <button onClick={() => handleTabChange("faq")}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              backgroundColor: activeTab == "faq" ? "#E7DCFF" : "white",
              color: activeTab == "faq" ? "#2D008C" : "#000000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "600",
            }} >
            {lang == "eng" ? "FAQs" :"UKK"}
          </button>
        </div>

        {/* Display Content Based on Active Tab */}
        <div style={{ marginLeft: 10 }}>
          {activeTab == "contact" ? (
            <div>
              <h5 style={{ color: "black", fontWeight: "bold" }}>{lang == "eng" ? "CONTACT US" : "Ota Yhteyttä"}</h5>
              <p style={{ color: "#000000", fontWeight: "500", fontSize: 18 }}>
                {lang == "eng" ? "We're here to help! If you have any questions, feedback,or inquiries about our services, please feel free to reachout to us." : "Olemme täällä auttamassa! Jos sinulla on kysyttävää, palautetta tai tiedusteluja palveluistamme, ota rohkeasti meihin yhteyttä."}
              </p>

              <Formik initialValues={{ name: "", phone: "", feedback: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form style={{ display: "flex", flexDirection: "column", gap: "15px", }} >
                   {/* For Name */}
                  <Field type="text" name="name" placeholder={lang == "eng" ? "Name" : "Nimi"}
                    style={{ margin: 10, padding: "10px 0", fontSize: "14px", border: "none",
                      borderBottom: "2px solid #ddd", outline: "none", }} />
                  <ErrorMessage name="name" component="p"
                    style={{ color: "red", width: "80%", marginLeft: "10px", fontWeight: "500", marginTop: -10,}} />

                  {/* For Phone */}
                  <Field type="tel" name="phone" placeholder={lang == "eng" ? "Phone" : "Puhelinnumero"}
                    style={{
                      margin: 10, padding: "10px 0", fontSize: "14px", border: "none", borderBottom: "2px solid #ddd",
                      outline: "none", }} />
                  <ErrorMessage name="phone" component="p"
                    style={{ color: "red", marginLeft: "10px", fontWeight: "500", marginTop: -10, }} />
                  
                   {/* For Feedback */}
                  <Field as="textarea" name="feedback" placeholder={lang == "eng" ? "Leave a Feedback" : "Jätä palautetta"} rows="4"
                    style={{ margin: 10, padding: "10px", fontSize: "14px", border: "2px solid #ddd", }} />
                  <ErrorMessage name="feedback" component="p"
                    style={{ color: "red", marginLeft: "15px", fontWeight: "500", marginTop: -10, }} />
                  <CustomButton text={contactLoading ? lang == "eng" ? "Loading..." : "Ladataan...": lang == "eng" ? "Submit" : "Lähetä"} type="submit" fullWidth={"40%"} />
                </Form>
              </Formik>
            </div>
          ) : (
            // For Faqs
            <div>
              <h5 style={{ fontWeight: "bold", color: "#000000" }}>
                {lang == "eng" ? "Frequently Asked Questions (FAQ)" : "Usein Kysytyt Kysymykset"}
              </h5>
              {loading ? (
                <p>{lang == "eng" ? "Loading..." : "Ladataan..."}</p>
              ) : allFaqs?.length == 0 ? (
                <p>{lang == "eng" ? "No FAQs found" : "Ei löytynyt usein kysyttyjä kysymyksiä"}</p>
              ) : (
                <div>
                  {allFaqs?.map((faq, index) => (
                    <div key={index}>
                      <p style={{ fontWeight: "600", color: "#000000" }}>
                        {faq.faq_que}
                      </p>
                      <p style={{ color: "#000000", marginTop: -5 }}>
                        {faq.faq_ans}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ContactFaq;
