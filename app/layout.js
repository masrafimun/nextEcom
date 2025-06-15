import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "../context/AppContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "QuickCart - GreatStack",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <AppContextProvider>
            <Navbar/>
            {children}
            <Footer/>
          </AppContextProvider>
          <ToastContainer />
        </body>
      </html>
  );
}
