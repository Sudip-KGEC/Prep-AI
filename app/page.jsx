import Companies from "@/components/landingPage-sections/Companies";
import Cta from "@/components/landingPage-sections/Cta";
import Features from "@/components/landingPage-sections/Features";
import Hero from "@/components/landingPage-sections/Hero";
import Pricing from "@/components/landingPage-sections/Pricing";
import Roles from "@/components/landingPage-sections/Roles";


export default function Home() {
  return (
     <div className=" bg-black overflow-x-hidden ">
      {/* Hero */}
      <Hero/>
      {/* Companies logos */}
      <Companies/>
      {/* Features */}
      <Features/>
      {/* Roles  */}
      <Roles/>

      {/* Pricing */}
      <Pricing/>
      {/* CTA */}
      <Cta/>
       
     </div>
  );
}
