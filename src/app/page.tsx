import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";

export default function Home() {
  return (
    <main >
      <HeroSection/>
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
