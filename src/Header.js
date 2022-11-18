import React, { Component } from "react";
import "./Header.css";
import imag from "./img/greenbag.png";
import shopcart from "./img/shoppingcart.png";
import downarrow from "./img/arrow-down-sign-to-navigate.png";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Link, Navigate } from "react-router-dom";
import CartOverlay from "./CartOverlay";

export default class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      numberofproducts: 0,
      arrowflipped: false,
      currencies: [],
      symbol: "$",
      shopicon: false,
    };
    this.categoryUpdate = this.categoryUpdate.bind(this);
    this.shopdropdown = this.shopdropdown.bind(this);
    this.dropdown = this.dropdown.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }
  categoryUpdate = (e) => {
    this.props.categoryUpdate(e.target.innerText.toLowerCase());
  };

  fetchCurrencies() {
    const client = new ApolloClient({
      uri: "http://localhost:4000/",
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query Currencies {
            currencies {
              label
              symbol
            }
          }
        `,
      })
      .then((result) => {
        this.setState({ currencies: result.data.currencies });
      });
  }
  dropdown(e) {
    if (this.state.arrowflipped === false) {
      const dropdown = document.querySelector(".dropdown");
      const content = document.querySelector(".dropdown-content");
      e.target.className = "downarrowclicked";
      this.setState({ arrowflipped: true });

      dropdown.className = "dropdownclicked";
      content.className = "dropdown-contentclicked";
    } else {
      const dropdown = document.querySelector(".dropdownclicked");
      const content = document.querySelector(".dropdown-contentclicked");
      e.target.className = "downarrow";
      this.setState({ arrowflipped: false });
      dropdown.className = "dropdown";
      content.className = "dropdown-content";
    }
  }

  shopdropdown(e) {
    if (this.state.shopicon === false) {
      const dropdown = document.querySelector(".shopdropdown");
      const content = document.querySelector(".shopdropdown-content");

      this.setState({ shopicon: true });
      dropdown.className = "shopdropdownclicked";
      content.className = "shopdropdown-contentclicked";
    } else {
      const dropdown = document.querySelector(".shopdropdownclicked");
      const content = document.querySelector(".shopdropdown-contentclicked");

      this.setState({ shopicon: false });
      dropdown.className = "shopdropdown";
      content.className = "shopdropdown-content";
    }
    this.props.setOpaque();
  }

  componentDidMount() {
    this.fetchCurrencies();
    this.setState({
      symbol: this.props.symbol,
      headercartelements: this.props.cartelements,
    });
  }

  render() {
    return (
      <div className="header">
        <div className="categories">
          <div onClick={this.categoryUpdate}>Tech</div>
          <div onClick={this.categoryUpdate}>Clothes</div>
          <div onClick={this.categoryUpdate}>All</div>
        </div>
        <div>
          <Link to="/">
            <img
              onClick={() => {
                if (this.props.isOpaque) {
                  this.props.setOpaque();
                }
              }}
              src={imag}
              alt=""
              className="shopicon"
            />
          </Link>
        </div>
        <div className="header-right">
          <div className="currency">
            <p className="currencysymbol">{this.state.symbol}</p>

            <div className="dropdown">
              <img
                src={downarrow}
                onClick={this.dropdown}
                alt=""
                className="downarrow"
              />
              <div className="dropdown-content">
                {this.state.currencies.map((e) => {
                  return (
                    <div
                      onClick={() => {
                        this.props.currencyUpdate(e.label, e.symbol);
                        this.setState({ symbol: e.symbol });
                        this.props.totalcurrency(e.label);
                        this.forceUpdate();
                      }}
                      className="labelchanger"
                    >
                      {e.symbol} {e.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="shopdropdown">
            <div className="cartshopicon">
              <img
                onClick={this.shopdropdown}
                src={shopcart}
                alt=""
                className="shopicon"
              />{" "}
              {this.props.counterarticles !== 0 && (
                <div className="numberofelements">
                  {this.props.counterarticles}
                </div>
              )}
            </div>

            <div className="shopdropdown-content">
              <div className="mybag">
                {" "}
                My Bag, {this.props.counterarticles} items
              </div>
              <div className="cartelements">
                {this.props.counterarticles === 0 && (
                  <div className="additems"> Add items to your cart!</div>
                )}
                {this.props.cartelements.map((e) => {
                  return (
                    <div>
                      <CartOverlay
                        settotal={this.props.settotal}
                        totalprice={this.props.totalprice}
                        increment={this.props.increment}
                        decrement={this.props.decrement}
                        setOpaque={this.props.setOpaque}
                        numberofproducts={this.props.counterarticles}
                        pickedattributes={e[0]}
                        prices={e[2]}
                        quantity={e[1]}
                        attributes={e[3]}
                        gallery={e[4]}
                        currentimage={e[5]}
                        symbol={this.props.symbol}
                        currency={this.props.currency}
                      ></CartOverlay>
                    </div>
                  );
                })}
                <div className="carttotal">
                  <div className="totalcart"> TOTAL :</div>
                  <div className="totalpricecart">
                    {this.props.symbol}
                    {(Math.round(this.props.totalprice * 100) / 100).toFixed(2)}
                  </div>
                </div>

                {this.props.counterarticles > 0 && (
                  <div className="cartbuttons">
                    <Link to="../../mycart">
                      <button
                        onClick={() => {
                          if (window.location.href.split("/")[4] !== "mycart") {
                            this.props.setOpaque();
                          }
                          <Navigate to="/dashboard" replace={true} />;
                        }}
                        className="cartbuttonbag"
                      >
                        VIEW BAG
                      </button>
                    </Link>

                    <button className="cartbuttoncheck">CHECK OUT</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
