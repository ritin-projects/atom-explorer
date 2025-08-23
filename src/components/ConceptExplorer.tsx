import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Concept {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

const concepts: Concept[] = [
  {
    id: 'atom-basics',
    title: 'What is an Atom?',
    description: 'The fundamental building block of matter, consisting of a nucleus and electrons.',
    keyPoints: [
      'Atoms are incredibly small - about 0.1 nanometers',
      'Made up of protons, neutrons, and electrons',
      'The nucleus contains protons and neutrons',
      'Electrons orbit around the nucleus in shells'
    ],
    difficulty: 'basic'
  },
  {
    id: 'electron-shells',
    title: 'Electron Shells',
    description: 'Energy levels where electrons exist around the nucleus.',
    keyPoints: [
      'Electrons exist in specific energy levels or shells',
      'Inner shells have lower energy than outer shells',
      'Each shell can hold a maximum number of electrons',
      'Shell 1: max 2, Shell 2: max 8, Shell 3: max 18'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'atomic-number',
    title: 'Atomic Number & Mass',
    description: 'Key properties that define each element.',
    keyPoints: [
      'Atomic number = number of protons in nucleus',
      'Mass number = protons + neutrons',
      'In neutral atoms: protons = electrons',
      'Isotopes have same protons but different neutrons'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'periodic-table',
    title: 'Periodic Table Organization',
    description: 'How elements are arranged based on atomic structure.',
    keyPoints: [
      'Elements arranged by increasing atomic number',
      'Periods = horizontal rows (same electron shells)',
      'Groups = vertical columns (same valence electrons)',
      'Properties repeat in periodic patterns'
    ],
    difficulty: 'advanced'
  }
];

export const ConceptExplorer: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<Concept>(concepts[0]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Concept List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gradient">Explore Concepts</h3>
        {concepts.map((concept) => (
          <Card
            key={concept.id}
            className={`p-4 cursor-pointer transition-smooth hover:glow-effect ${
              selectedConcept.id === concept.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border/50 hover:border-accent/50'
            }`}
            onClick={() => setSelectedConcept(concept)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{concept.title}</h4>
              <Badge className={getDifficultyColor(concept.difficulty)}>
                {concept.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {concept.description}
            </p>
          </Card>
        ))}
      </div>

      {/* Concept Details */}
      <div className="md:col-span-2">
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gradient">
                {selectedConcept.title}
              </h2>
              <Badge className={getDifficultyColor(selectedConcept.difficulty)}>
                {selectedConcept.difficulty}
              </Badge>
            </div>

            <p className="text-lg text-muted-foreground">
              {selectedConcept.description}
            </p>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-accent">Key Points</h3>
              <div className="space-y-3">
                {selectedConcept.keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 glow-effect" />
                    <p className="text-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full transition-smooth hover:glow-effect">
                Take Quiz on {selectedConcept.title}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};