import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addToWishList } from '../Redux/slice/wishList';
import { addToCart } from '../Redux/slice/cartSlice';


function View() {
  const {id} = useParams(); // useParams() is import from react-router-dom it is used to select the parameter or id
  // console.log(id);
  const {loading}=useSelector((state)=>state.productReducer)
  const [product,setProduct]=useState({})
  const {wishlist}=useSelector((state)=>state.wishlistReducer)
  const cart=useSelector((state)=>state.cartReducer)
  const dispatch=useDispatch()
  

  useEffect(()=>{
    const products = JSON.parse(localStorage.getItem("products"))
    setProduct(products?.find(product=>product?.id==id))
    
  },[])
  // console.log(product);

  const handleWishlist=(product)=>{
    const existingProduct = wishlist.find(item=>item?.id==product?.id);
    if(existingProduct){
      alert("Product already exist in wishlist");
    }
    else{
      dispatch(addToWishList(product))
    }
  }

  const handleCart=(product)=>{
    const existingProduct = cart?.find(item=>item.id==product.id);
    if(existingProduct){
      dispatch(addToCart(product))
      alert("items added");
    }
    else{
      dispatch(addToCart(product))
      alert("Product added to Cart")
    }
  }

  
  
  return (
    <>
    {
      loading? 
        <div className="text-center mt-5">
        <Spinner animation='border' variant="waring"></Spinner>
        </div>
      :(
        <div className="container row" style={{ marginTop: "100px" }}>
  <div className="col-lg-4 col-md-6 col-12 mb-3">
    <img className="img-fluid" style={{ height: "400px", objectFit: "cover" }} src={product.thumbnail} alt="" />
  </div>
  <div className="col-lg-2 d-none d-lg-block"></div>
  <div className="col-lg-6 col-md-6 col-12 mt-5">
    <p>Pid : {product.id}</p>
    <h1>{product.title}</h1>
    <h5 className='fw-bolder'>Price : <span style={{ color: "red" }}>{product.price}</span></h5>
    <p>{product.description}</p>
    <div className="d-flex justify-content-between mt-4">
      <Button className='btn btn-outline-dark' onClick={() => handleWishlist(product)}>
        <i className="fa-solid fa-heart text-danger"></i> Wishlist
      </Button>
      <Button className='btn btn-outline-light' onClick={() => handleCart(product)}>
        <i className="fa-solid fa-cart-shopping text-warning"></i>
      </Button>
    </div>
  </div>
</div>

      )
    }
      
    </>
  )
}

export default View
