import React, { Component } from "react";
import Axios from "axios";

import C from "../../../resource/values";
import "./style.css";
import banner from "../../../assets/images/Banner.jpg";
import slogo from "../../../assets/images/slogo.png";
import slider1 from "../../../assets/images/slider-1.jpeg";
import slider2 from "../../../assets/images/slider-2.jpeg";
import slider3 from "../../../assets/images/slider-3.jpeg";
import GROCERY from "../../../assets/images/GROCERY.jpeg";
import Fruit from "../../../assets/images/Fruit and veg.jpeg";
import MEAT from "../../../assets/images/MEAT.jpeg";
import FMGC from "../../../assets/images/FMGC.jpeg";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

export default class FeaturedOnHome extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.items);
    // this.gridWise = this.gridWise.bind(this);
    this.state = {
      dealsofDayItems: [],
      recommendedItems: [],
      discountItems: [],
      recentlyViewedItems: [],

      gallery_fdsp: [],
      gallery_fmcg: [],
      gallery_fveg: [],
      gallery_meat: [],
    };
  }

  componentDidMount() {
    Axios.post(`${C.SERVER_CALL}/products/getallcats`)
      .then((res) => {
        this.setState({
          gallery_fdsp: res.data[0].listofcat,
          gallery_fmcg: res.data[1].listofcat,
          gallery_fveg: res.data[2].listofcat,
          gallery_meat: res.data[3].listofcat,
        });
      })
      .catch((err) => { });
  }
  handleOnDragStart = (e) => e.preventDefault();
  responsive = {
    0: { items: 1 },
    1024: { items: 4 },
  };
  render() {
    const images = [{ url: slider1 }, { url: slider2 }, { url: slider3 }];
    return (
      <div style={{ backgroundColor: "white" }}>
        <div className="show">
          <div className="show-main">
            <div className="code-show-main">
              <p>
                ONE STOP SOLUTION FOR ALL YOUR
                <span style={{ color: "#FF2525" }}>&nbsp;BUSINESS NEEDS</span>
              </p>
            </div>
            <div className="small-logo">
              <img src={slogo} />
            </div>
          </div>
          <div className="show-banner">
            <img src={banner} />
          </div>
        </div>

        <div className="rest">
          <div className="heading">
            <center className="heading-sub">SHOP BY CATEGORY!</center>
          </div>
          <div className="catrgories-homepage">
            <div className="catrgories-homepage-sub-div">
              <Link to="/subcat/5ec6bf92db07952fd6056c1e">
                <div className="home-prod-img-div">
                  <img src={GROCERY} className="home-prod-img" />
                </div>
                <h3>GROCERY</h3>
              </Link>
            </div>
            <div className="catrgories-homepage-sub-div">
              <Link to="/subcat/5ec6c0760aa60d3028408a1a">
                <div className="home-prod-img-div">
                  <img src={Fruit} className="home-prod-img" />
                </div>
                <h3>FRUIT AND VEG</h3>
              </Link>
            </div>
            <div className="catrgories-homepage-sub-div">
              <Link to="/subcat/5ec818ce94ba72744bc0145a">
                <div className="home-prod-img-div">
                  <img src={MEAT} className="home-prod-img" />
                </div>
                <h3>MEAT</h3>
              </Link>
            </div>
            <div className="catrgories-homepage-sub-div">
              <Link to="/subcat/5ec6c01d0aa60d3028408a19">
                <div className="home-prod-img-div">
                  <img src={FMGC} className="home-prod-img" />
                </div>
                <h3>FMCG</h3>
              </Link>
            </div>
          </div>

          <div className='slider-package'>
            <h3>FOOD-STAPLES</h3>
            <AliceCarousel
              mouseTrackingEnabled
              responsive={this.responsive}
              items={this.state.gallery_fdsp.map((i) => (
                <div>
                  <Link to={`/category/${i.name}`}>
                    <div className="slider-box">
                      <img
                        style={{ width: "180px", height: "180px" }}
                        className="slider-model"
                        src={i.url}
                      />
                    </div>
                    <div className="slider-details">
                      <img
                        className="slider-logo"
                        style={{ height: "auto", width: "100px" }}
                      />
                      <p className="slider-marvel">{i.name}</p>
                    </div>
                  </Link>
                </div>
              ))}
              responsive={this.responsive}
              autoPlayInterval={2000}
              autoPlayDirection="ltr"
              autoPlay={true}
              fadeOutAnimation={true}
              mouseTrackingEnabled={true}
              playButtonEnabled={false}
              disableAutoPlayOnAction={true}
              onSlideChange={this.onSlideChange}
              onSlideChanged={this.onSlideChanged}
            />
          </div>

          <hr className="hr" />
          <hr className="hr2" />
          <div className='slider-package'>
            <h3>FRUITS AND VEGETABLES</h3>
            <AliceCarousel
              mouseTrackingEnabled
              responsive={this.responsive}
              items={this.state.gallery_fveg.map((i) => (
                <div>
                  <Link to={`/category/${i.name}`}>
                    <div className="slider-box">
                      <img
                        style={{ width: "180px", height: "180px" }}
                        className="slider-model"
                        src={i.url}
                      />
                    </div>
                    <div className="slider-details">
                      <img
                        className="slider-logo"
                        style={{ height: "auto", width: "100px" }}
                      />
                      <p className="slider-marvel">{i.name}</p>
                    </div>
                  </Link>
                </div>
              ))}
              responsive={this.responsive}
              autoPlayInterval={2000}
              autoPlayDirection="rtl"
              autoPlay={true}
              fadeOutAnimation={true}
              mouseTrackingEnabled={true}
              playButtonEnabled={false}
              disableAutoPlayOnAction={true}
              onSlideChange={this.onSlideChange}
              onSlideChanged={this.onSlideChanged}
            />
          </div>
          <hr className="hr" />
          <hr className="hr3" />
          <div className='slider-package'>
            <h3>MEAT</h3>
            <AliceCarousel
              mouseTrackingEnabled
              responsive={this.responsive}
              items={this.state.gallery_meat.map((i) => (
                <div>
                  <Link to={`/category/${i.name}`}>
                    <div className="slider-box">
                      <img
                        style={{ width: "180px", height: "180px" }}
                        className="slider-model"
                        src={i.url}
                      />
                    </div>
                    <div className="slider-details">
                      <img
                        className="slider-logo"
                        style={{ height: "auto", width: "100px" }}
                      />
                      <p className="slider-marvel">{i.name}</p>
                    </div>
                  </Link>
                </div>
              ))}
              responsive={this.responsive}
              autoPlayInterval={2000}
              autoPlayDirection="rtl"
              autoPlay={true}
              fadeOutAnimation={true}
              mouseTrackingEnabled={true}
              playButtonEnabled={false}
              disableAutoPlayOnAction={true}
              onSlideChange={this.onSlideChange}
              onSlideChanged={this.onSlideChanged}
            />
          </div>
          <hr className="hr" />
          <hr className="hr4" />
          <div className='slider-package'>
            <h3>FMCG</h3>
            <AliceCarousel
              mouseTrackingEnabled
              responsive={this.responsive}
              items={this.state.gallery_fmcg.map((i) => (
                <div>
                  <Link to={`/category/${i.name}`}>
                    <div className="slider-box">
                      <img
                        style={{ width: "180px", height: "180px" }}
                        className="slider-model"
                        src={i.url}
                      />
                    </div>
                    <div className="slider-details">
                      <img
                        className="slider-logo"
                        style={{ height: "auto", width: "100px" }}
                      />
                      <p className="slider-marvel">{i.name}</p>
                    </div>
                  </Link>
                </div>
              ))}
              responsive={this.responsive}
              autoPlayInterval={2000}
              autoPlayDirection="rtl"
              autoPlay={true}
              fadeOutAnimation={true}
              mouseTrackingEnabled={true}
              playButtonEnabled={false}
              disableAutoPlayOnAction={true}
              onSlideChange={this.onSlideChange}
              onSlideChanged={this.onSlideChanged}
            />
          </div>
          <hr className="hr" />
        </div>
      </div>
    );
  }
}
