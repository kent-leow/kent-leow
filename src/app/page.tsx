import ProfileHeader from "./_components/portfolio/ProfileHeader";
import SkillsSection from "./_components/portfolio/SkillsSection";
import ExperienceSection from "./_components/portfolio/ExperienceSection";
import ContactSection from "./_components/portfolio/ContactSection";
import ResponsiveContainer from "./_components/layout/ResponsiveContainer";
import DynamicNavigation from "./_components/navigation/DynamicNavigation";
import { portfolioData } from "../data/portfolio-data";

export default function Home() {
  const navigationConfig = {
    sections: [
      { 
        id: 'profile', 
        title: 'Profile', 
        description: 'Professional overview',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
        color: '#7c3aed'
      },
      { 
        id: 'skills', 
        title: 'Skills', 
        description: 'Technical expertise',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        ),
        color: '#06b6d4'
      },
      { 
        id: 'experience', 
        title: 'Experience', 
        description: 'Professional journey',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        color: '#10b981'
      },
      { 
        id: 'contact', 
        title: 'Contact', 
        description: 'Get in touch',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        color: '#f59e0b'
      }
    ],
    smooth: true,
    offset: 80,
    highlightActive: true,
    showProgress: true
  };

  return (
    <main className="relative">
      {/* Main Content Sections */}
      <ResponsiveContainer
        config={{
          mobile: {
            layout: 'stack',
            spacing: 'gap-0',
            fontSize: 'text-sm',
            padding: 'p-0',
            height: 'min-h-screen'
          },
          tablet: {
            layout: 'stack',
            spacing: 'gap-0',
            fontSize: 'text-base',
            padding: 'p-0',
            height: 'min-h-screen'
          },
          desktop: {
            layout: 'stack',
            spacing: 'gap-0',
            fontSize: 'text-lg',
            padding: 'p-0',
            height: 'min-h-screen'
          }
        }}
        className="relative z-10"
      >
        <section id="profile" className="min-h-screen relative">
          <ProfileHeader />
        </section>
        
        <section id="skills" className="min-h-screen relative">
          <SkillsSection skills={portfolioData.skills} />
        </section>
        
        <section id="experience" className="min-h-screen relative">
          <ExperienceSection experiences={portfolioData.experience} />
        </section>
        
        <section id="contact" className="min-h-screen relative">
          <ContactSection 
            contact={portfolioData.contact}
            socialLinks={portfolioData.socialLinks}
          />
        </section>
      </ResponsiveContainer>

      {/* Fixed Navigation */}
      <DynamicNavigation config={navigationConfig} />
    </main>
  );
}
