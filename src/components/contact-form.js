import cn from "classnames";
import React, { useState } from "react";
import useSingUpForm from "../hooks/contact-from-hooks";
import styles from "./contact-form.module.scss";

const ContactForm = ({ data }) => {
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendFailure, setSendFailure] = useState(false);

  const signup = async () => {
    setSending(true);

    // TOOD read the value from environment variable
    const url = `/.netlify/functions/contact`;

    try {
      const result = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: new Headers(),
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(inputs)
      });
      setSendSuccess(true);
    } catch (e) {
      console.log(`failure`);
      setSendFailure(true);
    }

    setSending(false);
  };

  const { inputs, setInputs, handleInputChange, handleSubmit } = useSingUpForm(
    {
      name: "",
      email: "",
      phone: "",
      message: ""
    },
    signup
  );

  const restart = () => {
    setInputs({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
    setSending(false);
    setSendSuccess(false);
    setSendFailure(false);
  };

  return (
    <div className={cn(styles.host)}>
      {data.headerTextNode.childMarkdownRemark.html && (
        <div
          dangerouslySetInnerHTML={{
            __html: data.headerTextNode.childMarkdownRemark.html
          }}
        ></div>
      )}

      {sending && <div className={cn(styles.sending)}>Sending...</div>}
      {sendSuccess && (
        <div className={cn(styles.success)}>
          Thank you. We will be in touch with you soon.
        </div>
      )}
      {sendFailure && (
        <div className={cn(styles.failure)}>
          <span>
            I can't deliver this messages at the moment. Please try again or
            click 
          </span>
          <a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a>
          <span> to contact us.</span>
        </div>
      )}

      {!sending && !sendSuccess && (
        <form className={cn(styles.form)} onSubmit={handleSubmit}>
          <label className={cn(styles.nameLabel)}>
            {data.nameLabel}
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={handleInputChange}
              value={inputs.name}
            />
          </label>
          <label className={cn(styles.emailLabel)}>
            {data.emailLabel}
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={handleInputChange}
              value={inputs.email}
            />
          </label>
          <label className={cn(styles.phoneLabel)}>
            {data.phoneLabel}
            <input
              type="text"
              name="phone"
              id="phone"
              required
              onChange={handleInputChange}
              value={inputs.phone}
            />
          </label>
          <label className={cn(styles.messageLabel)}>
            {data.messageLabel}
            <textarea
              name="message"
              id="message"
              rows="5"
              required
              onChange={handleInputChange}
              value={inputs.message}
            />
          </label>
          <button>Send</button>
        </form>
      )}
      {sendSuccess && <button onClick={restart}>Send again</button>}
    </div>
  );
};

export default ContactForm;
