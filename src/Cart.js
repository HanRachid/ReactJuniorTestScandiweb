import React, { Component } from "react";
import "./CartItems.css";
import Header from "./Header";
import CartItems from "./CartItems";
export default class Cart extends Component {
  constructor(props) {
    super();
    this.currencyUpdate = this.currencyUpdate.bind(this);
    this.categoryUpdate = this.categoryUpdate.bind(this);

    this.cartAdd = this.cartAdd.bind(this);
    this.state = { cartelements: [], counterarticles: 0 };
  }
  categoryUpdate(categ) {
    this.setState((prevState) => ({ category: categ }));
  }
  currencyUpdate(currency, symbol) {
    this.setState({ currency: currency, symbol: symbol });
    this.props.symbolChanger(currency, symbol);
    this.forceUpdate();
  }
  cartAdd(element, counterarticles) {
    this.props.addtoCart(element, counterarticles);
    this.setState({ cartelements: element, counterarticles: counterarticles });
  }
  render() {
    return (
      <div className="page">
        <Header
          totalcurrency={this.props.totalcurrency}
          settotal={this.props.settotal}
          totalprice={this.props.totalprice}
          isOpaque={this.props.isOpaque}
          setOpaque={this.props.setOpaque}
          increment={this.props.increment}
          decrement={this.props.decrement}
          symbol={this.props.symbol}
          currency={this.props.currency}
          categoryUpdate={this.categoryUpdate}
          currencyUpdate={this.currencyUpdate}
          cartelements={this.props.cartelements}
          counterarticles={this.props.counterarticles}
        ></Header>

        <div className="pagetitle"> CART</div>
        <hr />
        {this.props.cartelements.map((e) => {
          return (
            <div>
              <CartItems
                settotal={this.props.settotal}
                totalprice={this.props.totalprice}
                increment={this.props.increment}
                decrement={this.props.decrement}
                numberofproducts={this.props.counterarticles}
                pickedattributes={e[0]}
                prices={e[2]}
                quantity={e[1]}
                attributes={e[3]}
                gallery={e[4]}
                currentimage={e[5]}
                symbol={this.props.symbol}
                currency={this.props.currency}
              ></CartItems>
              <hr />
            </div>
          );
        })}
        <div className="tax">
          tax 21%: {this.props.symbol}
          {(Math.round(this.props.totalprice * 21) / 100).toFixed(2)}{" "}
        </div>
        <div className="quantitycart">
          quantity: {this.props.counterarticles}
        </div>
        <div className="totalcart">
          total: {this.props.symbol}
          {(Math.round(this.props.totalprice * 100) / 100).toFixed(2)}{" "}
        </div>
        <div className="ordercart">
          <button>ORDER</button>
        </div>
      </div>
    );
  }
}
