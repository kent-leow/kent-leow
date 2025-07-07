import type { WorkExperience } from "../../../types/portfolio";

interface ExperienceSectionProps {
  experiences: WorkExperience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className="min-h-screen bg-[#1a1a2e] px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f8f9fa] text-center mb-16">
          Work Experience
        </h2>
        
        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-[#4d4d4d]"></div>
          
          {experiences.map((experience, index) => (
            <div 
              key={experience.id}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-[#e94560] rounded-full border-4 border-[#1a1a2e] z-10 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#f8f9fa] rounded-full"></div>
              </div>
              
              {/* Experience Card */}
              <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <div className="bg-[#16213e] rounded-lg p-6 shadow-lg border border-[#4d4d4d] hover:border-[#e94560] transition-colors duration-300">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-[#f8f9fa] mb-2">
                      {experience.position}
                    </h3>
                    <h4 className="text-lg font-semibold text-[#e94560] mb-2">
                      {experience.company}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[#a8a8a8] text-sm">
                      <span>{experience.startDate} - {experience.endDate}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{experience.location}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-[#f8f9fa] mb-4 leading-relaxed">
                    {experience.description}
                  </p>
                  
                  {/* Achievements */}
                  <div className="space-y-2">
                    <h5 className="text-[#3498db] font-semibold text-sm uppercase tracking-wide">
                      Key Achievements
                    </h5>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, achIndex) => (
                        <li 
                          key={achIndex}
                          className="flex items-start gap-2 text-[#a8a8a8] text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-[#2ecc71] rounded-full mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
