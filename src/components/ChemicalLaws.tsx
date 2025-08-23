import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ChemicalLaw {
  id: string;
  title: string;
  description: string;
  example: string;
  formula?: string;
  visual: string;
}

const chemicalLaws: ChemicalLaw[] = [
  {
    id: 'conservation',
    title: 'Law of Conservation of Mass',
    description: 'Matter can neither be created nor destroyed in a chemical reaction. Mass of reactants equals mass of products.',
    example: 'In burning 12g of carbon with 32g of oxygen, we get exactly 44g of carbon dioxide.',
    formula: 'Mass of Reactants = Mass of Products',
    visual: '12g C + 32g O₂ → 44g CO₂'
  },
  {
    id: 'proportions',
    title: 'Law of Constant Proportions',
    description: 'A pure chemical compound always contains the same elements combined in a fixed proportion by mass.',
    example: 'Water always contains hydrogen and oxygen in the ratio 1:8 by mass, whether from a river or ocean.',
    formula: 'H : O = 1 : 8 (by mass)',
    visual: 'H₂O always has 2H + 16O = 18 total mass'
  }
];

const daltonPrinciples = [
  'Matter is made up of indivisible particles called atoms',
  'All atoms of a given element have identical mass and properties',
  'Atoms of different elements combine in fixed ratios to form compounds',
  'Atoms are neither created nor destroyed in chemical reactions',
  'The relative number and kinds of atoms are constant in a compound'
];

export const ChemicalLaws: React.FC = () => {
  const [selectedLaw, setSelectedLaw] = useState<ChemicalLaw>(chemicalLaws[0]);
  const [showDalton, setShowDalton] = useState(false);

  return (
    <div className="space-y-8">
      {/* Chemical Laws Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gradient">Chemical Laws</h3>
          {chemicalLaws.map((law) => (
            <Card
              key={law.id}
              className={`p-4 cursor-pointer transition-smooth hover:glow-effect ${
                selectedLaw.id === law.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border/50 hover:border-accent/50'
              }`}
              onClick={() => setSelectedLaw(law)}
            >
              <h4 className="font-medium text-accent">{law.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {law.description.substring(0, 80)}...
              </p>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-xl font-bold text-gradient mb-4">{selectedLaw.title}</h3>
          <p className="text-muted-foreground mb-4">{selectedLaw.description}</p>
          
          {selectedLaw.formula && (
            <div className="bg-muted/20 p-3 rounded-lg mb-4">
              <p className="text-center font-mono text-primary text-lg">{selectedLaw.formula}</p>
            </div>
          )}
          
          <div className="bg-accent/10 p-4 rounded-lg mb-4">
            <h4 className="text-accent font-medium mb-2">Visual Example:</h4>
            <p className="font-mono text-lg text-center">{selectedLaw.visual}</p>
          </div>
          
          <p className="text-sm bg-secondary/20 p-3 rounded-lg">
            <strong>Example:</strong> {selectedLaw.example}
          </p>
        </Card>
      </div>

      {/* Dalton's Atomic Theory */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gradient">Dalton's Atomic Theory</h3>
          <Button
            onClick={() => setShowDalton(!showDalton)}
            variant="outline"
            className="transition-smooth hover:glow-effect"
          >
            {showDalton ? 'Hide Details' : 'Show Principles'}
          </Button>
        </div>

        <p className="text-muted-foreground mb-6">
          John Dalton proposed that atoms are "solid, massy, hard, impenetrable, moving particles" - 
          the smallest, indivisible units of matter that explain chemical laws.
        </p>

        {showDalton && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-lg font-semibold text-accent">Five Key Principles:</h4>
            {daltonPrinciples.map((principle, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Badge className="bg-primary/20 text-primary border-primary/30 min-w-fit">
                  {index + 1}
                </Badge>
                <p className="text-foreground">{principle}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};