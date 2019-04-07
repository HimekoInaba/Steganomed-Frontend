import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Upload from "../pages/Upload";
import Decode from "../pages/Decode";

const routes = [
  {
    path: "/login",
    component: Login,
    meta: {
      public: true, // Allow access to even if not logged in
      onlyWhenLoggedOut: true
    }
  },
  {
    path: "/register",
    component: Register,
    meta: {
      public: true, // Allow access to even if not logged in
      onlyWhenLoggedOut: true
    }
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/user",
    children: [
      /*{
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },*/
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Documents List",
        component: TableList
      },
      {
        path: "upload",
        name: "Upload",
        component: Upload
      },
      {
        path: "decode",
        name: "Deocde",
        component: Decode
      }
    ]
  }
];

export default routes;
