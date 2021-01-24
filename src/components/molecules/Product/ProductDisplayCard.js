import img from "../../../assets/images/new-logo.png";
import React from "react";
import "./custom.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./productDisplaycard.css";
import store from "../../../store";

export const ProductDisplayCard = (props) => {
  const isDocVerified = store.getState().auth.user.isDocVerified;
  const { item } = props;
  return (
    <div>
      <Link to={`/product/${item._id}`}>
        <Card>
          <div style={{ width: "300px", height: "230px" }}>
            <CardImg
              top
              style={{ maxWidth: "300px", maxHeight: "100%" }}
              src={item.images[0].image || img}
              alt="Card image cap"
              className="my-card-img-productpage"
            />
          </div>
          <CardBody>
            <CardTitle>{item.product_name}</CardTitle>
            <CardSubtitle>
              {isDocVerified ? item.price : "Please Verify to unlock price"}
            </CardSubtitle>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};
