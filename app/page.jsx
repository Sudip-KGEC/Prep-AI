import Companies from "@/components/home/Companies";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";


export default function Home() {
  return (
     <div className=" bg-black overflow-x-hidden ">
      {/* Hero */}
      <Hero/>
      {/* Companies logos */}
      <Companies/>
      {/* Features */}
      <Features/>
       
     </div>
  );
}
