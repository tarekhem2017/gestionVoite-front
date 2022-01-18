import axios from 'axios';
const url = "http://localhost:8081";
let token = "token"

export const login = async (user) => {
    return await axios.post(url + '/api/auth/signin', user)
};
export const SignupCandidat = async (user) => {
    return await axios.post(url + '/api/auth/SingnupCandidat', user)
};
export const SingnupElecteur = async (user) => {
    return await axios.post(url + '/api/auth/SingnupElecteur', user)
};
export const getAllElecteurs = async () => {
    const tok = await localStorage.getItem(token);
    return await axios.get(url + '/apis/Electeurs', { headers: { Authorization: tok } })
};
export const getAllCandidats = async () => {
    const tok = await localStorage.getItem(token);
    return await axios.get(url + '/apis/Candidats', { headers: { Authorization: tok } })
};





