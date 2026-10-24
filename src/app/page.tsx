import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";

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
