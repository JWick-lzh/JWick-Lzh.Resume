import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: '首页', href: '#' },
    { label: '关于', href: '#about' },
    { label: '服务', href: '#services' },
    { label: '作品', href: '#works' },
    { label: '联系', href: '#contact' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Border line draw
      gsap.fromTo(
        '.footer-border',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Logo
      gsap.fromTo(
        '.footer-logo',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.2,
        }
      );

      // Nav links
      gsap.fromTo(
        '.footer-nav-link',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.3,
        }
      );

      // Copyright
      gsap.fromTo(
        '.footer-copyright',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.6,
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-black py-12">
      {/* Top Border */}
      <div className="footer-border absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="footer-logo">
            <a href="#" className="text-2xl font-bold text-white hover:text-[var(--lime)] transition-colors">
              林灶辉
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="footer-nav-link text-white/60 hover:text-[var(--lime)] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--lime)] group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="footer-copyright text-white/40 text-sm flex items-center gap-1">
            <span>© 2024 林灶辉. Made with</span>
            <Heart className="w-4 h-4 text-[var(--lime)] fill-[var(--lime)]" />
            <span>in Shenzhen</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
