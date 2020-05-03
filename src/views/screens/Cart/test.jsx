// import React from "react";
// import { connect } from "react-redux";
// import "./Cart.css";
// import Axios from "axios";
// import { API_URL } from "../../../constants/API";
// import ButtonUI from "../../components/Button/Button";
// import { Table, Alert } from "reactstrap";
// import { Link } from "react-router-dom";
// import TextField from "../../components/TextField/TextField";
// import swal from "sweetalert";
// class Cart extends React.Component {
//   state = {
//     cartData: [],
//     kondisiTransaksi: false,
//     totalPrice: 0,
//   };
//   componentDidMount() {
//     this.addCart();
//   }

//   addCart = () => {
//     let hargaTotal = 0;
//     Axios.get(`${API_URL}/cart`, {
//       params: {
//         userId: this.props.user.id,
//         _expand: "product",
//       },
//     })
//       .then((res) => {
//         this.setState({ cartData: res.data });
//         console.log(this.state.cartData);
//         this.state.cartData.map((val) => {
//           hargaTotal += val.quantity * val.product.price;
//         });
//         this.setState({
//           totalPrice: hargaTotal,
//         });
//       })
//       .catch((err) => {
//         alert("error");
//         console.log(err);
//       });
//   };

//   renderCart = () => {
//     return this.state.cartData.map((val, idx) => {
//       const { quantity, product, id } = val;
//       const { productName, price, image } = product;
//       return (
//         <tr key={`cartData-${id}`}>
//           <td>{idx + 1}</td>
//           <td>{productName}</td>
//           <td>{price}</td>
//           <td>{quantity}</td>
//           <td>
//             <img src={image} width="80" />
//           </td>
//           <td>
//             <ButtonUI
//               onClick={() => this.deleteCart(id)}
//               style={{ backgroundColor: "red" }}
//             >
//               Delete
//             </ButtonUI>
//           </td>
//         </tr>
//       );
//     });
//   };

//   transaksiCart = () => {
//     this.setState({
//       kondisiTransaksi: true,
//     });
//   };

//   renderTraksaksi = () => {
//     return this.state.cartData.map((val, idx) => {
//       const { quantity, product, id } = val;
//       const { productName, price, image } = product;
//       return (
//         <tr key={`cartData-${id}`}>
//           <td>{idx + 1}</td>
//           <td>{productName}</td>
//           <td>{price}</td>
//           <td>{quantity}</td>
//           <td>
//             <img src={image} width="80" />
//           </td>
//           <td>{quantity * price}</td>
//         </tr>
//       );
//     });
//   };

