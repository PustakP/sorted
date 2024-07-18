import ProductPage from "@/components/productpage";
import { Footer } from "@/components/footer";
import Component from "@/components/bigorder2";
import { Navbar } from "@/components/navbar2";
import HeroSectionCentredWithImage from "@/components/hero1";
import IconSectionDescriptionOnLeftIconBlocksOnRight from "@/components/icon1";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
       <HeroSectionCentredWithImage />
       <IconSectionDescriptionOnLeftIconBlocksOnRight />
      <Footer />
    </div>
  );
}