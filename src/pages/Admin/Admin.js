import React from "react";
import Addproduct from "./add_product";
import AllProduct from "./all_product";
import UpdateProduct from "./update_product"
import Product_Details from "./details"
import Verify from "./docverify";
import Remove_user from "./remove_user";
import Adminlogin from "./adminlogin";
import Removeproduct from "./remove_product";
import Carousel from "./documents";
import MainAdmin from "./mainadmin";
import ProductByNo from "./product_by_no";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../../utils/PrivateRoute";
import allOrders from "./allOrders";
import NavSection from "../../components/organisms/nav-section";
import orderDetails from "./orderDetails";
import chat from "./chat";
import chatUserRoom from "./chatUserRoom";
import anonChatUserRoom from "./anonChatUserRoom";
import Details from "./details";
import Unvarified from "./unvarified";

const Adminpanel = (props) => {
  return (
    <div>
      <NavSection />
  
      <Router>
        <Switch>
          <Route path="/admin" exact component={MainAdmin} />
          <Route path="/admin/login" exact component={Adminlogin} />
          <PrivateRoute path="/admin/additem" exact component={Addproduct} />
          <PrivateRoute path="/admin/verify" exact component={Verify} />
          <PrivateRoute path="/admin/all" exact component={AllProduct } />
          <PrivateRoute path="/admin/update/:id" exact component={UpdateProduct} />
          <PrivateRoute path="/admin/details/:id" exact component={Product_Details} />
          <PrivateRoute path="/admin/allOrders" exact component={allOrders} />
          <PrivateRoute path="/admin/unvarified" exact component={Unvarified} />
          <PrivateRoute
            path="/admin/orderDetails/:id"
            exact
            component={orderDetails}
          />
          <PrivateRoute
            exact
            path="/admin/remove_user"
            component={Remove_user}
          />
          <PrivateRoute
            exact
            path="/admin/remove_product"
            component={Removeproduct}
          />
          <PrivateRoute
            path="/admin/documents/:id"
            exact
            component={Carousel}
          />
          <PrivateRoute
            path="/admin/productbyno"
            exact
            component={ProductByNo}
          />
          <PrivateRoute exact path="/admin/chat" component={chat} />
          <PrivateRoute
            exact
            path="/admin/chat/:id/:name"
            component={chatUserRoom}
          />
          <PrivateRoute
            exact
            path="/admin/anonchat/:phoneNo/:name"
            component={anonChatUserRoom}
          />
        </Switch>
      </Router>
    </div>
  );
};
export default Adminpanel;
