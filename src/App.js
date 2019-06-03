import React, { Component } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Basket from "./components/Basket";
import axios from "axios";
import "./css/main.css"

class App extends Component {
  state = {
    products: [],
    filteredProducts: [],
    sort: "",
      size:"",
      cartItems:[]
  };

  componentDidMount() {
    
      
      if(localStorage.getItem("cartItems")){
          this.setState({cartItems:JSON.parse(localStorage.getItem("cartItems"))})
      }
  }

  handleAddToCart = (e,product) => {
    this.setState(state=>{
        const cartItems=state.cartItems;
        let productAlreadyInCart=false;
        cartItems.forEach(item=>{
            if(item.id===product.id){
                productAlreadyInCart=true;
                item.count++
            }
        })
        if(!productAlreadyInCart){
            cartItems.push({...product,count:1})
        }
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
        return cartItems
    })
  };

  handleChangeSize = e => {
    this.setState({size:e.target.value})
      this.listProducts()
  };

  handleChangeSort = e => {
    this.setState({ sort: e.target.value });
    this.listProducts();
  };


  listProducts() {
    this.setState(state => {
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : a.price < b.price
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a.id < b.id ? 1 : -1));
      }
        if(state.size!==""){
          return { filteredProducts: state.products.filter(a => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0) };
        }
      return { filteredProducts: state.products };
    });
  }

handleRemoveItems=(e,item)=>{
   this.setState(state=>{
                  const cartItems = state.cartItems.filter(e=>e.id!==item.id)
                  localStorage.setItem("cartItems",cartItems)
       return {cartItems}
                 })
}

  render() {
    return (
      <div className="container">
        <h1>Super Awesome Store</h1>
        <hr/>
        <Filter
          size={this.state.size}
          sort={this.state.sort}
          handleChangeSize={this.handleChangeSize}
          handleChangeSort={this.handleChangeSort}
          count={this.state.filteredProducts.length}
        />
        <hr />
        <Products
          products={this.state.filteredProducts}
          handleAddToCart={this.handleAddToCart}
        />
        <Basket cartItems={this.state.cartItems} handleAddToCart={this.handleAddToCart} handleRemoveItems={this.handleRemoveItems}/>
      </div>
    );
  }
}

export default App;
