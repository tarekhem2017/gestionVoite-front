import OneSignal from 'react-onesignal';
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
import { getCandidatById, getElecteurById, getIdUser, login } from "../../services/apis"
let token = "token"
let user = "user"
let isVoted = "isVoted"
let id = "id"

const URL = 'ws://127.0.0.1:9000';

const Login = (props) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")
  const [tok, setTok] = useState(null)
  const [initialized, setInitialized] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getToken()
  })
  async function getToken() {
    try {
      const value = await localStorage.getItem(token);
      if (value !== null) {
        // We have data!
        props.history.replace(`/admin/Dashboard`)
        setTok(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  function getElecteur(idS) {
    getElecteurById(idS)
      .then(res => {
        let inf=res.data
        localStorage.setItem(id, inf.id)
        localStorage.setItem(isVoted,inf.isVoted)
        props.history.replace(`/admin/Dashboard`)
      })
      .catch(err => {
        console.log({ err })
      })
  }
  function getCandidat(idS) {
    getCandidatById(idS)
      .then(res => {
        let inf=res.data
        localStorage.setItem(id, JSON.stringify(inf.id))
        localStorage.setItem(isVoted, JSON.stringify(inf.isVoted))
        props.history.replace(`/admin/Dashboard`)
      })
      .catch(err => {
        console.log({ err })
      })
  }
  function getId() {
    getIdUser(userName)
      .then(res => {
        localStorage.setItem(user, JSON.stringify(res.data))
        if (res.data.roles[0].name == "CANDIDAT") {
          getCandidat(res.data.id)
        }
        else if (res.data.roles[0].name == "ELECTEUR") {
          getElecteur(res.data.id)
        }
        else {
          props.history.replace(`/admin/Dashboard`)
        }
      })
      .catch(err => {
        console.log({ err })
      })
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
          getId()
          if (res.status == 200) {
            localStorage.setItem(token, res.data.tokenType + " " + res.data.accessToken)
            getId()
          } else {
            setMsg("Email ou mot de passe incorrect")
          }
        })
        .catch(err => {
          setMsg("Email ou mot de passe incorrect")
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
