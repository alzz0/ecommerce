import React, { Component } from "react";
import "../css/main.css";
import { filterProducts, sortProducts } from "../store/actions/productAction";

import { connect } from "react-redux";
class Filter extends Component {
  render() {
    return (
      <div className="filterContainer">
        <h3>{this.props.count} products found.</h3>

        <div>
         <label>Order by</label>
          <select
            className="select"
            value={this.props.sort}
            onChange={e =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="">Select</option>
            <option value="lowest">Lowest to Highest</option>
            <option value="highest">highest to Lowest</option>
          </select>
          
<label>Filter Size</label>
          <select
            className="select"
            value={this.props.size}
            onChange={e =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value="">ALL</option>
            <option value="x">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </select>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
    size: state.products.size,
    sort: state.products.sort
  };
};

export default connect(
  mapStateToProps,
  { sortProducts, filterProducts }
)(Filter);
