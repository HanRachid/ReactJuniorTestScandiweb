import React, { Component } from "react";
import "./ProductCard.css";

import { Link } from "react-router-dom";
import shopcartwhite from "./img/shoppingcartwhite.png";
export default class ProductCard extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="productcard">
        <Link style={{ textDecoration: "none" }} to={this.props.id}>
          <img src={this.props.card} alt="" />
          <p className="description">{this.props.description}</p>

          <div className="shopIcon">
            <img className="shopiconimg" src={shopcartwhite} alt="" />
          </div>
        </Link>
        <div className="priceandcurrency">
          {this.props.currency}
          {this.props.price}
        </div>
      </div>
    );
  }
}
