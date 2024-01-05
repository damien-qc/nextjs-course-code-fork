import { useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [submitted, setSubmitted] = useState(false);
  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
    const reqBody = { email: enteredEmail };
    // optional: validate input
    // send valid data to API
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setSubmitted(true));
    console.log(submitted);
  }

  if (submitted) {
    return (
      <section className={classes.newsletter}>
        <p>Already Joined!</p>
      </section>
    );
  } else {
    return (
      <section className={classes.newsletter}>
        <h2>Sign up to stay updated!</h2>
        <form onSubmit={registrationHandler}>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              aria-label="Your email"
              ref={emailInputRef}
            />
            <button>Register</button>
          </div>
        </form>
      </section>
    );
  }
}

export default NewsletterRegistration;
