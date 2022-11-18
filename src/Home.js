import logo from "./logo.svg";
import "./Home.css";
import React, { Component } from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import Header from "./Header";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";

class Home extends Component {
  constructor(props) {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.currencyUpdate = this.currencyUpdate.bind(this);
    this.categoryUpdate = this.categoryUpdate.bind(this);
    this.state = {
      data: [],
      currency: "USD",
      category: "tech",
      symbol: "$",
      idClicked: "",
      counterarticles: 0,
      Globalcartelements: [],
    };
  }

  categoryUpdate(categ) {
    this.setState((prevState) => ({ category: categ }));
  }
  currencyUpdate(currency, symbol) {
    this.setState({ currency: currency, symbol: symbol });
    this.props.symbolChanger(currency, symbol);
  }

  fetchData() {
    const client = new ApolloClient({
      uri: "http://localhost:4000/",
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query Myquery($slug: String!) {
            category(input: { title: $slug }) {
              products {
                category
                name
                id
                prices {
                  amount
                  currency {
                    label
                    symbol
                  }
                }
                gallery
              }
            }
          }
        `,
        variables: { slug: this.state.category },
      })
      .then((result) => {
        this.setState({ data: result.data.category.products });
      });
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      this.fetchData();
    }
  }

  render() {
    return (
      <div>
        <Header
          totalcurrency={this.props.totalcurrency}
          settotal={this.props.settotal}
          totalprice={this.props.totalprice}
          setOpaque={this.props.setOpaque}
          isopaque={this.props.isOpaque}
          increment={this.props.increment}
          decrement={this.props.decrement}
          symbol={this.props.symbol}
          currency={this.props.currency}
          categoryUpdate={this.categoryUpdate}
          currencyUpdate={this.currencyUpdate}
          cartelements={this.props.cartelements}
          counterarticles={this.props.counterarticles}
        ></Header>

        <div id="productname">{this.state.category.toUpperCase()}</div>
        <div id="cards">
          {this.state.data.map((element) => {
            return (
              <ProductCard
                id={"productdetails/" + element.id}
                className="productcard"
                card={element.gallery[0]}
                description={element.name}
                currency={this.props.symbol}
                price={element.prices.map((e) => {
                  if (e.currency.label === this.props.currency) {
                    return e.amount;
                  }
                  return null;
                })}
              ></ProductCard>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Home;
