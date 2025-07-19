// app/page.tsx
import Hero from '@/components/custom/index/Hero';
import Services from '@/components/custom/index/Services';
import Contact from '@/components/custom/index/Contact';
import Blog from '@/components/custom/index/Blog';  
export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* Contact Section */}
      <Contact />

      {/* Blog Preview Section */}
     <Blog />
    </>
  );
}
