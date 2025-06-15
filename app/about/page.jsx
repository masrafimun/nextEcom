import NewsLetter from "../../components/NewsLetter";
import { assets } from "../../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">ABOUT
               <span className="font-medium text-gray-700">US</span>{" "}
           </p>
           <p className="w-8 sm:h-[2px] bg-gray-700"></p>
         </div>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={'./about_img.png'}
          alt=""
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Mash shop a seamless shopping experience with our wide range of
            high-quality products at unbeatable prices. Shop with confidence and
            enjoy fast delivery, secure payments, and exceptional customer
            support!
          </p>
          <p>
            From trendy fashion to cutting-edge gadgets, we bring you the best
            deals every day. Elevate your shopping experience with convenience,
            reliability, and exclusive offers
          </p>

          <b>Our Mission</b>

          <p>
            Our mission is to provide a seamless, affordable, and
            customer-centric shopping experience with quality products and
            exceptional service.
          </p>
        </div>
      </div>

      <div className="text-xl py-4 ">
         <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">WHY
               <span className="font-medium text-gray-700">CHOOSE US</span>{" "}
           </p>
           <p className="w-8 sm:h-[2px] bg-gray-700"></p>
         </div>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border text-gray-600  px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p>
            Choose us for unbeatable prices, top-quality products, fast
            delivery, and exceptional customer support—because you deserve the
            best!
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 text-gray-600  flex flex-col gap-5">
          <b>Convenience</b>
          <p>
            Shop anytime, anywhere with our easy-to-use platform and hassle-free
            shopping experience.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 text-gray-600 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p>
            Our dedicated support team is always here to assist you with fast,
            friendly, and reliable service.
          </p>
        </div>
      </div>

      <NewsLetter/>
    </div>
  );
};

export default About;