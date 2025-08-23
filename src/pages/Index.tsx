import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AtomVisualization } from '@/components/AtomVisualization';
import { ConceptExplorer } from '@/components/ConceptExplorer';
import { InteractiveQuiz } from '@/components/InteractiveQuiz';
import heroImage from '@/assets/atomic-hero.jpg';

type ActiveSection = 'visualization' | 'concepts' | 'quiz';

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('visualization');

  const sectionTitles = {
    visualization: 'Interactive Atom Models',
    concepts: 'Learn Key Concepts', 
    quiz: 'Test Your Knowledge'
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 animate-float">
            Class 10 Physics
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient animate-fade-in">
            Atomic Structure
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
            Explore the fascinating world of atoms through interactive visualizations and engaging activities
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Button 
              size="lg" 
              className="transition-smooth hover:glow-effect"
              onClick={() => setActiveSection('visualization')}
            >
              Start Exploring
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="transition-smooth hover:glow-effect"
              onClick={() => setActiveSection('concepts')}
            >
              Learn Concepts
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {(Object.keys(sectionTitles) as ActiveSection[]).map((section) => (
              <Button
                key={section}
                variant={activeSection === section ? "default" : "outline"}
                className={`transition-smooth hover:glow-effect ${
                  activeSection === section ? 'glow-effect' : ''
                }`}
                onClick={() => setActiveSection(section)}
              >
                {sectionTitles[section]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            {sectionTitles[activeSection]}
          </h2>
          
          <div className="animate-fade-in">
            {activeSection === 'visualization' && <AtomVisualization />}
            {activeSection === 'concepts' && <ConceptExplorer />}
            {activeSection === 'quiz' && <InteractiveQuiz />}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground">
            Interactive learning module for Class 10 Atomic Structure • 
            Built with modern web technologies
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
