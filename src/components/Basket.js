import React, { Component } from "react";
import utils from "../utils";

class Basket extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <>
        {cartItems.length === 0 ? (
          "Empty cart"
        ) : (
          <div>you have {cartItems.length} in your cart</div>
        )}

        {cartItems.length > 0 && (
          <div>
            {cartItems.map(item => (
              <div key={item.id}>
                <li>
                  {item.title} X {item.count} ={" "}
                  {utils.formatCurrency(item.price * item.count)}
                </li>
                <button
                  onClick={e => {
                    this.props.handleRemoveItems(e, item);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            <p>Total:</p>
            {utils.formatCurrency(
              cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
            <button>Checkout</button>
          </div>
        )}
      </>
    );
  }
}
export default Basket;
