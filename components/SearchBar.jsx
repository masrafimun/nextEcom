"use client"
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { usePathname } from "next/navigation";

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch} = useAppContext()
    const [visible,setvisible] =useState(false)
    const pathName = usePathname()

    useEffect(() =>{
       if(pathName.includes('all-products')){
        setvisible(true)
       }
       else{
        setvisible(false)
       }
    },[pathName])



    return showSearch && visible ? (
        <div className="border-t border-b border-2 border-black bg-gray-50 text-center">
            <div className="inline-flex  items-center justify-center border border-gray-400 px-5 my-5 rounded-full w-3/4 sm:w-1/2">
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 outline-none bg-inherit text-sm h-7" type="text" placeholder="Search" />
              <img onClick={()=> setShowSearch(false)} className=" w-4" src={'./cross_icon.png'} alt="" />
            </div>

            <img onClick={() =>setShowSearch(false)} className="inline w-3 ml-2 cursor-pointer" src={assets.cross_icon} alt="" />
        </div>
    ) : null
};

export default SearchBar;