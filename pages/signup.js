import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/firebase";
import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { Form } from "../components";
import * as ROUTES from "../constants/routes"

export default function SignIn() {
  const history = useHistory();
  // Consuming the FirebaseContext from the main route index.js
  const { firebase } = useContext(FirebaseContext);
  // We are expecting a string value. Therefore initial value "".
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // || === OR. If password, or email adress is empty, it sets our "isInvalid" value to true.
  const isInvalid = password === "" || emailAddress === "";

  const handleSignIn = (event) => {
    event.preventDefault();

    return firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        // Push to the browse page
        history.push(ROUTES.BROWSE);
      })
      // If the error occur, set email and password to an empty string, show the error message.
      .catch((error) => {
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  };

  return (
  <>
    <HeaderContainer>
      <Form>
        <Form.Title>Sign In</Form.Title>
        {/* If an error occurs render a Form.Error component, pass the error into it */}
        {error && <Form.Error>{error}</Form.Error>}

        <Form.Base onSubmit={handleSignIn} method="POST">
          <Form.Input 
            placeholder="Email address"
            value={emailAddress}
            onChange={({ target }) => setEmailAddress(target.value)}>
          </Form.Input>
          <Form.Input 
            type="password"
            value={password}
            placeholder="Password"
            autoComplete="off"
            onChange={({ target }) => setPassword(target.value)}>
          </Form.Input>
          <Form.Submit disabled={isInvalid} type="submit">
            Sign In
          </Form.Submit>
        </Form.Base>
        <Form.Text>
            New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
        </Form.Text>
        <Form.TextSmall>
          This page is protected by Google reCAPTCHA to insure you are not a robot. Learn more.
        </Form.TextSmall>
      </Form>
    </HeaderContainer>
    <FooterContainer />
  </>
  )
}
