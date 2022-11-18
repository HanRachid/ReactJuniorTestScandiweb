import React, { Component } from "react";
import "./CartOverlay.css";
export default class CartOverlay extends Component {
  constructor(props) {
    super();
    this.incrementtotal = this.incrementtotal.bind(this);
    this.decrementtotal = this.decrementtotal.bind(this);
  }

  changeAttributes() {}
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
  }
  componentDidUpdate() {}
  render() {
    return (
      <div className="cartitem">
        <div className="leftpart">
          <div className="nameandprice">
            {this.props.pickedattributes.Name}
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
                <div className="attributeType">{element[1].id}</div>
                <div className="attributes">
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
                            className="attributevalues"
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
                            className="attributevalues"
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
                            className="attributevaluescolor"
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
                              console.log(this.props);
                              this.forceUpdate();
                            }}
                            className="attributevaluescolor"
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

        <div className="rightpart">
          <div className="counter">
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
          <img src={this.props.currentimage} alt="" className="cartimage" />
        </div>
      </div>
    );
  }
}
