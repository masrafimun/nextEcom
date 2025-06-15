'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "../../context/AppContext";

import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import axios from "axios";

const MyOrders = () => {

    const {user, currency,token ,router} = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadOrderData = async () =>{
        if(!token){
            return null
        }
        else{
    
               try{
                  const response = await axios.post('/api/userOrder',{user}, {})
                  if(response.data.success)
                    {
                       
                        let allOrdersItem  = []
                        response.data.orders.map((order) =>{
                            order.items.map((item) => {
                                item['status'] = order.status
                                item['pament'] = order.pament
                                item['paymentMethod'] = order.paymentMethod
                                item['date'] = order.date

                                allOrdersItem.push(item)
                            })
                        })
                     setOrders(allOrdersItem.reverse())

                    }
                  else{
                    console.log("something went wrong")
                  }
               }
               catch(err){
                  toast.error(err.message)
               }
               finally {
             setLoading(false);
         }
        }
        }

          useEffect(()=>{
                 loadOrderData() 
        },[token,user])

     
    

    return (
        <>
       
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {loading ? <Loading /> : (<div className="max-w-5xl border-t border-gray-300 text-sm">
                        {
                            orders.map((item,index) => (
                        <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-start gap-6 text-sm">
                                <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
                                <div>
                                    <p className="text-base font-medium">{item.name}</p>
                                    <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                                        <p className="text-lg">{currency}{item.price}</p>
                                        <p>Quantity : {item.quantity}</p>
                                        <p>Size : {item.size}</p>
                                    </div>
                                    <p>Date: <span className=" mt-1 text-gray-400" >{new Date(item.date).toDateString()}</span></p>
                                    <p>Payment : <span className=" mt-1 text-gray-400" >{item.paymentMethod}</span></p>
                                </div>
                            </div>

                            <div className="md:w-1/2 flex justify-between">
                                <div className="flex items-center gap-2">
                                     <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                     <p className="text-sm md:text-base">{item.status}</p>
                                 </div>
                                 <button    onClick={() => window.location.reload()} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
                            </div>
                            
                        </div>)
                    )
                        }
                    </div>)}
                </div>
            </div>
        </>
    );
};

export default MyOrders;
