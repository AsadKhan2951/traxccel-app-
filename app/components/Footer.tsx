import Link from 'next/link';
import Image from 'next/image'
import mainLogo from '../assets/Images/main-logo.png';
import socialLink from '../assets/Images/social-link-footer.png';
import BlurText from './AnimationComponent/BlurText';

const nav = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solution' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Contacts', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
     <div className="container">
        <div className="footer-top">
          <BlurText as="p" split="chars" stagger={12} blurAmount={10} yOffset={5} duration={1000}>Get in Touch</BlurText>
          <BlurText as="h1" split="words" stagger={40} blurAmount={14} yOffset={18} duration={800}>Consult  with Traxccel</BlurText>
          <a href="/contact">Contact Us</a>
        </div>
        <div className="footer-bottom">
          <Link href="/" className="">
            <Image 
              src={mainLogo}
              className="main-footer-logo"
              alt="Picture of the author"
            />
          </Link>
          <nav>
            <ul>
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="">
                  {n.label}
                </Link>
              ))}
            </ul>
          </nav>
          <Image 
            src={socialLink}
            className="social-footer-link"
            alt="Social Links"
          />
        </div>
        <div className="footer-copy-right">
          <ul>
            <li>2025 Traxccel. All rights reserved</li>
            <li>Privacy Policy</li>
            <li>Terms of service</li>
            <li>Cookie Settings</li>
          </ul>
        </div>
     </div>
    </footer>
  );
}
