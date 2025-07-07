import type { ContactInfo, SocialLink } from "../../../types/portfolio";
import InteractiveButton from "../ui/InteractiveButton";
import InteractiveCard from "../ui/InteractiveCard";

interface ContactSectionProps {
  contact: ContactInfo;
  socialLinks: SocialLink[];
}

export default function ContactSection({ contact, socialLinks }: ContactSectionProps) {
  return (
    <section className="min-h-screen bg-[#1a1a2e] px-8 py-16 flex items-center">
      <div className="max-w-4xl mx-auto text-center w-full">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f8f9fa] mb-8">
          Let's Connect
        </h2>
        
        <p className="text-lg text-[#a8a8a8] mb-12 max-w-2xl mx-auto">
          Ready to collaborate on innovative projects? Let's discuss how we can work together 
          to create exceptional digital experiences.
        </p>
        
        {/* Contact Information */}
        <InteractiveCard variant="elevated" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#3498db] rounded-full flex items-center justify-center">
                <span className="text-[#f8f9fa] text-lg">📱</span>
              </div>
              <div>
                <h3 className="text-[#f8f9fa] font-semibold mb-1">Phone</h3>
                <p className="text-[#a8a8a8]">{contact.phone}</p>
              </div>
            </div>
            
            {/* Location */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#2ecc71] rounded-full flex items-center justify-center">
                <span className="text-[#f8f9fa] text-lg">📍</span>
              </div>
              <div>
                <h3 className="text-[#f8f9fa] font-semibold mb-1">Location</h3>
                <p className="text-[#a8a8a8]">{contact.location}</p>
              </div>
            </div>
            
            {/* Status */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#e94560] rounded-full flex items-center justify-center">
                <span className="text-[#f8f9fa] text-lg">🏠</span>
              </div>
              <div>
                <h3 className="text-[#f8f9fa] font-semibold mb-1">Status</h3>
                <p className="text-[#a8a8a8]">{contact.residence}</p>
              </div>
            </div>
          </div>
        </InteractiveCard>
        
        {/* Social Links */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#f8f9fa] mb-4">
            Find me online
          </h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#16213e] rounded-lg border border-[#4d4d4d] hover:border-[#e94560] hover:bg-[#2a2a4e] transition-all duration-300 text-[#f8f9fa] hover:text-[#e94560]"
              >
                <span className="text-sm">{social.platform}</span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="space-y-4">
          <InteractiveButton variant="tech" size="lg">
            Get In Touch
          </InteractiveButton>
          <p className="text-[#a8a8a8] text-sm">
            Available for freelance opportunities and full-time positions
          </p>
        </div>
      </div>
    </section>
  );
}
