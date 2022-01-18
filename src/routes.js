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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Electeurs from "views/examples/Electeurs.js";
import Candidats from "views/examples/Candidats.js";
import Vote from "views/examples/Vote.js";

var routes = [
  {
    path: "/Login",
    name: "Login",
    icon: "ni ni-tv-2 text-primary",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/Vote",
    name: "Vote",
    icon: "ni ni-tv-2 text-primary",
    component: Vote,
    layout: "/add",
  },
  {
    path: "/Signup",
    name: "Sgnup",
    icon: "ni ni-tv-2 text-primary",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/Candidats",
    name: "Liste candidats",
    icon: "ni ni-bullet-list-67 text-red",
    component: Candidats,
    layout: "/admin",
  },
  {
    path: "/Electeurs",
    name: "Liste électeurs",
    icon: "ni ni-bullet-list-67 text-red",
    component: Electeurs,
    layout: "/admin",
  },
 
];
export default routes;
