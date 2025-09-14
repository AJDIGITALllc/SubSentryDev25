import TopNav from "@/components/marketing/TopNav";
import Hero from "@/components/marketing/Hero";
import MethodologyPricing from "@/components/marketing/MethodologyPricing";
import Footer from "@/components/marketing/Footer";

export default function Marketing() {
  return (
    <div className="min-h-screen bg-slate-900">
      <TopNav />
      <main>
        <Hero />
        <MethodologyPricing />
      </main>
      <Footer />
    </div>
  );
}