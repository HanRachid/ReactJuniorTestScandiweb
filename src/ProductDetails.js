import "./ProductDetailsPage.css";
import React, { Component } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

class ProductDetails extends Component {
  constructor(props) {
    super();
    this.popandReplace = this.popandReplace.bind(this);
    this.fetchID = this.fetchID.bind(this);
    this.descriptionMarkup = this.descriptionMarkup.bind(this);
    this.settotal = this.settotal.bind(this);
    this.addtoCart = this.addtoCart.bind(this);
    this.state = {
      attributes: [],
      pickedattributes: [],
      name: "",
      price: "",
      symbol: "",
      desciption: "",
      gallery: [],
      firstgallery: "",
      cartelements: [],
    };
  }

  fetchID() {
    const client = new ApolloClient({
      uri: "http://localhost:4000/",
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query IDfetch($id: String!) {
            product(id: $id) {
              category
              description
              id
              inStock
              name
              gallery
              brand
              prices {
                amount
                currency {
                  label
                  symbol
                }
              }
              attributes {
                id
                items {
                  displayValue
                  id
                  value
                }
                name
                type
              }
            }
          }
        `,
        variables: { id: this.props.id },
      })
      .then((result) => {
        const tempAttributes = [];
        const tempArray = [];
        const tempObject = { Name: result.data.product.name };
        result.data.product.attributes.forEach((e) => {
          tempArray.push(e);
        });
        tempArray.forEach((e) => {
          tempAttributes.push([e.id, ""]);
          tempObject[e.id] = "";
        });

        this.setState({
          attributes: result.data.product.attributes,
          name: result.data.product.name,
          price: result.data.product.prices,
          desciption: result.data.product.description,
          gallery: result.data.product.gallery,
          firstgallery: result.data.product.gallery[0],
          pickedattributes: { ...tempObject },
        });
      });
  }
  settotal() {
    let currentprice = 0;
    Object.entries(this.state.price).forEach((e) => {
      if (this.props.currency === e[1].currency.label) {
        currentprice = e[1].amount;
      }
    });

    currentprice = currentprice + this.props.totalprice;
    console.log(this.props.totalprice);
    this.props.settotal(currentprice);
  }
  addtoCart() {
    let isnotpicked = false;
    Object.entries(this.state.pickedattributes).forEach((element) => {
      if (element[1] === "") {
        isnotpicked = true;
      }
    });
    if (isnotpicked) {
      return window.alert("please pick all options!");
    }
    const tempArray = this.props.cartelements;

    let counter = 0;
    tempArray.every((article) => {
      if (
        JSON.stringify(this.state.pickedattributes) ===
        JSON.stringify(article[0])
      ) {
        article[1]++;
        return false;
      } else {
        ++counter;

        return true;
      }
    });
    if (tempArray.length === counter) {
      tempArray.push([
        { ...this.state.pickedattributes },
        1,
        { ...this.state.price },
        { ...this.state.attributes },
        { ...this.state.gallery },
        this.state.firstgallery,
      ]);
    }
    let counterarticles = 0;
    this.props.cartelements.forEach((element) => {
      counterarticles += element[1];
    });
    this.setState({ numberofproducts: counterarticles });

    this.setState({ cartelements: tempArray });
    this.settotal();
    this.props.cartAdd(tempArray, counterarticles);
  }
  descriptionMarkup() {
    const description = this.state.desciption;
    return { __html: description };
  }
  componentDidMount() {
    this.fetchID();
    this.setState({ cartelements: this.props.cartelement });
  }
  currencyUpdate(currency, symbol) {
    this.setState({ currency: currency, symbol: symbol });
    this.props.symbolChanger(symbol);
  }
  popandReplace(e) {
    const target = e.target.src;

    document.querySelectorAll(".smallproductimage > img").forEach((element) => {
      element.style.outline = "";
    });
    e.target.style.outline = "2px solid black";
    this.setState({
      firstgallery: target,
    });
  }

  render() {
    if (this.state.price !== "") {
      return (
        <div className="productdetails">
          <div className="productimage">
            <div className="smallproductimage">
              {this.state.gallery.map((e) => {
                if (this.state.gallery.indexOf(e) === 0) {
                  return (
                    <img
                      style={{ outline: "2px solid black" }}
                      onClick={this.popandReplace}
                      src={e}
                      alt=""
                      key={e}
                    />
                  );
                } else {
                  return <img onClick={this.popandReplace} src={e} alt="" />;
                }
              })}
            </div>
            <div className="bigproductimage">
              <img src={this.state.firstgallery} alt="" />
            </div>
          </div>
          <div className="productright">
            <div className="productname">{this.state.name}</div>
            {this.state.attributes.map((e) => {
              if (e.type !== "swatch") {
                return (
                  <div className="attribute">
                    <div className="attributename">{e.name}</div>
                    <div className="text">
                      {e.items.map((text) => {
                        return (
                          <div
                            key={text.value}
                            className={
                              "textbox" + e.id.split(" ")[0] + " atextbox"
                            }
                            style={{
                              width: "50px",
                              height: "30px",
                              outline: "2px solid grey",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              "&:hover": {},
                            }}
                            onMouseEnter={(hovered) => {
                              hovered.target.style.boxShadow =
                                "0px 8px 16px 0px rgba(0, 0, 0, 0.2)";
                              hovered.target.style.outline = "3px solid black";
                            }}
                            onMouseLeave={(hovered) => {
                              hovered.target.style.outline = "2px solid grey";
                            }}
                            onClick={(el) => {
                              const tempArray = this.state.pickedattributes;
                              document
                                .querySelectorAll(
                                  ".textbox" + e.id.split(" ")[0]
                                )
                                .forEach((element) => {
                                  element.style.backgroundColor = "white";
                                  element.style.color = "black";
                                });

                              e.items.forEach((element) => {
                                Object.entries(tempArray).forEach(
                                  (attribute) => {
                                    if (
                                      e.id === attribute[0] &&
                                      element.value === text.value
                                    ) {
                                      tempArray[attribute[0]] = element.id;
                                      el.target.style.backgroundColor = "black";
                                      el.target.style.color = "white";
                                    }
                                  }
                                );
                              });
                            }}
                          >
                            {text.value}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="attribute">
                    <div className="attributename">{e.name}</div>
                    <div className="swatch">
                      {e.items.map((color) => {
                        return (
                          <div
                            style={{ backgroundColor: color.value }}
                            key={color.value}
                            className={"swatchbox"}
                            onClick={(el) => {
                              const tempArray = this.state.pickedattributes;

                              document
                                .querySelectorAll(".swatchbox")
                                .forEach((element) => {
                                  element.style.outline = "";
                                });

                              e.items.forEach((element) => {
                                Object.entries(tempArray).forEach(
                                  (attribute) => {
                                    if (
                                      e.id === attribute[0] &&
                                      element.value === color.value
                                    ) {
                                      tempArray[attribute[0]] = element.id;
                                      el.target.style.outline =
                                        "3px solid black";
                                    }
                                  }
                                );
                              });
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            })}
            <div className="pricetext"> Price</div>
            <div className="amounttext">
              {" "}
              {this.props.symbol}
              {this.state.price.map((e) => {
                if (e.currency.symbol === this.props.symbol) {
                  return e.amount;
                }
              })}
            </div>
            <button onClick={this.addtoCart} className="addtocart">
              ADD TO CART
            </button>

            <div className="descriptiontext">
              <div dangerouslySetInnerHTML={this.descriptionMarkup()} />
            </div>
          </div>
        </div>
      );
    }
  }
}
export default ProductDetails;
