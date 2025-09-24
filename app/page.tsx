

import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import Pricingsection from "@/components/home/Pricingsection";





export default function Home() {

  return (
   <div>
    {/* <Sidebar/> */}
    <HeroSection/>
    <Pricingsection/>
    <div className="m-8 mt-15">
        <h1 className='text-pink-400 font-bold text-center text-4xl m-5'>Simple steps</h1>

    </div>
    <FeaturesSection/>

   </div>
  );
}
