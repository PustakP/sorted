import ProductPage from "@/components/productpage";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar2";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      < Navbar />
      <ProductPage />
      <Footer />
    </div>
  );
}