// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import "./Cart.css";
// import Axios from "axios";
// import { API_URL } from "../../../constants/API";
// import { Table, Alert, Collapse } from "reactstrap";
// import ButtonUI from "../../components/Button/Button";
// import swal from "sweetalert";
// import { UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";

// class Cart extends React.Component {
//   state = {
//     arrCart: [],
//     transactionDetails: {
//       userId: 0,
//       items: [],
//       totalPrice: 0,
//       status: "pending",
//       isCondition: true,
//     },
//   };
//   getCartData() {
//     let totalPrice = 0;

//     Axios.get(`${API_URL}/cart`, {
//       params: {
//         userId: this.props.user.id,
//         _expand: "product",
//       },
//     })
//       .then((res) => {
//         // this.setState({ arrCart: res.data });
//         console.log(res.data);
//         res.data.map((val) => {
//           totalPrice += val.quantity * val.product.price;
//         });
//         this.setState({
//           arrCart: res.data,
//           transactionDetails: {
//             userId: this.props.user.id,
//             items: res.data,
//             totalPrice: totalPrice,
//           },
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   componentDidMount() {
//     this.getCartData();
//   }

//   deleteCartHandler = (id) => {
//     Axios.delete(`${API_URL}/cart/${id}`)
//       .then((res) => {
//         console.log(res);
//         this.getCartData();
//         swal(
//           "Delete to cart",
//           "Your item has been deleted from your cart",
//           "success"
//         );
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   // transaksiCart = () => {
//   //   this.setState({
//   //     isCondition: true,
//   //   });
//   // };
//   renderCart = () => {
//     return this.state.arrCart.map((val, idx) => {
//       const { quantity, product, id } = val;
//       const { productName, image, price } = product;

//       return (
//         <tr>
//           <td>{idx + 1}</td>
//           <td>{productName}</td>
//           <td>
//             {new Intl.NumberFormat("id-ID", {
//               style: "currency",
//               currency: "IDR",
//             }).format(price)}
//           </td>
//           <td>{quantity}</td>
//           <td>
//             {""}
//             <img
//               src={image}
//               alt=""
//               style={{ width: "100px", height: "200px", objectFit: "contain" }}
//             ></img>
//           </td>
//           <td colSpan={1}>
//             <ButtonUI onClick={() => this.deleteCartHandler(id)}>
//               Delete{" "}
//             </ButtonUI>
//           </td>
//         </tr>
//       );
//     });
//   };

//   checkoutHandler = () => {
//     let totalPrice;
//     return this.state.arrCart.map((val, idx) => {
//       const { quantity, product, id } = val;
//       const { productName, image, price } = product;
//       totalPrice = quantity * product.price;
//       return (
//         <tr>
//           <td>{idx + 1}</td>
//           <td>{productName}</td>
//           <td>
//             {new Intl.NumberFormat("id-ID", {
//               style: "currency",
//               currency: "IDR",
//             }).format(price)}
//           </td>
//           <td>{quantity}</td>
//           <td>
//             {""}
//             <img
//               src={image}
//               alt=""
//               style={{ width: "100px", height: "200px", objectFit: "contain" }}
//             ></img>
//           </td>
//           <td>
//             {new Intl.NumberFormat("id-ID", {
//               style: "currency",
//               currency: "IDR",
//             }).format(totalPrice)}
//           </td>
//         </tr>
//       );
//     });
//   };

//   confirmToPay = () => {
//     Axios.post(`${API_URL}/transactions`, this.state.transactionDetails)
//       .then((res) => {
//         console.log(res.data);
//         this.state.arrCart.map((val) => {
//           return this.deleteHandler(val.id);
//         });
//         swal("Thank you!", "Your Transaction is Success", "success");
//       })
//       .catch((err) => {
//         alert("ERRROOORR");
//         console.log(err);
//       });
//   };

//   render() {
//     return (
//       <div className="container">
//         <Table striped>
//           <thead>
//             <tr>
//               <th>No</th>
//               <th>Product Name</th>
//               <th>Price</th>
//               <th>Qty</th>
//               <th>Image</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           {this.state.arrCart.length != 0 ? (
//             <tbody>{this.renderCart()}</tbody>
//           ) : (
//             <Alert>
//               Your cart is empty! <Link to="/">Go shopping</Link>
//             </Alert>
//           )}
//         </Table>
//         <div>
//           <Button color="primary" id="toggler" style={{ marginBottom: "1rem" }}>
//             CheckOut
//           </Button>
//           <UncontrolledCollapse toggler="#toggler">
//             <Card>
//               <CardBody>
//                 <div>
//                   <h4 className="mt-2">Checkout</h4>
//                 </div>
//                 <div>
//                   <Table>
//                     <thead>
//                       <tr>
//                         <th>No</th>
//                         <th>Product Name</th>
//                         <th>Price</th>
//                         <th>Qty</th>
//                         <th>Image</th>
//                         <th>Totals</th>
//                       </tr>
//                     </thead>
//                     <tbody>{this.checkoutHandler()}</tbody>{" "}
//                     <tfoot>
//                       <tr>
//                         <td colSpan={4} className="text-center">
//                           <h5>Total Price</h5>
//                         </td>
//                         <td>
//                           <h5>
//                             {new Intl.NumberFormat("id-ID", {
//                               style: "currency",
//                               currency: "IDR",
//                             }).format(this.state.arrCart.fixedPrice)}
//                           </h5>
//                         </td>
//                       </tr>
//                     </tfoot>
//                   </Table>
//                 </div>
//                 <div>
//                   <ButtonUI type="contained" onClick={this.confirmToPay}>
//                     Confirm to Pay
//                   </ButtonUI>
//                 </div>
//               </CardBody>
//             </Card>
//           </UncontrolledCollapse>
//         </div>
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//   };
// };
// export default connect(mapStateToProps)(Cart);

import React from "react";
import { connect } from "react-redux";
import swal from "sweetalert";
import "./Cart.css";

import { Table, Alert, Button } from "reactstrap";

import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  state = {
    cartData: [],
    isCheckout: false,
    totalPrice: 0,
  };

  getCartData = () => {
    let total = 0;
    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        console.log(res.data);
        res.data.map((val) => {
          return (total += val.quantity * val.product.price);
        });
        this.setState({ cartData: res.data, totalPrice: total });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCartData = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, image, price } = product;
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </td>
          <td>{quantity}</td>
          <td>
            {" "}
            <img
              src={image}
              alt=""
              style={{ width: "100px", height: "200px", objectFit: "contain" }}
            />{" "}
          </td>
          <td>
            <ButtonUI
              type="outlined"
              onClick={() => this.deleteCartHandler(id)}
            >
              Delete Item
            </ButtonUI>
          </td>
        </tr>
      );
    });
  };

  renderCheckout = () => {
    let total = 0;
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, image, price } = product;
      total = quantity * price;

      return (
        <tr>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </td>
          <td>{quantity}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(total)}
          </td>
        </tr>
      );
    });
  };

  deleteCartHandler = (id) => {
    Axios.delete(`${API_URL}/cart/${id}`)
      .then((res) => {
        this.getCartData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  confirmHandler = () => {
    const transactionsData = {
      userId: this.props.user.id,
      totalPrice: this.state.totalPrice,
      status: "pending",
      items: this.state.cartData,
    };
    Axios.post(`${API_URL}/transactions`, transactionsData)
      .then((res) => {
        console.log(res);
        swal("Finished", "Thank you.", "success");
        this.state.cartData.map((val) => {
          return this.deleteCartHandler(val.id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getCartData();
  }

  render() {
    return (
      <div className="container py-4">
        {this.state.cartData.length > 0 ? (
          <>
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderCartData()}</tbody>
            </Table>
            <ButtonUI
              type="contained"
              onClick={() => this.setState({ isCheckout: true })}
            >
              Checkout
            </ButtonUI>
            <br />
            {this.state.isCheckout ? (
              <div>
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderCheckout()}</tbody>
                </Table>
                <Table>
                  <thead>
                    <tr>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(this.state.totalPrice)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <ButtonUI
                  type="contained"
                  onClick={() => this.confirmHandler()}
                >
                  Confirm
                </ButtonUI>
              </div>
            ) : null}
          </>
        ) : (
          <Alert>
            Your cart is empty! <Link to="/">Go shopping</Link>
          </Alert>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Cart);
