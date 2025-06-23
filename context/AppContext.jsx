"use client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);



  //add to cart function
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    //to update in database
    if (token) {
      try {
        const response = await axios.post(
          "/api/cart/addToCart",
          { itemId, user },
          {}
        );
        toast.success(response.data.message);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  };

  //updating cart quantity
  const updateCartQuantity = async (itemId, quantity) => {
    let newQuantity = quantity
    let cartData = structuredClone(cartItems);
    setCartItems(cartData);
    if(token){
      try{
        await axios.post('/api/cart/update',{itemId,newQuantity,user},{})
        getUserCart()
      }
      catch(err){
        console.log(err)
        toast.error(err.message)
      }
    }
  };

  // gettomg total cart items
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  //get total cart ammount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
    //   console.log(itemInfo.price)
      if (cartItems[items] > 0 && itemInfo) {
        totalAmount += itemInfo.price * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  //all the product information
  const getProductData = async () => {
    try {
      const response = await axios.get("/api/product");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };


 //user cart
 const getUserCart =async(token) =>{
  try{
    const response = await axios.post('/api/cart/userCart',{user},{})
    if(response.data.success){
      setCartItems(response.data.cartItems)
    }
  }
  catch(err){
    toast.error(err.message)
  }
 }

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  //getting user information
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.id);
      } catch (error) {
        console.error("Failed to decode token", error.message);
      }
    }
  }, [token]);

  useEffect(()=>{
      getUserCart()
  },[user])
  useEffect(()=>{
      getCartAmount()
  },[userData])

 

  const value = {
    user,
    currency,
    router,
    userData,
    products,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    token,
    setToken,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

//  const response = await  axios.post('/api/auth/register',{name,email,password})
//                 if(response.data.success){