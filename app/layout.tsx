import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProvider from './components/AnimationComponent/ScrollProvider';
import FancyCursor from './components/AnimationComponent/FancyCursor';
import SplashIntro from './components/AnimationComponent/SplashIntro';
import GlobalPolygonBG from './components/AnimationComponent/PolygonBg';
import polygonImg from './assets/Images/main-hero-bg-img.png';
import BgWebGL from './components/AnimationComponent/BgWebGL';
import LottieAnimation from './components/AnimationComponent/LottieAnimation';



const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Traccel App',
  description: 'Next.js starter with header, footer, and homepage.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="antialiased">
        {/* <BgWebGL /> */}
        {/* <LottieAnimation
          url="https://lottie.host/embed/4c253762-db2f-45d1-9fef-27e1e1a6cad4/oj1cEcpZuT.lottie"
        /> */}
        <GlobalPolygonBG src={polygonImg} rotateSpeed={5.5} pathPx={260} />
        <SplashIntro /> 
        <FancyCursor />
        <ScrollProvider />
        <Header />
        <main className="">{children}</main>
        <Footer />
        
      </body>
    </html>
  );
}
