import React, { Component } from "react";
import {connect}from "react-redux"
import utils from "../utils";
import {fetchProducts} from "../store/actions/productAction"
class Products extends Component {
    
    componentDidMount(){
        this.props.fetchProducts()
        console.log(this.props.products)
    }
  render() {
    const productItems = this.props.products.map(items => {
      return (
        <div key={items.id}>
          <p>{items.title}</p>
          <a
            href="/"
            onClick={e => {
              this.props.handleAddToCart(e, items);
            }}
          >
            <img src={`/images/${items.sku}_2.jpg`} alt={items.title} />
          </a>

          <div>
            {utils.formatCurrency(items.price)}
            <button
              onClick={e => {
                this.props.handleAddToCart(e, items);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      );
    });
    return <div>{productItems}</div>;
  }
}

const mapStateToProps=state=>{
    return{
    products:state.products.filteredItems
}
}
export default connect(mapStateToProps,{fetchProducts})(Products);
