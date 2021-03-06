/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Java Florist (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Java Florist

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Category from "@material-ui/icons/Category";
import Person from "@material-ui/icons/Person";
import MessageICon from "@material-ui/icons/Message";
import Comment from "@material-ui/icons/Comment";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Icons from "views/Icons/Icons.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import Customer from "./views/AdminPage/Customer/Customer.component"
import Order from "./views/AdminPage/Order/Order.component"
import Message from "./views/AdminPage/Message/Message.component"
import Feedback from "./views/AdminPage/Feedback/Feedback.component"
import ProductTableList from "views/AdminPage/Product/ProductTableList";
import CategoryTableList from "views/AdminPage/Category/CategoryTableList";
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/listUser",
    name: "List User",
    icon: Person,
    component: Customer,
    layout: "/admin"
  },
  {
    path: "/message",
    name: "Message",
    icon: MessageICon,
    component: Message,
    layout: "/admin"
  },
  {
    path: "/feedback",
    name: "Feedback",
    icon: Comment,
    component: Feedback,
    layout: "/admin"
  },
  {
    path: "/product",
    name: "Product",
    icon: "content_paste",
    component: ProductTableList,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Category",
    icon: Category,
    component: CategoryTableList,
    layout: "/admin"
  },
  {
    path: "/order",
    name: "Orders",
    icon: "shopping_basket",
    component: Order,
    layout: "/admin"
  },
];

export default dashboardRoutes;
