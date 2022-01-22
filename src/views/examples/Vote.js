import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import {
    Button,
} from "reactstrap";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { getAllCandidats, voteCandidat, voteEleceteur } from "../../services/apis"
import style from "./Syle.css"
let info = "user"
const URL = 'ws://127.0.0.1:9000';
let isVoted = "isVoted"

const Vote = (props) => {
    const [listCadidats, setCandidats] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [userInfo,setUser]=useState(null)
    const [ws, setWs] = useState(new WebSocket(URL));
    useEffect(() => {
        let usr = localStorage.getItem(info)
        setUser(JSON.parse(usr))
        getCandidats()
    }, [])
    console.log({userInfo})
    function getCandidats() {
        getAllCandidats()
            .then(data => {
                setCandidats(data.data)
            })
            .catch(err => {
                console.log({ err })
            })
    }
    function onChange() {
        setDisabled(!disabled)
    }
    function electeurVote() {
        voteEleceteur(userInfo.id)
            .then(res => {
                console.log({ res })
                localStorage.setItem(isVoted, 1)
                props.history.replace(`/admin/Dashboard`)
            })
            .catch(err => {
                console.log({ err })
            })
    }
    
    function candidatVote() {
        voteCandidat(userInfo.id)
            .then(res => {
                console.log({ res })
                localStorage.setItem(isVoted, 1)
                props.history.replace(`/admin/Dashboard`)
            })
            .catch(err => {
                console.log({ err })
            })
    }
    function vote(){
        if(userInfo.roles[0].name=="CANDIDAT"){
            candidatVote()
        }else if(userInfo.roles[0].name=="ELECTEUR"){
            electeurVote()
        }
    }
    return (
        <>
            <div className="content">
                {
                    listCadidats.map((t) => {
                        return (
                            <MDBCard style={{ maxWidth: '22rem', marginRight: "5%", marginTop: "4%", paddingBottom: "%" }}>
                                <MDBCardImage src={t.photo} style={{ height: 200 }} position='top' alt='Fissure in Sandstone' />
                                <MDBCardBody style={{ paddingBottom: 50 }}>
                                    <MDBCardTitle>{t.nom + " " + t.prenom}</MDBCardTitle>
                                    <MDBCardText>
                                        {t.description}
                                    </MDBCardText>
                                    <Button disabled={disabled} style={{ width: 120, position: "absolute", bottom: 10 }} onClick={() => vote()} className="mt-4" color="primary" type="button">
                                        Votée
                                    </Button>
                                </MDBCardBody>
                            </MDBCard>
                        )
                    })
                }
                <div style={{ marginTop: "4%", marginLeft: "35%" }}>
                    <ReCAPTCHA
                        sitekey="6LfNviweAAAAAKqhjuAa0BKbQqNSAQaWiilODTb3"
                        onChange={onChange}
                    />,
                </div>

            </div>
        </>
    );
};

export default Vote;
