import logo from "./logo.svg";

import React, { Component } from "react";
import Home from "./Home";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import ProductCard from "./ProductCard";
import ProductDetailsPage from "./ProductDetailsPage";
import Cart from "./Cart";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: "$",
      cartelements: [],
      counterarticles: 0,
      currency: "USD",
      totalprice: 0,
      isOpaque: false,
    };
    this.symbolChanger = this.symbolChanger.bind(this);
    this.addtoCart = this.addtoCart.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.setOpaque = this.setOpaque.bind(this);
    this.settotal = this.settotal.bind(this);
    this.totalcurrency = this.totalcurrency.bind(this);
  }
  addtoCart(element, counterarticles) {
    this.setState({ cartelements: element, counterarticles: counterarticles });
  }
  symbolChanger(currency, symbol) {
    this.setState({ currency: currency, symbol: symbol });
    this.forceUpdate();
  }

  increment(currentobject) {
    this.setState({ counterarticles: this.state.counterarticles + 1 });
    const tempObject = Object.assign(this.state.cartelements);
    Object.entries(tempObject).forEach((e) => {
      if (JSON.stringify(e[1][0]) === JSON.stringify(currentobject)) {
        e[1][1]++;
      }
    });
  }
  settotal(current) {
    this.setState({ totalprice: current });
  }
  decrement(currentobject) {
    const tempObject = Object.assign(this.state.cartelements);
    Object.entries(tempObject).forEach((e) => {
      if (JSON.stringify(e[1][0]) === JSON.stringify(currentobject)) {
        if (e[1][1] > 1) {
          e[1][1]--;

          this.setState({ counterarticles: this.state.counterarticles - 1 });
        }
      }
    });
  }

  totalcurrency(currency) {
    let totalprice = 0;
    const tempObject = Object.assign(this.state.cartelements);
    Object.entries(tempObject).forEach((e) => {
      Object.entries(e[1][2]).forEach((price) => {
        if (price[1].currency.label === currency) {
          totalprice += price[1].amount * e[1][1];
        }
      });
    });
    this.setState({ totalprice: totalprice });
    this.forceUpdate();
    console.log(currency);
  }
  setOpaque() {
    if (this.state.isOpaque) {
      const opaqueclicked = document.querySelector("#opaqueclicked");
      opaqueclicked.id = "opaque";

      this.setState({ isOpaque: false });
    } else {
      const opaque = document.querySelector("#opaque");

      opaque.id = "opaqueclicked";
      this.setState({ isOpaque: true });
    }
  }

  updateCart(element) {}
  render() {
    return (
      <div>
        <div id="opaque"></div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route
              path="productdetails/:slug"
              element={
                <ProductDetailsPage
                  totalcurrency={this.totalcurrency}
                  totalprice={this.state.totalprice}
                  settotal={this.settotal}
                  isOpaque={this.state.isOpaque}
                  increment={this.increment}
                  decrement={this.decrement}
                  symbolChanger={this.symbolChanger}
                  symbol={this.state.symbol}
                  setOpaque={this.setOpaque}
                  currency={this.state.currency}
                  addtoCart={this.addtoCart}
                  cartelements={this.state.cartelements}
                  counterarticles={this.state.counterarticles}
                />
              }
            />
            <Route
              index
              element={
                <Home
                  totalcurrency={this.totalcurrency}
                  totalprice={this.state.totalprice}
                  settotal={this.settotal}
                  isOpaque={this.state.isOpaque}
                  setOpaque={this.setOpaque}
                  increment={this.increment}
                  decrement={this.decrement}
                  symbolChanger={this.symbolChanger}
                  symbol={this.state.symbol}
                  currency={this.state.currency}
                  updateCart={this.updateCart()}
                  cartelements={this.state.cartelements}
                  counterarticles={this.state.counterarticles}
                />
              }
            />
            <Route
              path="mycart"
              element={
                <Cart
                  totalcurrency={this.totalcurrency}
                  totalprice={this.state.totalprice}
                  settotal={this.settotal}
                  isOpaque={this.state.isOpaque}
                  setOpaque={this.setOpaque}
                  increment={this.increment}
                  decrement={this.decrement}
                  symbolChanger={this.symbolChanger}
                  symbol={this.state.symbol}
                  currency={this.state.currency}
                  addtoCart={this.addtoCart}
                  cartelements={this.state.cartelements}
                  counterarticles={this.state.counterarticles}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
