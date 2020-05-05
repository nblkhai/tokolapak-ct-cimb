// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import "./Cart.css";
// import Axios from "axios";
// import { API_URL } from "../../../constants/API";
// import { Table, Alert, Collapse } from "reactstrap";
// import ButtonUI from "../../components/Button/Button";
// import swal from "sweetalert";
// import {
//   UncontrolledCollapse,
//   Button,
//   CardBody,
//   Card,
//   Select,
// } from "reactstrap";
// import { cartQuantity } from "../../../redux/actions";

// class Cart extends React.Component {
//   state = {
//     arrCart: [],
//     datePayment: new Date(),
//     transactionDetails: {
//       userId: 0,
//       items: [],
//       totalPrice: 0,
//       status: "pending",
//       isCondition: true,
//       transactionDate: "",
//       dateDone: "",
//       ongkosKirim: 0,
//     },
//   };
//   getCartData() {
//     console.log(this.state.arrCart);
//     let fixedPrice = 0;

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
//           fixedPrice += val.quantity * val.product.price;
//         });
//         this.setState({
//           arrCart: res.data,
//           transactionDetails: {
//             userId: this.props.user.id,
//             items: res.data,
//             totalPrice: fixedPrice,
//             transactionDate: this.state.datePayment.toLocaleDateString(),
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
//         // Buat ngubah qty kalau didelete
//         this.props.cartQuantity(this.props.user.id);
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

//   checkboxHandler = (e, idx) => {
//     const { checked } = e.target;
//     if (checked) {
//       this.setState({ checkoutItems: [...this.state.checkoutItems, idx] });
//     } else {
//       this.setState({
//         checkoutItems: [
//           ...this.state.checkoutItems.filter((val) => val !== idx),
//         ],
//       });
//     }
//   };
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
//             {/* <input
//               className="form-control"
//               type="checkbox"
//               onChange={(e) => this.checkboxHandler(e, idx)}
//             ></input> */}
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

//   inputHandler = (e, field) => {
//     let { value } = e.target;
//     this.setState({
//       [field]: value,
//     });
//   };

//   confirmToPay = () => {
//     Axios.get(`${API_URL}/cart`, {
//       params: {
//         userId: this.props.user.id,
//         _expand: "product",
//       },
//     })
//       .then((res) => {
//         res.data.map((val) => {
//           Axios.delete(`${API_URL}/cart/${val.id}`)
//             .then((res) => {
//               console.log(res);
//               swal("Success", "Transaksi anda berhasil", "success");
//               this.getCartData();
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         });
//         Axios.post(`${API_URL}/transactions`, this.state.transactionDetails)
//           .then((res) => {
//             this.state.arrCart.map((val) => {
//               Axios.post(`${API_URL}/transactionDetails`, {
//                 productId: val.product.id,
//                 transactionsId: res.data.id,
//                 price: val.product.price,
//                 totalPrice: val.product.price * val.quantity,
//                 quantity: val.quantity,
//               })
//                 .then((res) => {
//                   console.log(res);
//                 })
//                 .then((err) => {
//                   console.log(err);
//                 });
//             });
//           })
//           .then((err) => {
//             console.log(err);
//           });
//       })
//       .catch((err) => {
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
//           {/* <tbody>{this.renderCart()}</tbody> */}
//           <div className="col-12 mt-3">
//             <select
//               value={this.state.ongkosKirim}
//               className="custom-text-input h-100 pl-3"
//               onChange={(e) => this.inputHandler(e, "ongkosKirim")}
//             >
//               <option value="0">Economy</option>
//               <option value="100000">Instant</option>
//               <option value="50000">Sameday</option>
//               <option value="20000">Express</option>
//             </select>
//           </div>

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
//                             }).format(this.state.transactionDetails.totalPrice)}
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
// const mapDispatchToProps = {
//   cartQuantity,
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Cart);

import React from "react";
import { connect } from "react-redux";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";

class Cart extends React.Component {
  state = {
    cartData: [],
    checkOutItem: [],
    cond: false,
    ongkosKirim: 0,
    totalPrice: 0,
  };
  componentDidMount() {
    this.addCart();
  }

