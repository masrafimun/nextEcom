import { addressDummyData } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const OrderSummary = () => {

  const {user,products, setCartItems, currency,cartItems, router, getCartCount, getCartAmount } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);
    const [formData,setFormData] = useState({
        firstName : '',
        lastName : '',
        email : '',
        street : '',
        city : '',
        state : '',
        zipcode : '',
        country : '',
        phone : ''
    })

    //function to update formdata
    const onChangeHandler = (e) =>{
        const name = e.target.name
        const value = e.target.value

        setFormData(data => ({...data,[name] : value }))
    }

  const fetchUserAddresses = async () => {
    setUserAddresses(addressDummyData);
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
   router.push('./my-orders')
  }

  const onSubmitHandler = async (e) =>{
        e.preventDefault()
        
        try{
            let orderItems = []
            
            for(const items in cartItems){
                    if(cartItems[items]>0){
                        const itemInfo = structuredClone(products.find(product =>product._id ===items ))
                        if(itemInfo){
                            itemInfo.quantity = cartItems[items]
                            orderItems.push(itemInfo)
                        }
                    }
              }
            

            let orderData = {
                address : formData,
                items : orderItems,
                amount : getCartAmount(),
                userId : user
            }



            const response = await axios.post('/api/placeOrder',orderData,{})
            if(response.data.success){
                    setCartItems({})
                    router.push('./my-orders')
                    toast.success("Order Placed")
              }
              else{
                  toast.error(response.data.message)
              }

            }
        catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }

 


  useEffect(() => {
    fetchUserAddresses();
  }, [])

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div className="">
                <div className="flex gap-3 mb-3">
                   <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
                   <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
                </div>

                <input required onChange={onChangeHandler} name="email" value={formData.email}  className="border mb-3 border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />

                <input required onChange={onChangeHandler} name="street" value={formData.street} className="border mb-3 border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />

                <div className="flex gap-3 mb-3">
                   <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
                   <input required onChange={onChangeHandler} name="state" value={formData.state}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
                </div>

                <div className="flex gap-3 mb-3">
                   <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zip code" />
                   <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
                </div>

                <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border mb-3 border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">{currency}{getCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">{currency}{Math.floor(getCartAmount() * 0.02)}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>{currency}{getCartAmount() + Math.floor(getCartAmount() * 0.02)}</p>
          </div>
        </div>
      </div>

      <button onClick={(e) =>onSubmitHandler(e)}  type="submit" className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;