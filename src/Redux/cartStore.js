import { configureStore } from "@reduxjs/toolkit";
import productSlice from './slice/productSlice';
import wishListSlice from './slice/wishList';
import cartSlice from './slice/cartSlice';


const cartStore = configureStore({
    reducer:{
        productReducer:productSlice,
        wishlistReducer:wishListSlice,
        cartReducer:cartSlice

    }
})
export default cartStore