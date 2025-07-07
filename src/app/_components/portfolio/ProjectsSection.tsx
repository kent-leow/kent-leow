import type { Project } from "../../../types/portfolio";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="min-h-screen bg-[#16213e] px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f8f9fa] text-center mb-16">
          Featured Projects
        </h2>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="bg-[#1a1a2e] rounded-lg p-6 shadow-lg border border-[#4d4d4d] hover:border-[#9b59b6] transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Project Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#f8f9fa] mb-2">
                  {project.title}
                </h3>
                <p className="text-[#a8a8a8] leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              {/* Technologies */}
              <div className="mb-4">
                <h4 className="text-[#3498db] font-semibold text-sm uppercase tracking-wide mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-[#16213e] text-[#f8f9fa] text-xs rounded-full border border-[#4d4d4d] hover:border-[#9b59b6] transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-[#2ecc71] font-semibold text-sm uppercase tracking-wide">
                  Project Highlights
                </h4>
                <ul className="space-y-1">
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li 
                      key={highlightIndex}
                      className="flex items-start gap-2 text-[#a8a8a8] text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-[#2ecc71] rounded-full mt-2 flex-shrink-0"></div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Project Action */}
              <div className="mt-6 pt-4 border-t border-[#4d4d4d]">
                <button className="text-[#9b59b6] font-semibold text-sm hover:text-[#f8f9fa] transition-colors duration-200 flex items-center gap-2">
                  <span>View Details</span>
                  <span className="text-xs">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Projects Summary */}
        <div className="mt-16 text-center">
          <p className="text-[#a8a8a8] text-lg max-w-3xl mx-auto">
            A selection of impactful projects demonstrating expertise in modern web technologies, 
            cloud platforms, and full-stack development. Each project showcases problem-solving 
            abilities and commitment to delivering high-quality, scalable solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
