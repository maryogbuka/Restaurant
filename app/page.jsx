'use client';


import '../app/globals.css';
import { menuSections } from './data/menuSections';
import { useCart } from './context/CartContext';
import LandingPage from './home/landingPage';
import WhatWeOffer from './home/whatWeOffer';
import Footer from './components/footer';
import Card from './components/Card';


export default function Home() {
 


  return (

    <main id="top">
      <section>
      <LandingPage />
      <WhatWeOffer />
      <Card />

      </section>
    </main>
  );
}


      
