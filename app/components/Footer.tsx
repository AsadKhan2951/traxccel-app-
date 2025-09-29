import Link from 'next/link';
import Image from 'next/image'
import mainLogo from '../assets/Images/main-logo.png';
import socialLink from '../assets/Images/social-link-footer.png';

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
          <p>Get in Touch</p>
          <h1>Consult  with Traxccel</h1>
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
