import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { emptyCart, removeFromCart } from '../Redux/slice/cartSlice'
import { Button } from 'react-bootstrap'


function Cart() {

  const dispatch=useDispatch()
  const cart=useSelector((state)=>state.cartReducer)
  const [total,setTotal]=useState(0);

  useEffect(()=>{
    if(cart?.length>0){
      setTotal(cart?.map(product=>product?.totalprice).reduce((p1,p2)=>p1+p2))
    }else{
      setTotal(0);
    }
  },[cart])
  

  
  
  return (
    <>
    <div className="container" style={{marginTop:"150px"}}>
     {
      cart?.length>0?
      <div className="row mt-5">
  <div className="col-lg-8 col-md-12">
    <table className='table shadow'>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Image</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          cart.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product?.title}</td>
              <td>
                <img 
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }} 
                  src={product?.thumbnail}  
                  alt="" 
                  className="img-fluid"
                />
              </td>
              <td>
                <input 
                  type="text" 
                  className='form-control text-center' 
                  value={product?.quantity} 
                  style={{ width: "50px" }}
                />
              </td>
              <td>${product?.totalprice}</td>
              <td>
                <Button 
                  className="btn" 
                  style={{ backgroundColor: "transparent" }} 
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  <i className="fa-solid fa-trash text-danger"></i>
                </Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>

    <div className="d-flex justify-content-between flex-wrap">
      <button 
        className='btn btn-danger mb-2' 
        onClick={() => dispatch(emptyCart())}
      >
        Empty Cart
      </button>
      <Link 
        to={'/'} 
        style={{ textDecoration: "none" }} 
        className='btn btn-outline-success mb-2'
      >
        Shop More
      </Link>
    </div>
  </div>
  
  <div className="col-lg-1 d-none d-lg-block"></div>
  
  <div className="col-lg-3 col-md-6 col-sm-12">
    <div className="container border rounded shadow mt-5 p-3 w-100">
      <h1>Cart Summary</h1>
      <h4>Total Products : {cart.length}</h4>
      <h5>Total : <span className='text-danger fw-bolder'>${total.toFixed(2)}</span></h5>
    </div>
    <div className="d-grid">
      <button className='btn btn-success m-3 rounded'>Checkout</button>
    </div>
  </div>
</div>

    :<div className="d-flex flex-column flex-md-row align-items-center mt-5 text-center text-md-left">
    <img 
      src="https://krosfitsports.com/public/empty-cart.gif" 
      alt="Empty Wishlist" 
      className="img-fluid mb-3 mb-md-0" 
      style={{ width: "100%", maxWidth: "400px" }}
    />
    <h1 className="text-danger ms-md-3">Your cart is Empty...</h1>
  </div>
     }
    </div>
    </>
  )
}

export default Cart