  addCart = () => {
    console.log();
    // Axios.get(`${API_URL}/cart`,{
    //   params:{
    //             userId: this.props.user.id,
    //     _expand: "product",
    //   }
    // })
    // .then((res)=>{
    //   console.log(res.data)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
    // let hargaTotal = 0;
    // Axios.get(`${API_URL}/cart`, {
    //   params: {
    //     userId: this.props.user.id,
    //     _expand: "product",
    //   },
    // })
    //   .then((res) => {
    //     this.setState({ cartData: res.data });
    //     console.log(this.state.cartData);
    //     this.state.cartData.map((val) => {
    //       hargaTotal += val.quantity * val.product.price;
    //     });
    //     this.setState({
    //       totalPrice: hargaTotal,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  renderCart = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, price, image } = product;
      return (
        <tr key={`cartData-${id}`}>
          <td>{idx + 1}</td>
          <td>{productName}</td>
          <td>
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </td>
          <td>{quantity}</td>
          <td>
            <img src={image} width="80" />
          </td>

          <td>
            <ButtonUI onClick={() => this.deleteCartHandlerHandler(id)}>
              Delete{" "}
            </ButtonUI>
          </td>
        </tr>
      );
    });
  };

  cartTransactio = () => {
    this.setState({
      cond: true,
    });
  };

  inputHandler = (e, field) => {
    let { value } = e.target;
    this.setState({
      [field]: value,
    });
  };

  renderTraksaksi = () => {
    return this.state.cartData.map((val, idx) => {
      const { quantity, product, id } = val;
      const { productName, price, image } = product;
      return (
        <tr key={`cartData-${id}`}>
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
            <img src={image} width="80" />
          </td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(quantity * price + +this.state.ongkosKirim)}
          </td>
        </tr>
      );
    });
  };

  confirmToPay = () => {
    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: this.props.user.id,
        _expand: "product",
      },
    })
      .then((res) => {
        res.data.map((val) => {
          Axios.delete(`${API_URL}/cart/${val.id}`)
            .then((res) => {
              console.log(res);
              swal("Success", "Transaksi anda berhasil", "success");
              this.getCartData();
            })
            .catch((err) => {
              console.log(err);
            });
        });
        Axios.post(`${API_URL}/transactions`, this.state.transactionDetails)
          .then((res) => {
            this.state.cartData.map((val) => {
              Axios.post(`${API_URL}/transactionDetails`, {
                productId: val.product.id,
                transactionsId: res.data.id,
                price: val.product.price,
                totalPrice: val.product.price * val.quantity,
                quantity: val.quantity,
              })
                .then((res) => {
                  console.log(res);
                })
                .then((err) => {
                  console.log(err);
                });
            });
          })
          .then((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteCartHandler = (id) => {
    Axios.get(`${API_URL}/cart/${id}`)
      .then((res) => {
        Axios.delete(`${API_URL}/cart/${id}`)
          .then((res) => {
            console.log(res.data);
            alert("sudah terhapus");
            this.addCart();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container py-4">
        {this.state.cartData.length > 0 ? (
          <>
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderCart()}</tbody>
            </Table>
            <div className="col-12 mt-3">
              <select
                value={this.state.ongkosKirim}
                className="custom-text-input h-100 pl-3"
                onChange={(e) => this.inputHandler(e, "ongkosKirim")}
              >
                <option value="0">Economy</option>
                <option value="100000">instant</option>
                <option value="50000">Sameday</option>
                <option value="20000">Express</option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <ButtonUI onClick={this.cartTransactio}>CheckOut</ButtonUI>
            </div>
            {!this.state.cond ? null : (
              <>
                <h4>Konfirmasi Total Pembelian Anda</h4>
                <Table style={{ marginTop: "10px" }}>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Image</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderTraksaksi()}</tbody>
                </Table>
                <div className="d-flex flex-column">
                  <center>
                    <ButtonUI onClick={this.confirmToPay} type="outlined">
                      Confirm To Pay
                    </ButtonUI>
                  </center>
                </div>
              </>
            )}
          </>
        ) : (
          <Alert>
            Your Cart is Empty!<Link to="/">Go Shopping</Link>
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
