import ProductPage from "@/components/productpage";
import { Footer } from "@/components/footer";
import ProductGrid from "@/components/productgrid";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <ProductGrid />
      <Footer />
    </div>
  );
}