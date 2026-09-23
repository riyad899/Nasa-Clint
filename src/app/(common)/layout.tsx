import Footer from "@/Components/HomeComponents/Footer/footer";
import Navbar from "@/Components/HomeComponents/Navbar/Navbar";
import { ComputerStoreSchema } from "@/Components/seo/JsonLd";
import Script from "next/script";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ComputerStore Schema — "computer shop near me" */}
      <ComputerStoreSchema />

      <Navbar />
      <main className="bg-[#f3f4f6]">{children}</main>
      <Footer />
    </div>
  );
}
