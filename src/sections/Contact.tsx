import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Github, MessageCircle, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: Mail, label: '邮箱', value: '851329609@qq.com' },
    { icon: Phone, label: '电话', value: '+86 152 1947 7743' },
    { icon: MapPin, label: '地址', value: '中国，深圳' },
  ];

  const socialLinks = [
    { icon: MessageCircle, label: '微信', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_5z2ialc',
        'template_4twenzo',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: '851329609@qq.com',
        },
        'Ak71M3P4cBnYSc80b'
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('邮件发送成功！感谢您的留言。');

      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('发送失败，请稍后重试或直接发送邮件至 851329609@qq.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.contact-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact info cascade
      gsap.fromTo(
        '.contact-info-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.2,
        }
      );

      // Social icons
      gsap.fromTo(
        '.social-icon',
        { scale: 0, rotate: -180 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.5,
        }
      );

      // Form
      gsap.fromTo(
        '.contact-form',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.3,
        }
      );

      // Form fields
      gsap.fromTo(
        '.form-field',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.5,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          },
        }}
      />
      <section
        ref={sectionRef}
        id="contact"
        className="relative py-24 sm:py-32 bg-black overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--lime)]/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">联系</span>
            <h2 className="contact-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              让我们创造精彩
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              有项目想法？让我们一起将其变为现实
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">联系方式</h3>

              {/* Contact Info Items */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="contact-info-item flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--lime)]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[var(--lime)]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-sm">{item.label}</div>
                      <div className="text-white font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <h3 className="text-xl font-bold text-white mb-4">社交媒体</h3>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="social-icon w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[var(--lime)]/20 hover:border-[var(--lime)]/50 hover:text-[var(--lime)] transition-all duration-300 hover:scale-110"
                    title={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="contact-form">
              <h3 className="text-xl font-bold text-white mb-6">发送消息</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-field">
                    <label className="block text-white/60 text-sm mb-2">姓名</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="您的姓名"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[var(--lime)] focus:ring-[var(--lime)]/20"
                    />
                  </div>
                  <div className="form-field">
                    <label className="block text-white/60 text-sm mb-2">邮箱</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[var(--lime)] focus:ring-[var(--lime)]/20"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-white/60 text-sm mb-2">主题</label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="消息主题"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[var(--lime)] focus:ring-[var(--lime)]/20"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-white/60 text-sm mb-2">留言</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="请输入您的消息..."
                    required
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[var(--lime)] focus:ring-[var(--lime)]/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-field w-full py-6 bg-[var(--lime)] text-black font-semibold hover:bg-[var(--lime)]/90 transition-all hover:scale-[1.02] glow-lime"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      发送中...
                    </span>
                  ) : submitted ? (
                    <span className="flex items-center gap-2">
                      发送成功!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      发送消息
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
