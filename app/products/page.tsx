import ProductPage from "@/components/productpage";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <ProductPage />
      <Footer />
    </div>
  );
}