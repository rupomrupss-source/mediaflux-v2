/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Downloader } from './components/Downloader';
import { ToolCards } from './components/ToolCards';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';

export default function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-red-500/30 overflow-x-hidden">
        <SEO />
        <Header />
        
        <main className="relative flex flex-col items-center w-full grad-bg">
          <Hero />
          
          <div className="w-full relative z-10 -mt-4 pb-12 px-4 sm:px-6 lg:px-8">
            <Downloader />
          </div>
          
          <ToolCards />
          
          <FAQ />
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
