import { useState } from "react";
import { Checkbox } from 'semantic-ui-react'
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
import { SingnupElecteur, SignupCandidat } from "../../services/apis"
const Register = (props) => {
  const [email, setEmail] = useState("")
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [cin, setCin] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")
  const [candidat, setCandidat] = useState(false)
  const [electeur, setElecteur] = useState(false)

  function Signup() {
    if (userName == "" || email == "" || password == "" || nom == "" || prenom == "" || cin == "" || photoUrl == "") {
      setMsg("Veuillez remplir les champs obligatoires")
      return;
    }
    else if (cin.length != "") {
      setMsg("Cin doit étre compose de 8 chiffre")
      return;
    }
    else {
      let user = {
        "username": userName,
        "email": email,
        "password": password,
        "nom": nom,
        "prenom": prenom,
        "cin": cin,
        "picture": photoUrl
      }
      console.log({ email })
      SignupCandidat(user)
        .then(data => {
          if (data.data == "Cin is already taken!") {
            setMsg("Le cin est deja insrit!")
          } else if (data == "Username is already taken!") {
            setMsg("Nom utilisateur est deja insrit!")
          } else if (data == "Email is already taken!") {
            setMsg("Email est deja insrit!")
          }
          else {
            props.history.replace(`/auth/login`)
          }
        })
        .catch(err => {
          console.log({ err })
        })
    }

  }
  function SignupElect() {
    if (userName == "" || email == "" || password == "" || nom == "" || prenom == "" || cin == "") {
      setMsg("Veuillez remplir les champs obligatoires")
      return;
    }
    else if (cin.length != 8) {
      setMsg("Cin doit être de 8 caractères ")
      return;
    }

    else {
      let user = {
        "username": userName,
        "email": email,
        "password": password,
        "nom": nom,
        "prenom": prenom,
        "cin": cin
      }
      console.log({ email })
      SingnupElecteur(user)
        .then(data => {
          if (data.data == "Cin is already taken!") {
            setMsg("Le cin est deja insrit!")
          } else if (data == "Username is already taken!") {
            setMsg("Nom utilisateur est deja insrit!")
          } else if (data == "Email is already taken!") {
            setMsg("Email est deja insrit!")
          }
          else {
            props.history.replace(`/auth/login`)
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
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    autoComplete="new-email"
                    onChange={(text) => {
                      setMsg("")
                      setUserName(text.target.value)
                    }}
                  />
                </InputGroup>
              </FormGroup>
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
                    onChange={(text) => {
                      setMsg("")
                      setEmail(text.target.value)
                    }}
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
                    onChange={(text) => {
                      setMsg("")
                      setPassword(text.target.value)
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Nom"
                    autoComplete="new-email"
                    onChange={(text) => {
                      setMsg("")
                      setNom(text.target.value)
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Prenom"
                    autoComplete="new-email"
                    onChange={(text) => {
                      setMsg("")
                      setPrenom(text.target.value)
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-align-center" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Cin"
                    autoComplete="new-email"
                    onChange={(text) => {
                      setMsg("")
                      setCin(text.target.value)
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-image" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Photo url"
                    autoComplete="new-email"
                    onChange={(text) => {
                      setMsg("")
                      setPhotoUrl(text.target.value)
                    }}
                  />
                </InputGroup>
                <div style={{ display: "flex", width: "40%", justifyContent: "space-between" }}>
                  <Checkbox onChange={() => {
                    setElecteur(false)
                    setCandidat(!candidat)
                  }} checked={candidat} label={<label>Candidat</label>} />
                  <Checkbox onChange={() => {
                    setCandidat(false)
                    setElecteur(!electeur)
                  }} checked={electeur} label={<label>Electeur</label>} />
                </div>
              </FormGroup>
              {msg != "" && <text style={{ color: "red", paddingTop: 50 }}> {msg}</text>}
              <div className="text-center">
                <Button style={{ width: 200, marginBottom: 30 }} onClick={() => electeur == false && candidat == false ? setMsg("Voulez vous choisir le type de compte") : electeur ? SignupElect() : Signup()} className="mt-4" color="primary" type="button">
                  Register
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
