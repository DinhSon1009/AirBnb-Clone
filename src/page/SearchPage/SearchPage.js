import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Button } from "../../styles/customStyle";

export default function SearchPage() {
  return (
    <div className="">
      <Header />
      <main className="dscontainer flex pt-14 px-6">
        <section className="flex-grow">
          <p className="text-xs">300+ Stays for 5 numbers of guests</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in Mars</h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <Button> Cancellation Flexibility</Button>
            <Button> Type of Place</Button>
            <Button> Price</Button>
            <Button> Rooms and Beds</Button>
            <Button> More filters</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
