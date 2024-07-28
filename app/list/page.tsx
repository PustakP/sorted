"use client"

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar2";
import ProductUploadForm from "@/components/upload"

export default function uploadpage() {
    return(
        <>
        <Navbar />
        <div className="flex justify-center items-center">
          <div className="w-9/12 md:w-4/5">
            <ProductUploadForm />
          </div>
        </div>
        <Footer/>
        </>
    );

}