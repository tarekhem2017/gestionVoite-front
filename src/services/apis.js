import axios from 'axios';
const url = "https://apisgestionvote.herokuapp.com";
let token = "token"

export const login = async (user) => {
    return await axios.post(url + '/api/auth/signin', user)
};
export const SignupCandidat = async (user) => {
    return await axios.post(url + '/api/auth/SingnupCandidat', user)
};
export const getIdUser = async (user) => {
    return await axios.get(url + '/api/auth/GetUserId/'+user)
};
export const getCandidatById = async (user) => {
    return await axios.get(url + '/apis/CandidatByUserId/'+user)
};
export const getElecteurById = async (user) => {
    return await axios.get(url + '/apis/ElecteurByUserId/'+user)
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
export const voteEleceteur = async (id) => {
    const tok = await localStorage.getItem(token);
    console.log({tok})
    return await axios.put(url + '/apis/Vote/'+id , { headers: { Authorization: tok } })
};
export const voteCandidat = async (id) => {
    const tok = await localStorage.getItem(token);
    console.log({tok})
    return await axios.put(url + '/apis/VoteCandidat/'+id, { headers: { Authorization: tok } })
};
export const getStatistique = async () => {
    const tok = await localStorage.getItem(token);
    return await axios.get(url + '/apis/Statistique', { headers: { Authorization: tok } })
};





