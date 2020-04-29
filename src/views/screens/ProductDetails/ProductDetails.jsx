import React from "react";
import "./ProductDetails.css";
import ButtonUI from "../../components/Button/Button";

class ProductDetails extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row py-4">
          <div className="col-6 text-center">
            <img
              style={{ width: "100%", objectFit: "contain", height: "550px" }}
              src="https://ibox.co.id/media/wysiwyg/PromoOnline/web-banner---iphone-7-plus-rev.png"
              alt=""
            ></img>
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h3>Product Name</h3>
            <h4>Rp 150.000,00</h4>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
              impedit facilis nam vitae, accusamus doloribus alias repellendus
              veniam voluptates ad doloremque sequi est, at fugit pariatur
              quisquam ratione, earum sapiente.
            </p>
            <div className="d-flex flex-row mt-4">
              <ButtonUI>Add To Cart</ButtonUI>
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
export default ProductDetails;
