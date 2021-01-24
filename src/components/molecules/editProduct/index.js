import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import NavSection from "../../organisms/nav-section/index";
import "./index.css";
import { AiOutlineClose } from "react-icons/ai";
import Axios from "axios";
import { FormText, Input } from "reactstrap";
import C from "../../../resource/values";
class Editmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_name: "",
      price: 0,
      qty: 0,
      images: [],
      gst: 0,
      discount: 0,
      product_desc: "",
      category: [],
      subcategory: [],
      total_price: 0,
      anychange: false,
      cats: [],
      sub_cat: [],
    };
  }

  componentDidMount = async () => {
    let p = await axios.get(
      C.SERVER_CALL + `/products/${this.props.match.params.id}`
    );
    this.setState({
      product_name: p.data.product_name,
      price: p.data.price,
      qty: p.data.qty,
      category: p.data.category,
      subcategory: p.data.subcategory,
      gst: p.data.gst,
      discount: p.data.discount,
      product_desc: p.data.description,
      total_price: p.data.totalprice,
      images: p.data.images,
      category: p.data.category,
      subcategory: p.data.subcategory,
    });
    let a = await axios.post(C.SERVER_CALL + `/products/getallcats`);
    this.setState({
      cats: a.data,
    });
    for (let i = 0; i < this.state.cats.length; i++) {
      if (this.state.cats[i].name == this.state.category) {
        this.setState({
          sub_cat: this.state.cats[i].listofcat,
        });
      }
    }
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, anychange: true });
    if (event.target.name == "category") {
      for (let i = 0; i < this.state.cats.length; i++) {
        if (this.state.cats[i].name == event.target.value) {
          this.setState({ sub_cat: this.state.cats[i].listofcat });
          break;
        }
      }
    }
  };
  deleteThem = [];
  handleImageDelete = (imageURL) => {
    let index = this.state.images.findIndex((i) => i.image === imageURL);
    if (index !== -1) {
      let tmp = [...this.state.images];
      tmp.splice(index, 1);
      this.setState({
        images: tmp,
        anychange: true,
      });

      this.deleteThem.push(imageURL);
    }
  };

  formData = new FormData();
  handleFileUpload = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      this.formData.append(
        e.target.name,
        e.target.files[i],
        e.target.files[i].name
      );
    }
    this.setState({
      anychange: true,
    });
  };
  savechanges = (event) => {
    event.preventDefault();
    if (this.state.anychange) {
      if (this.deleteThem.length > 0) {
        Axios.delete(C.SERVER_CALL + `/upload/deleteFiles/`, {
          data: {
            images: this.deleteThem,
          },
        })
          .then((res) =>
          // console.log(res)
          { }
          )
          .catch((err) => console.error(err));
      }
      if (this.formData.getAll("image_file").length > 0) {
        if (
          parseInt(this.formData.getAll("image_file").length) +
          parseInt(this.state.images.length) >
          5
        ) {
          return alert("Number of images should be less than 5.");
        } else {
          var self = this;
          axios
            .post(
              C.SERVER_CALL + `/upload/update/${self.props.match.params.id}`,
              this.formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            )
            .then(function (res) {
              if (res.data.length > 0) {
                self.setState({
                  images: [...self.state.images, ...res.data],
                });
              }
            })
            .catch(function (res) {
            });
        }
      }
      axios
        .post(
          C.SERVER_CALL + `/products/updateproduct/${this.props.match.params.id}`,
          {
            product_name: this.state.product_name,
            price: this.state.price,
            qty: this.state.qty,
            images: this.state.images,
          }
        )
        .then(function (res) {
          //handle success
        })
        .catch(function (res) {
          //handle error
        });

      alert("updated");
      this.props.history.push("/dashboard/sellercentral/userproduct");
    } else {
      alert("no changes noticed");
    }
  };

  render() {
    return (
      <div>
        <NavSection />
        <form className="edit-outer">
          <div className="edit-inner">
            <div className="col-3 edit-name">Product Name</div>
            <div className="col-9">
              <input
                className="edit-input"
                placeholder={this.state.product_name}
                name="product_name"
                type="text"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="edit-inner">
            <div className="col-3 edit-name">Price</div>
            <div className="col-9">
              <input
                className="edit-input"
                placeholder={this.state.price}
                name="price"
                type="number"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="edit-inner">
            <div className="col-3 edit-name">Minimum Quantity</div>
            <div className="col-9">
              <input
                className="edit-input"
                placeholder={this.state.qty}
                name="qty"
                type="number"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="edit-inner">
            <div className="col-3 edit-name">Category</div>
            <div className="col-9">
              <input
                type="select"
                name="category"
                value={this.state.category}
                className="edit-input"
                placeholder={this.state.category}
                onChange={this.handleChange}
                required
              />
              {this.state.cats.map((i) => (
                <option value={i.name}>{i.name}</option>
              ))}
            </div>
          </div>
          <div className="edit-inner">
            <div className="col-3 edit-name">Product Description</div>
            <div className="col-9">
              <input
                className="edit-input"
                placeholder={this.state.product_desc}
                name="product-desc"
                type="textarea"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="edit-inner">
            <div className="col-3 edit-name">Sub-Category</div>
            <div className="col-9">
              <input
                type="select"
                name="subcategory"
                value={this.state.subcategory}
                placeholder={this.state.subcategory}
                className="edit-input"
                onChange={this.handleChange}
                required
              />
              {this.state.sub_cat.map((i) => (
                <option value={i.name}>{i.name}</option>
              ))}
            </div>
          </div>
          <div className="edit-inner">
            <div className="col-3 edit-name">GST Amount</div>
            <div className="col-9">
              <input
                className="edit-input"
                placeholder={this.state.gst}
                name="gst"
                type="number"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="edit-inner">
            <div className="col-3 edit-name">Product Total Price</div>
            <div className="col-9">
              <input
                className="edit-input"
                placeholder={this.state.total_price}
                name="total_price"
                type="number"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="edit-inner">
            <div className="col-3 edit-name">Discount %</div>
            <div className="col-9">
              <input
                className="edit-input"
                placeholder={this.state.discount}
                name="discount"
                type="number"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="edit-inner">
            <div className="col-3 edit-name">Images</div>

            <div className="col-9">
              {this.state.images.length > 1
                ? this.state.images.map((image) => (
                  <div>
                    <img src={image.image} />
                    <AiOutlineClose
                      onClick={this.handleImageDelete.bind(this, image.image)}
                    />
                  </div>
                ))
                : this.state.images.map((image) => (
                  <div>
                    <img src={image.image} />
                  </div>
                ))}
              <input
                type="file"
                name="image_file"
                className=""
                accept=".jpg,.jpeg,.png"
                onChange={this.handleFileUpload}
                multiple
                required
              />
              <FormText color="muted">
                Upload less than 5 images Suggested file format: *.jpg, *.jpeg,
                *.png
              </FormText>
            </div>
          </div>
          <div className="edit-inner edit-submit">
            <button className="btn btn-primary" onClick={this.savechanges}>
              SAVE CHANGES
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Editmodal;
