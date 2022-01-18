/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { login } from "../../services/apis"
let token = "token"
const Login = (props) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")
  const [tok, setTok] = useState(null)

  useEffect(()=>{
    getToken()
    if (token != null) {
      props.history.replace(`/admin/Dashboard`)
    }
  })
  async function getToken() {
    try {
      const value = await localStorage.getItem(token);
      if (value !== null) {
        // We have data!
        setTok(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  function LoginAccount() {
    if (password == "") {
      setMsg("Mot de passe est requis!")
      return
    }
    else if (userName == "") {
      setMsg("Nom d'utilsateur est requis!")
      return
    }
    else {
      let user = {
        "usernameOrEmail": userName,
        "password": password
      }
      console.log({ user })
      login(user)
        .then(res => {
          console.log({ res })
          if (res.status == 200) {
            localStorage.setItem(token, res.data.tokenType + " " + res.data.accessToken)
            props.history.replace(`/admin/Dashboard`)
          }
        })
        .catch(err => {
          console.log({ err })
        })
    }
  }
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={(text) => setUserName(text.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(text) => setPassword(text.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <text onClick={() => props.history.replace(`/auth/signup`)} style={{ marginLeft: "50%", textDecorationLine: "underline" }}>Vous n'avez pas un compte?</text>
              <div className="text-center">
                <Button style={{ width: 200, marginBottom: 30 }} onClick={() => LoginAccount()} className="mt-4" color="primary" type="button">
                  Login
                </Button>
              </div>
            </Form>
            {msg != "" && <text style={{ color: "red", paddingTop: 50 }}> {msg}</text>}
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
