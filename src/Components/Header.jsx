import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { searchProduct } from '../Redux/slice/productSlice';



function Header({insideHome}) {
  const dispatch = useDispatch()
  const [wishlistCount,setWishlistCount]=useState(0);
  const [cartCount,setCardCount]=useState(0);
  const {wishlist}=useSelector((state)=>state.wishlistReducer)
  const cart=useSelector((state)=>state.cartReducer)

 useEffect(()=>{
  setWishlistCount(wishlist?.length)
  setCardCount(cart.length)
 },[wishlist,cart])


  return (
    <div>
       <Navbar expand="lg" className="bg-primary position-fixed top-0 w-100" style={{zIndex:1}}>
      <Container>
        <Navbar.Brand> <Link to={'/'} style={{color:"white",fontweight:"bold",textDecoration:"none"}}>
        <i class="fa-solid fa-truck-fast fa-bounce me-2"></i>E-Cart
        </Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
         {
          insideHome&&<Nav.Link>
          <input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} type="text" className='form-control me-5' placeholder='search products' style={{width:"250px",height:"30px"}}/>
  
            </Nav.Link>
         }

            <Nav.Link className='btn btn-outline-light mb-2'>
                <Link to={'/wishlist'} style={{color:"black",fontweight:"bold",textDecoration:'none'}}>
                <i class="fa-solid fa-heart text-danger me-2"></i>wishlist
                <Badge bg="success rounded ms-2">{wishlistCount}</Badge>
                </Link>
            </Nav.Link>

            <Nav.Link className='btn btn-outline-light ms-2 mb-2'>
                <Link to={'/cart'} style={{color:"black",fontweight:"bold",textDecoration:'none'}}>
                <i class="fa-solid fa-cart-shopping text-warning me-2"></i>Cart
                <Badge bg="success rounded ms-2">{cartCount}</Badge>
                </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header