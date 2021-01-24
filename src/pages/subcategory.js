import React, { Component } from "react";
import NavSection from "../components/organisms/nav-section/index";
import "./subcategory.css";
import { Link } from "react-router-dom";
import axios from "axios";
import C from "../resource/values"

class subcategory extends Component {

  state = {
    maincat: "",
    items: [],
    id: ""
  }

  componentDidMount = async () => {
    let a = await axios.post(C.SERVER_CALL + '/products/getallsubcats', {          
      id: this.props.match.params.id
    })
    this.setState({ maincat: a.data.catname, items: a.data.list, id: this.props.match.params.id })
  }

  componentDidUpdate = async () => {
    if (this.state.id !== this.props.match.params.id) {

      let a = await axios.post(C.SERVER_CALL + '/products/getallsubcats', {           
        id: this.props.match.params.id
      })
      this.setState({ maincat: a.data.catname, items: a.data.list, id: this.props.match.params.id })
    }
  }

  render() {
    return (
      <div>
        <NavSection />
        <div>
          <div className="container">
            <div className="column">
              <div className="cat-name">
                <h2>{this.state.maincat}</h2>
              </div>
              <ul className="ul-subcat">
                {
                  this.state.items.map(i =>
                    <Link to={`/category/${i.name}`}>
                      <li className="li-subcat">
                        <div className="odiv-subcat">
                          <div className="idiv-subcat">
                            <div className="idiv-pic">
                              <img alt='' src={i.url} />
                            </div>
                            <div className="idiv-data">{i.name}</div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default subcategory;
