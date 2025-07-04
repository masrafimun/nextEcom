"use client"
import React, { useState } from "react";
import { assets, CartIcon} from "../assets/assets";
import Link from "next/link"
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
const Navbar = () => {

  const { getCartCount,setShowSearch, router,token,setToken } = useAppContext();
  const [visible,setVisible] =useState(false)
   const logout = () =>{
     localStorage.removeItem('token')
     setToken('')
     router.push('/login')
    }

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image className="cursor-pointer" onClick={() => router.push('/')}
        src="/my-logo.png"
        alt="logo"
        width={50}    
        height={30}  
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition">
          Contact
        </Link>


      </div>

      <div className='flex items-center gap-6' >
               <img onClick={() =>setShowSearch(true)} className='w-5 cursor-pointer' src={'./search_icon.png'} alt="" />

               <div className='group relative'>
               <img onClick={()=> token ? null : router.push('/login')} src={'./profile_icon.png'} className='w-5 cursor-pointer' alt="" />

                  {/* dropdown menu  */}
                  {
                    token &&  <div className='group-hover:block hidden z-40 absolute dropdown_menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className=' cursor-pointer hover:text-black'>My Profile</p>
                        <p onClick={() => router.push("/my-orders")} className=' cursor-pointer hover:text-black'>Orders</p>
                        <p onClick={()=>logout()} className=' cursor-pointer hover:text-black'>Logout</p>
                    </div>
                  </div>
                  }
                 
               </div>

                <Link href='/cart' className='relative'>
                       <img src={'./cart_icon.svg'} className='w-5 min-w-5' alt="" />
                       <p className='absolute bottom-[-25%] leading-4 bg-black text-white w-4 text-[8px] rounded-full text-center  right-[-25%] '>{getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={'./menu_icon.png' } className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>

       <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-slate-100  z-50 transition-all ${ visible ? 'w-full' : 'w-0' }`}>
                <div className='flex flex-col text-gray-600'>

                    <div onClick={() => setVisible(false)} className='flex cursor-pointer items-center gap-4 p-3'>
                        {/* <img className='h-4 rotate-180' src={'./'} alt="somet" /> */}
                        <p className= ' px-3'>Back</p>
                    </div>

                    <Link onClick={() => setVisible(false)}  className='py-2 text-black  pl-6 border-b' href='/'>HOME</Link>
                    <Link onClick={() => setVisible(false)}  className='py-2 text-black   pl-6 border-b' href='/all-products'>SHOP</Link>
                    <Link onClick={() => setVisible(false)}  className='py-2 text-black   pl-6 border-b' href='/about'>ABOUT</Link>
                    <Link onClick={() => setVisible(false)}  className='py-2 text-black   pl-6 border-b' href='/contact'>CONTACT</Link>                    
                </div>
       </div>
    </nav>
  );
};

export default Navbar;