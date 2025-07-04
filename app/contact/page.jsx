import { assets } from "../../assets/assets";
import NewsLetter from "../../components/NewsLetter";

const Contact = () => {
    return (
       <div>
           <div className="text-center text-2xl pt-10 border-t">
              <div className="inline-flex gap-2 items-center mb-3">
                  <p className="text-gray-500">CONTACT<span className="font-medium text-gray-700">US</span> </p>
                  <p className="w-8 sm:h-[2px] bg-gray-700"></p>
              </div>
            </div>

            <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
                <img className="w-full px-6 sm:px-0 sm:mx-0 md:max-w-[480px]" src={'./contact_img.png'} alt="" />
                <div className="flex px-6 sm:px-0  flex-col justify-center items-start gap-6">
                    <p className="font-semibold text-xl text-gray-600">Our Store</p>
                    <p className="text-gray-500">Banani,Dhaka</p>
                    <p className="text-gray-500">Tel : (+088) 00000000 <br /> Email : Mashshop@gmail.com </p>
                    <p className="font-semibold text-xl text-gray-600">Careers at Mashshop</p>
                    <p className="text-gray-500">Learn more about our team and job openings</p>
                    <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
                    <p></p>
                </div>
            </div>
            <NewsLetter/>
       </div>
    );
};

export default Contact;