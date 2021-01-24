import React, { Component } from "react";
import NavSection from "../components/organisms/nav-section";
import axios from 'axios'
import DisplayProductsOfCategory from "../components/organisms/productsOfCategory/DisplayProductsOfCategory";
import C from "../resource/values";

export default class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      res: false
    };
  }
  componentDidMount = async () => {

    let items = await axios.post(C.SERVER_CALL + '/products/getsubcat', {
      subcategory: this.props.match.params.name
    });
    if (items) {
      this.setState({ res: true })
      this.setState({ data: items.data })
    }
  }
  render() {
    return (
      <div>
        <NavSection />
        {
          this.state.res
            ?
            <>
              {
                this.state.data.length > 0
                  ?
                  <DisplayProductsOfCategory data={this.state.data} />
                  :
                  <h1 style={{ margin: "auto", padding: "7%" }}>No items</h1>
              }
            </>
            :
            <h1 style={{ margin: "auto", padding: "7%" }}>Loading ....</h1>
        }
      </div>
    );
  }
}
