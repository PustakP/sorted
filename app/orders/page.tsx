import ProductPage from "@/components/productpage";
import { Footer } from "@/components/footer";
import Component from "@/components/bigorder2";
import { Navbar } from "@/components/navbar";
import Orderblock1 from "@/components/orderblock1";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="w-2/3 mx-auto">
        <Orderblock1 />
       <Component />
       </div>
      <Footer />
    </div>  
  );
}