import React, { Component } from "react";
import "./CartItems.css";
export default class CartItems extends Component {
  constructor(props) {
    super();
    this.incrementtotal = this.incrementtotal.bind(this);
    this.decrementtotal = this.decrementtotal.bind(this);
  }

  incrementtotal() {
    let currentprice = 0;
    Object.entries(this.props.prices).forEach((e) => {
      if (this.props.currency === e[1].currency.label) {
        currentprice = e[1].amount;
      }
    });
    currentprice = currentprice + this.props.totalprice;

    this.props.settotal(currentprice);
    console.log(this.props.totalprice);
  }

  decrementtotal() {
    let currentprice = 0;
    Object.entries(this.props.prices).forEach((e) => {
      if (this.props.currency === e[1].currency.label) {
        currentprice = e[1].amount;
      }
    });
    currentprice = this.props.totalprice - currentprice;

    this.props.settotal(currentprice);
    console.log(this.props.totalprice);
  }
  render() {
    return (
      <div className="cartpageitem">
        <div className="cartleftpart">
          <div className="cartnameandprice">
            <p>{this.props.pickedattributes.Name}</p>
            {Object.entries(this.props.prices).map((e) => {
              if (this.props.currency === e[1].currency.label) {
                return (
                  <div>
                    {this.props.symbol + " "}
                    {e[1].amount}
                  </div>
                );
              }
            })}
          </div>

          {Object.entries(this.props.attributes).map((element) => {
            return (
              <div>
                <div className="cartattributeType">{element[1].id}</div>
                <div className="cartattributes">
                  {element[1].items.map((attribute) => {
                    if (element[1].type !== "swatch") {
                      if (
                        attribute.id ===
                        this.props.pickedattributes[element[1].id]
                      ) {
                        return (
                          <div
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
                            }}
                            className="cartattributevalues"
                          >
                            {attribute.value}
                          </div>
                        );
                      } else {
                        return (
                          <div
                            onClick={() => {
                              this.props.pickedattributes[element[1].id] =
                                attribute.id;

                              this.forceUpdate();
                            }}
                            className="cartattributevalues"
                          >
                            {attribute.value}
                          </div>
                        );
                      }
                    } else {
                      if (
                        attribute.id ===
                        this.props.pickedattributes[element[1].id]
                      ) {
                        return (
                          <div
                            className="cartattributevaluescolor"
                            style={{
                              backgroundColor: attribute.value,
                              outline: "2px solid black",
                              boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
                            }}
                          ></div>
                        );
                      } else {
                        return (
                          <div
                            onClick={() => {
                              this.props.pickedattributes[element[1].id] =
                                attribute.id;

                              this.forceUpdate();
                            }}
                            className="cartattributevaluescolor"
                            style={{
                              backgroundColor: attribute.value,
                              boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
                            }}
                          ></div>
                        );
                      }
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="cartrightpart">
          <div className="cartcounter">
            <div
              onClick={() => {
                this.props.increment(this.props.pickedattributes);
                this.incrementtotal();
              }}
            >
              +
            </div>
            <span> {this.props.quantity}</span>
            <div
              onClick={() => {
                this.props.decrement(this.props.pickedattributes);
                if (this.props.quantity > 1) {
                  this.decrementtotal();
                }
              }}
            >
              -
            </div>
          </div>
          <img src={this.props.currentimage} alt="" className="cartshopimage" />
        </div>
      </div>
    );
  }
}