//   confirmTransaksi = () => {
//     const { totalPrice, cartData } = this.state;
//     const dataTransaksi = {
//       userId: this.props.user.id,
//       totalPrice,
//       status: "pending",
//       items: cartData.map((val) => {
//         return { ...val.product, quantity: val.quantity };
//       }),
//     };
//     Axios.post(`${API_URL}/transactions`, dataTransaksi)
//       .then((res) => {
//         this.state.cartData.map((val) => {
//           Axios.delete(`${API_URL}/cart/${val.id}`)
//             .then((res) => {
//               console.log("berhasil belanja");
//               swal("Nuhun!", "Your Transactions Has Been Completed", "success");
//               this.addCart();
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         alert("error");
//       });
//   };
//   deleteCart = (id) => {
//     Axios.get(`${API_URL}/cart/${id}`)
//       .then((res) => {
//         Axios.delete(`${API_URL}/cart/${id}`)
//           .then((res) => {
//             console.log(res.data);
//             alert("sudah terhapus");
//             this.addCart();
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   render() {
//     return (
//       <div className="container py-4">
//         {this.state.cartData.length > 0 ? (
//           <>
//             <Table>
//               <thead>
//                 <tr>
//                   <th>No.</th>
//                   <th>Product Name</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Image</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>{this.renderCart()}</tbody>
//             </Table>
//             <div className="d-flex justify-content-center">
//               <ButtonUI onClick={this.transaksiCart}>Transaction</ButtonUI>
//             </div>
//             {!this.state.kondisiTransaksi ? null : (
//               <>
//                 <h4>Konfirmasi Total Pembelian Anda</h4>
//                 <Table style={{ marginTop: "10px" }}>
//                   <thead>
//                     <tr>
//                       <th>No.</th>
//                       <th>Product Name</th>
//                       <th>Price</th>
//                       <th>Quantity</th>
//                       <th>Image</th>
//                       <th>Total Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>{this.renderTraksaksi()}</tbody>
//                 </Table>
//                 <div className="d-flex flex-column">
//                   <center>
//                     <h4 className="mb-4">
//                       Total Belanja Anda Adalah: {this.state.totalPrice}
//                     </h4>
//                     <ButtonUI onClick={this.confirmTransaksi} type="outlined">
//                       Confirm
//                     </ButtonUI>
//                   </center>
//                 </div>
//               </>
//             )}
//           </>
//         ) : (
//           <Alert>
//             Your Cart is Empty!<Link to="/">Go Shopping</Link>
//           </Alert>
//         )}
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
import "./Cart.css";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";
import { Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";

class Cart extends React.Component {
  state = {
    delete: false,
    productCart: [],
    showProductDetails: false,
    transactionDetails: {
      userId: 0,
      totalPrice: 0,
      paymentStatus: "pending",
      products: [],
    },
  };

  getProductCart = () => {
    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: this.props.user.id,
        // http://localhost:3001/cart?_expand=product&_expand=user
        _expand: "product",
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({ productCart: res.data });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getProductCart();
  }

  renderProductCart = () => {
    return this.state.productCart.map((value, index) => {
      const { id, quantity, product } = value;
      return (
        <>
          <tr>
            <td> {product.productName} </td>
            <td>
              <img style={{ height: "100px" }} src={product.image} alt="" />
            </td>
            <td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(product.price)}
            </td>
            <td> {quantity} </td>
            <td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(product.price * quantity)}
            </td>
            <td>
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ fontSize: 20 }}
                onClick={() => this.deleteProductCart(id, index)}
              />
            </td>
          </tr>
        </>
      );
    });
  };
  deleteProductCart = (productCartId, index) => {
    Axios.delete(`${API_URL}/cart/${productCartId}`)
      .then((res) => {
        console.log(res);
        swal(
          "Success",
          "The product has been deleted from your cart",
          "success"
        );
        // Tapi ini kita nge set state
        this.getProductCart();
        // Supaya dia ngerender ulang kita juga ubah statenya
        // let tempProductCart = this.state.productCart;
        // console.log(tempProductCart);
        // tempProductCart.splice(index, 1);
        // this.setState({ productCart: tempProductCart });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  showTransactionDetails = () => {
    // Untuk nampung sementara semua product di 1 user ID
    let tempProduct = [];
    let totalPrice = 0;
    this.state.productCart.map((value) => {
      tempProduct.push({ ...value.product, quantity: value.quantity });
      totalPrice += value.product.price * value.quantity;
    });
    this.setState({
      showProductDetails: true,
      transactionDetails: {
        ...this.state.transactionDetails,
        userId: this.props.user.id,
        totalPrice,
        // paymentStatus
        products: tempProduct,
      },
    });
  };
  cancelPayment = () => {
    this.setState({
      showProductDetails: false,
    });
  };
  renderTransactionDetails = () => {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div>
          <h3 className="m-5"> Order Summary </h3>
          <p>
            Full Name <TextField value={this.props.user.fullName} />
            <br />
            Address
            <TextField
              value={
                this.state.transactionDetails.userId + " ini isinya user ID"
              }
            />
            <br />
            Total Price
            <TextField
              className="mb-3"
              value={new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(this.state.transactionDetails.totalPrice)}
            />
            <h6> Product List </h6>
            <Table>
              <thead>
                <tr>
                  <td> Product ID </td>
                  <td> Product Name </td>
                  <td> Product Category </td>
                  <td> Product Price </td>
                </tr>
              </thead>
              <tbody>
                {this.state.transactionDetails.products.map((value) => {
                  return (
                    <tr>
                      <td>{value.id}</td>
                      <td>{value.productName}</td>
                      <td>{value.category}</td>
                      <td>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(value.price)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </p>
          <div className=" mt-4 d-flex justify-content-end">
            <ButtonUI
              onClick={this.cancelPayment}
              type="outlined"
              className="mr-2"
            >
              Cancel
            </ButtonUI>
            <ButtonUI onClick={this.confirmPayment}> Confirm </ButtonUI>
          </div>
        </div>
      </div>
    );
  };
  confirmPayment = () => {
    Axios.post(`${API_URL}/transactions`, this.state.transactionDetails)
      .then((res) => {
        swal("Thank you", "For shopping with us", "success");
      })
      .catch((err) => {
        console.log(err);
      });
    // Untuk kosongin cart
    this.state.productCart.map((value) => {
      return this.deleteProductCart(value.id);
    });
  };
  render() {
    if (this.state.productCart.length == 0) {
      return (
        <Alert className="m-5">
          Your cart is empty, go <Link to="/">shopping</Link> !
        </Alert>
      );
    }
    return (
      <div className="m-5 text-center">
        <h4 className="m-5"> Your Cart </h4>
        <div>
          <Table>
            <thead>
              <tr>
                <td colSpan={2}> Product </td>
                <td> Price </td>
                <td> Quantity </td>
                <td> Total </td>
                <td> </td>
              </tr>
            </thead>
            <tbody>{this.renderProductCart()}</tbody>
          </Table>
          <div className="d-flex justify-content-end">
            <ButtonUI type="contained" onClick={this.showTransactionDetails}>
              Check Out
            </ButtonUI>
          </div>
          {this.state.showProductDetails
            ? this.renderTransactionDetails()
            : null}
        </div>
      </div>
    );
  }
}
const MapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(MapStateToProps)(Cart);
