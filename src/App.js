import React from "react";
import Home from "./pages/Home";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import Dashboard from "./pages/Dashboard";
import SubCategory from "./pages/subcategory";
import Ownerprofile from "./pages/Ownerprofile";
import Businessprofile from "./pages/BusinessProfile";
import { Provider } from "react-redux";
import store from "./store";
import ProductPage from "./pages/ProductPage";
import NewProductPage from "./pages/NewProductPage";
import OtpLogin from "./pages/otpLogin";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import sellerCentral from "./pages/sellerCentral";
import cart from "./pages/cart";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import firstLogin from "./pages/Setup";
import sellproduct from "./components/organisms/sellproduct/index";
import userproduct from "./components/organisms/userproduct/index";
import PrivateRoute from "./utils/PrivateRoute";
import PrivateVerify from "./utils/PrivateVerify";
import EditModal from "./components/molecules/editProduct/index";
import Admin from "./pages/Admin/Admin";
import OrderAddress from "./pages/OrderAddress";
import billingAddress from "./pages/billingAddress";
import PaymentDetails from "./pages/paymentDetails";
import orderPlaced from "./pages/orderPlaced";
import orderReceived from "./pages/orderReceived";
import buyerOrders from "./pages/buyerOrders";
import orderTracker from "./pages/orderTracker";
import uploadDocs from "./pages/uploadDocs";
import verifyOldNumber from "./pages/verifyOldNumber";
import verifyOtp from "./pages/verifyOtp";
import addNewNumber from "./pages/addNewNumber";
import verifyNextNumberOtp from "./pages/verifyNextNumberOtp";
import Notification from "./pages/Notification";
import chat from "./pages/chat";
import cancelOrder from "./pages/cancelOrder";
import Support from "./pages/Support";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path={"/admin"}>
              <Admin />
            </Route>
            <Route path={"/login"}>
              <Login />
            </Route>
            <Route
              exact
              path="/category/:name"
              component={CategoryPage}
            ></Route>
            <Route
              exact
              path="/product/test"
              component={NewProductPage}
            ></Route>
            <Route path="/product/:id" component={NewProductPage}></Route>
            <Route path={"/otp"}>
              <OtpLogin />
            </Route>
            <Route path={"/support"}>
              <Support />
            </Route>
            <PrivateVerify
              exact
              path="/dashboard/sellercentral/updateproduct/:id"
              component={EditModal}
            />
            <PrivateVerify
              exact
              path="/dashboard/sellercentral/sellproduct"
              component={sellproduct}
            />
            <PrivateVerify
              exact
              path="/dashboard/sellercentral/userproduct"
              component={userproduct}
            />
            <PrivateVerify
              exact
              path="/dashboard/sellercentral"
              component={sellerCentral}
            />
            <PrivateRoute
              exact
              path="/dashboard/yourOrders"
              component={buyerOrders}
            />
            <PrivateRoute
              exact
              path="/dashboard/profile/uploaddocs"
              component={uploadDocs}
            />
            <PrivateRoute
              exact
              path="/dashboard/ownerprofile"
              component={Ownerprofile}
            />
            <PrivateRoute
              // exact
              path="/dashboard/businessprofile"
              component={Businessprofile}
            />
            <PrivateRoute
              exact
              path="/cancelOrder/:id"
              component={cancelOrder}
            />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/orderAddress" component={OrderAddress} />
            <PrivateVerify
              exact
              path="/notifications"
              component={Notification}
            />
            <PrivateRoute
              exact
              path="/billingAddress"
              component={billingAddress}
            />
            <PrivateRoute
              exact
              path="/paymentDetails"
              component={PaymentDetails}
            />
            <PrivateRoute
              exact
              path="/orderReceived"
              component={orderReceived}
            />
            <PrivateVerify exact path="/chat" component={chat} />
            <PrivateRoute exact path="/orderPlaced" component={orderPlaced} />
            <PrivateRoute
              exact
              path="/trackOrder/:id"
              component={orderTracker}
            />
            <PrivateRoute exact path="/setup" component={firstLogin} />
            <Route exact path="/subcat/:id" component={SubCategory} />

            <PrivateRoute exact path="/cart" component={cart} />
            <PrivateRoute
              exact
              path="/verifyNumber"
              component={verifyOldNumber}
            />
            <PrivateRoute exact path="/verifyotp" component={verifyOtp} />
            <PrivateRoute exact path="/addNewNumber" component={addNewNumber} />
            <PrivateRoute
              exact
              path="/verifyNextNumber"
              component={verifyNextNumberOtp}
            />
            <Route path={"/"}>
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
