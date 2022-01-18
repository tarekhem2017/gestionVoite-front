import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import {
    Button,
} from "reactstrap";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { getAllCandidats } from "../../services/apis"
import style from "./Syle.css"
let token = "token"
const Vote = (props) => {
    const [listCadidats, setCandidats] = useState([])
    useEffect(() => {
        getCandidats()
    }, [])
    function getCandidats() {
        getAllCandidats()
            .then(data => {
                setCandidats(data.data)
            })
            .catch(err => {
                console.log({ err })
            })
    }
    function onChange(value) {
        console.log("Captcha value:", value);
    }
    return (
        <>
            <div className="content">
                {
                    listCadidats.map((t) => {
                        return (
                            <MDBCard style={{ maxWidth: '22rem', marginRight: "5%", marginTop: "4%" }}>
                                <MDBCardImage src={t.photo} style={{ height: 200 }} position='top' alt='Fissure in Sandstone' />
                                <MDBCardBody>
                                    <MDBCardTitle>{t.nom + " " + t.prenom}</MDBCardTitle>
                                    <MDBCardText>
                                        Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </MDBCardText>
                                    <Button style={{ width: 120, marginBottom: 30 }} onClick={() => alert("")} className="mt-4" color="primary" type="button">
                                        Votée
                                    </Button>
                                </MDBCardBody>
                            </MDBCard>
                        )
                    })
                }
                <ReCAPTCHA
                    sitekey="6Lel6PIdAAAAAJvic9YdCq_eBi80QTEV_w_8KHNP"
                    onChange={onChange}
                />,
            </div>
        </>
    );
};

export default Vote;
