

import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import Pricingsection from "@/components/home/Pricingsection";





export default function Home() {

  return (
   <div>
    {/* <Sidebar/> */}
    <HeroSection/>
    <Pricingsection/>
    <FeaturesSection/>

   </div>
  );
}
