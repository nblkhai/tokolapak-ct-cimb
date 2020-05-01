import React from "react";
import { connect, shallowEqual } from "react-redux";
import "./ProductDetails.css";
import ButtonUI from "../../components/Button/Button";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import swal from "sweetalert";

class ProductDetails extends React.Component {
  state = {
    productData: {},
    productName: "",
    image: "",
    price: 0,
    desc: "",
    category: "",
    id: 0,
    quantity: 0,
  };

  addToCartHandler = () => {
    Axios.get(`${API_URL}/cart/`, {
      params: {
        userId: this.props.user.id,
        productId: this.state.productData.id,
      },
    })
      .then((res) => {
        if (res.data.length == 0) {
          Axios.post(`${API_URL}/cart`, {
            userId: this.props.user.id,
            productId: this.state.productData.id,
            quantity: 1,
          })
            .then((res) => {
              console.log(res.data);
              swal("Success", "Your item has been add to your cart", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Axios.patch(`${API_URL}/cart/${res.data[0].id}`, {
            ...this.state.productData,
            quantity: res.data[0].quantity + 1,
          })
            .then((res) => {
              console.log(res);
              swal("Success", "Your item has been add to your cart", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Ini buat tampilin product by ID http://localhost:3000/product/1 => nanti akan muncul product yang IDnya 1
  componentDidMount() {
    Axios.get(`${API_URL}/products/${this.props.match.params.productId}`)
      .then((res) => {
        this.setState({ productData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { productName, image, price, desc } = this.state.productData;
    return (
      <div className="container">
        <div className="row py-4">
          <div className="col-6 text-center">
            <img
              style={{ width: "100%", objectFit: "contain", height: "550px" }}
              src={image}
              alt=""
            ></img>
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h3>{productName}</h3>
            {/* Ini biar pricenya jd format IDR */}
            <h4>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}
            </h4>
            <p className="mt-4">{desc}</p>
            <div className="d-flex flex-row mt-4">
              <ButtonUI onClick={this.addToCartHandler}>Add To Cart</ButtonUI>
              <ButtonUI className="ml-4" type="outlined">
                Add To Wishlist
              </ButtonUI>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(ProductDetails);
