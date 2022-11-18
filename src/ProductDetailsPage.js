import React, { Component } from "react";

import ProductDetails from "./ProductDetails";
import Header from "./Header";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
export default class ProductDetailsPage extends Component {
  constructor(props) {
    super();
    this.currencyUpdate = this.currencyUpdate.bind(this);
    this.categoryUpdate = this.categoryUpdate.bind(this);

    this.cartAdd = this.cartAdd.bind(this);
    this.state = { cartelements: [], counterarticles: 0 };
  }

  cartAdd(element, counterarticles) {
    this.props.addtoCart(element, counterarticles);
    this.setState({ cartelements: element, counterarticles: counterarticles });
  }
  categoryUpdate(categ) {
    this.setState((prevState) => ({ category: categ }));
  }
  currencyUpdate(currency, symbol) {
    this.setState({ currency: currency, symbol: symbol });
    this.props.symbolChanger(currency, symbol);
  }

  componentDidMount() {
    this.setState({ cartelements: this.props.cartelements });
  }
  render() {
    return (
      <div>
        <Header
          totalcurrency={this.props.totalcurrency}
          settotal={this.props.settotal}
          totalprice={this.props.totalprice}
          setOpaque={this.props.setOpaque}
          isOpaque={this.props.isOpaque}
          increment={this.props.increment}
          decrement={this.props.decrement}
          cartelements={this.props.cartelements}
          symbol={this.props.symbol}
          counterarticles={this.props.counterarticles}
          categoryUpdate={this.categoryUpdate}
          currencyUpdate={this.currencyUpdate}
          currency={this.props.currency}
        ></Header>
        <ProductDetails
          settotal={this.props.settotal}
          totalprice={this.props.totalprice}
          currency={this.props.currency}
          cartAdd={this.cartAdd}
          symbol={this.props.symbol}
          id={window.location.href.split("/")[5]}
          cartelements={this.state.cartelements}
        ></ProductDetails>
      </div>
    );
  }
}
