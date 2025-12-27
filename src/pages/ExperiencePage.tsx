import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2 } from 'lucide-react';
import BubbleNavigation from '../components/BubbleNavigation';
import GearScroll from '../components/GearScroll';
import CircuitBackground from '../components/CircuitBackground';
import StaggeredContent from '../components/StaggeredContent';

interface ExperiencePageProps {
  onNavigate: (page: string) => void;
}

// Sorted by start date (most recent first)
const experiences = [
  {
    id: 1,
    title: 'Firmware Engineer',
    company: 'Electrium Mobility',
    period: 'Sep 2025 - Dec 2025',
    description: 'Designed firmware for an eco-friendly electric bike with a TFT-based dashboard',
    skills: ['Embedded C', 'ESP32', 'VESC Tool']
  },
  {
    id: 2,
    title: 'Software Lead',
    company: 'Turner Fenton Rocketry Association',
    period: 'Nov 2024 - June 2025',
    description: 'Led a software team to process data for rocket flights up to 10,000 feet',
    skills: ['Raspberry Pi', 'Arduino Uno', 'SolidWorks', 'C++']
  },
  {
    id: 3,
    title: 'AI Researcher',
    company: 'Roaring Cubs Collective',
    period: 'Oct 2024 - Dec 2024',
    description: 'Published a research paper focusing on the impact of adversarial attacks on AI ethics',
    skills: ['CNNs', 'Adversarial Training', 'Cybersecurity']
  },
  {
    id: 4,
    title: 'Aquatics Instructor',
    company: 'City of Brampton',
    period: 'Jul 2023 - Apr 2025',
    description: 'Improved the swimming abilities of 500+ students of all ages',
    skills: ['Leadership', 'Problem-solving', 'Adaptability']
  },

  {
    id: 5,
    title: 'VEX IQ Team Captain',
    company: 'Kraftwerx Robotics',
    period: 'Sep 2017 - Mar 2019',
    description: 'Team 555A Gladiators: 1st in Canada and 4th internationally at the 2018 VEX IQ World Championship',
    skills: ['VEX Robotics', 'RobotC', 'Teamwork']
  }
];

const ExperiencePage = ({ onNavigate }: ExperiencePageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGearScroll = (direction: 'up' | 'down', delta: number) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'down' ? delta : -delta;
      containerRef.current.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <CircuitBackground />
      
      <div ref={containerRef} className="relative z-10 min-h-screen overflow-y-auto">
        <BubbleNavigation currentPage="experience" onNavigate={onNavigate} isCompact />
        <GearScroll onScroll={handleGearScroll} />
        
        <div className="pb-16 px-4 md:px-8 lg:px-16">
          {/* Page header */}
          <motion.div
            className="max-w-4xl mx-auto mb-12 pt-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold holographic-text mb-4">
              EXPERIENCE
            </h1>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical timeline line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />

            <StaggeredContent className="space-y-12" staggerDelay={0.5}>
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="relative flex flex-col md:flex-row gap-4 md:gap-8"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background z-10">
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                  </div>

                  {/* Experience card - alternating sides on desktop */}
                  <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                    <motion.div
                      className="glass-card rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-500 group"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 0 30px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.05)'
                      }}
                    >
                      {/* Scanning line effect on hover */}
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100"
                        initial={{ top: 0 }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />

                      <h3 className="text-xl font-orbitron font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                        {exp.title}
                      </h3>

                      <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary/70" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary/70" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <p className="text-foreground/80 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {exp.skills.map(skill => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className={`hidden md:block flex-1 ${index % 2 === 0 ? 'order-2' : ''}`} />
                </motion.div>
              ))}
            </StaggeredContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
