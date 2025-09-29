import Image from 'next/image'
import ExpandingSlider from './components/AnimationComponent/ExpandingSlider';
import PinnedTestimonials from "./components/AnimationComponent/TestimonialSlider";
import ServiceSection, { ServiceItem } from './components/AnimationComponent/ServiceSection';
import IndustriesSection from './components/AnimationComponent/IndustriesSection';
import nvidaLogo from './assets/Images/nvidia-logo.png';
import azureLogo from './assets/Images/azure-logo.png';
import informaticLogo from './assets/Images/informatic-logo.png';
import pathLogo from './assets/Images/path-logo.png';
import certificationLogo from './assets/Images/certification-logo.png';
import testimonialProfile from './assets/Images/testimonial-profile.png';
import Line1 from "./assets/Images/generated-svg-image.svg";
import servicePolygonImg from "./assets/Images/service-polygon.png";
import soluCardRightImg from "./assets/Images/solution-card-right-img.png";
import soluCardImg1 from "./assets/Images/solution-box-img-1.png";
import soluCardImg2 from "./assets/Images/solution-box-img-2.png";
import soluCardImg3 from "./assets/Images/solution-box-img-3.png";
import soluCardsubImg3 from "./assets/Images/solution-box-sub-img-3.png";
import PolygonLogo from "./assets/Images/polygon-card.svg";
import keyUpdateImg from "./assets/Images/key-update-img.png";
import SectionReveal from "./components/AnimationComponent/SectionReveal";
import BlurText from "./components/AnimationComponent/BlurText";
import BlurSlideBottomText from "./components/AnimationComponent/BlurSlideBottomText";


const testimonials = [
  { name: 'Janak Bhanushali', role: 'Founder & CEO', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet felis quis mi elementum auctor. Proin id nunc id ipsum luctus hendrerit a sed ipsum. Suspendisse neque tellus', photo: testimonialProfile },
  { name: 'Sara Malik', role: 'Product Lead', quote: 'ultrices in tempor quis, aliquet quis est. In hac habitasse platea dictumst. Cras mattis, lectus vel porta consectetur, sem lacus tincidunt elit, eget varius tellus libero eget ligula', photo: testimonialProfile },
  { name: 'Ibrahim Khan', role: 'Marketing Head', quote: 'Proin molestie quam id placerat auctor. Aliquam erat volutpat. Mauris imperdiet, dolor non dignissim malesuada, quam dolor condimentum ex, id dignissim eros nisi et nulla.', photo: testimonialProfile },
];
const services: ServiceItem[] = [
  { title: 'Strategy',      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
  { title: 'Platform',      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
  { title: 'Product',       description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
  { title: 'Organization',  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
  { title: 'Operate',       description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="main-hero">
        <div className="container">
          <div className="column">
            <BlurText as="h1" split="words" stagger={40} blurAmount={14} yOffset={18} duration={800}>
              <div>We envision modern</div>
              <div>data+AI value chain for</div>
              <div>operational efficiencies</div>
            </BlurText>
            <a href="/" className="main-hero-btn">
              <div className="dot"></div> Start Your Journey
            </a>
          </div>
        </div>
        <div className="sub-container">
          <ul className="trusted-box">
            <li>
              <BlurSlideBottomText><p>Trusted Partnerships Certifications</p></BlurSlideBottomText>
              <div className="under-line"></div>
              <ul className="partnership-box">
                  <li>
                    <Image
                      src={nvidaLogo}
                      className="trusted-logo"
                      alt={''}
                    />
                  </li>
                  <li>
                    <Image
                      src={azureLogo}
                      className="trusted-logo"
                      alt={''}
                    />
                  </li>
                  <li>
                    <Image
                      src={informaticLogo}
                      className="trusted-logo"
                      alt={''}
                    />
                  </li>
                  <li>
                    <Image
                      src={pathLogo}
                      className="trusted-logo"
                      alt={''}
                    />
                  </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="bottom-container">
          <BlurText as="h1" split="words" stagger={40} blurAmount={14} yOffset={18} duration={800}>key highlights about us</BlurText>
          <BlurText as="p" split="chars" stagger={12} blurAmount={10} yOffset={5} duration={2000}>We aspire to be the leading client-centric, people-first data, analytics, and cloud service provider</BlurText>
        </div>
      </section>

      {/* Accomplishments & Expertise */}
      <SectionReveal>
      <section className="accomplishment-sec">
        <div className="container">
          <BlurText as="h1" split="words" stagger={40} blurAmount={14} yOffset={18} duration={800}>Accomplishments & Expertise</BlurText>
          <BlurText as="p" split="chars" stagger={12} blurAmount={10} yOffset={5} duration={2000} className="para">Product-enabled delivery model expedites your project lifecycle with a core focus on efficiency and quality</BlurText>
          <ul>
            <li>
              <span>50%</span>
              <p>Lorem Ipsum</p>
            </li>
            <li>
              <span>50%</span>
              <p>Lorem Ipsum</p>
            </li>
            <li>
              <span>50%</span>
              <p>Lorem Ipsum</p>
            </li>
            <li>
              <span>50%</span>
              <p>Lorem Ipsum</p>
            </li>
          </ul>
        </div>
         {/* ... Carousel Slider ... */}
           <ExpandingSlider />
         {/* ...Carousel Slider... */}
         
         {/* <PinnedTestimonials
          certificationLogo={certificationLogo}
          testimonials={testimonials}
        />; */}

      </section>
      </SectionReveal>

      {/* Strategy, Implement, Operate */}
      <ServiceSection
        heading="Services"
        intro="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        stickyTitle={<><span>Strategy,</span><br/>Implement,<br/>Operate</>}
        services={services}
        polygonImage={servicePolygonImg}
        lineSvg={<Line1 width={800} height={800} />} 
      />
      {/* <section className="guiding-principles">
        <Image
          src={servicePolygonImg}
          className="service-polygon-bg"
          alt="Service Polygone Picture"
        />
        <div className="container">
          <div className="column">
            <h2 className="heading">Services</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>
          <div className="column">
            <h1 className="main-left-heading">
              Strategy, <br />
              Implement,<br />
              Operate</h1>
          </div>
          <div className="column">
            <div className="service-box">
              <h2 className="service-title">
                <div className="dot"></div>
                <div className="label">Strategy</div>
              </h2>
              <p className="service-para">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="service-box">
              <h2 className="service-title">
                <div className="dot"></div>
                <div className="label">Platform</div>
              </h2>
              <p className="service-para">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="service-box">
              <h2 className="service-title">
                <div className="dot"></div>
                <div className="label">Product</div>
              </h2>
              <p className="service-para">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="service-box">
              <h2 className="service-title">
                <div className="dot"></div>
                <div className="label">Organization</div>
              </h2>
              <p className="service-para">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="service-box">
              <h2 className="service-title">
                <div className="dot"></div>
                <div className="label">Operate</div>
              </h2>
              <p className="service-para">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
        <div className="background">
         <Line1 width={50} height={50} />
        </div>
      </section> */}

      {/* Solutions & Offerings */}
      <section className="solution-offering">
        <div className="container">
          <div className="column">
            <h1 className="solu-offer-title">Solutions & Offerings</h1>
            <p className="solu-offer-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>

            <div className="solu-gradient-box">
              <div className="o-rimlight"></div>
               <span className="solu-hex" aria-hidden="true" />
              <Image 
                src={soluCardRightImg}
                className="solu-card-right-img"
                alt="Solution Card Right Image"
              />
              <h3 className="solu-card-main-title">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h3>
              <div className="solu-main-card-img">
                <Image 
                  src={soluCardImg1}
                  className="solu-card-img"
                  alt="Solution Card Image"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="solu-gradient-box-2">
              <div className="o-rimlight"></div>
              <div className="solu-card-title-wrapper">
                <h3 className="solu-card-main-title-2">Lorem Ipsum</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
              </div>
              <div className="solu-main-card-img-2">
                <Image 
                  src={soluCardImg2}
                  className="solu-card-img-2"
                  alt="Solution Card Image"
                />
              </div>
            </div>
            <div className="solu-gradient-box-3">
              <div className="o-rimlight"></div>
              <Image 
                src={soluCardRightImg}
                className="solu-card-right-img-3"
                alt="Solution Card Right Image"
              />
              <h3 className="solu-card-main--3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h3>
              <div className="solu-main-card-img-3">
                <Image 
                  src={soluCardImg3}
                  className="solu-card-img-3"
                  alt="Solution Card Image"
                />
              </div>
              <Image
                src={soluCardsubImg3}
                className="solu-card-sub-img-3"
                alt="Solution Card Sub Img 3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <IndustriesSection />
      {/* <section className="industries">
        <div className="container">
          <h1>Industries We Serve</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> 
          <div className="inuds-polygon-wrapper">
            <div className="industrie-polygon-wrapper">
            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Oil Gas</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>
            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Powerful & Utilities</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>
            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Mining & Minerals</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>
          </div>
          <div className="industrie-polygon-wrapper">
            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Manufacturing</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>
            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Chemicals</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>
          </div>
          <div className="industrie-polygon-wrapper">
            <div className="industrie-polygon-box">
              <button>
                <label className="indus-box">Renewables</label>
                <i className="indus-plus">+</i>
                <PolygonLogo />
              </button>
              <div className="hover"></div>
            </div>
          </div>
          </div>
          <div className="update-box-wrapper">
          <div className="column">
            <Image
              src={keyUpdateImg}
              className="key-update-img"
              alt="Key Update Img"
            />
          </div>
          <div className="column">
            <h2>key Updates/ highlights</h2>
            <div className="update-box-head-tag">
              <div className="dot"></div>
              <label>Lorem Ipsum</label>
            </div>
            <p className="update-box-head-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <a href="/" className="update-box-btn">
              <div className="dot"></div> 
              Start Your Journey
            </a>
          </div>
        </div>
        </div>
      </section> */}
    </>
  );
}
