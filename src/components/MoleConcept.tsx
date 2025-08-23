import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface MoleCalculation {
  substance: string;
  molarMass: number;
  givenMass?: number;
  moles?: number;
  molecules?: number;
}

const commonSubstances = [
  { name: 'Water (H₂O)', molarMass: 18, formula: 'H₂O' },
  { name: 'Carbon Dioxide (CO₂)', molarMass: 44, formula: 'CO₂' },
  { name: 'Methane (CH₄)', molarMass: 16, formula: 'CH₄' },
  { name: 'Oxygen (O₂)', molarMass: 32, formula: 'O₂' },
  { name: 'Sodium Chloride (NaCl)', molarMass: 58.5, formula: 'NaCl' }
];

export const MoleConcept: React.FC = () => {
  const [selectedSubstance, setSelectedSubstance] = useState(commonSubstances[0]);
  const [inputMass, setInputMass] = useState<string>('18');
  const [calculatedValues, setCalculatedValues] = useState<MoleCalculation | null>(null);

  const calculateMoles = () => {
    const mass = parseFloat(inputMass);
    if (isNaN(mass) || mass <= 0) return;

    const moles = mass / selectedSubstance.molarMass;
    const molecules = moles * 6.022e23;

    setCalculatedValues({
      substance: selectedSubstance.name,
      molarMass: selectedSubstance.molarMass,
      givenMass: mass,
      moles: moles,
      molecules: molecules
    });
  };

  const formatScientific = (num: number): string => {
    if (num >= 1e23) {
      return `${(num / 1e23).toFixed(2)} × 10²³`;
    }
    return num.toFixed(4);
  };

  return (
    <div className="space-y-8">
      {/* Mole Concept Introduction */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-2xl font-bold text-gradient mb-4">The Mole Concept</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-accent mb-3">What is a Mole?</h4>
            <p className="text-muted-foreground mb-4">
              A mole is a unit that measures the amount of substance. One mole contains exactly 
              6.022 × 10²³ particles (atoms, molecules, or ions).
            </p>
            
            <div className="bg-primary/10 p-4 rounded-lg">
              <h5 className="font-semibold text-primary mb-2">Avogadro's Number</h5>
              <p className="text-3xl font-bold text-center text-primary">6.022 × 10²³</p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                particles per mole
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-accent mb-3">Key Formulas</h4>
            <div className="space-y-3">
              <div className="bg-muted/20 p-3 rounded-lg">
                <p className="font-mono text-center">Number of moles = Mass / Molar Mass</p>
              </div>
              <div className="bg-muted/20 p-3 rounded-lg">
                <p className="font-mono text-center">Molecules = Moles × 6.022 × 10²³</p>
              </div>
              <div className="bg-muted/20 p-3 rounded-lg">
                <p className="font-mono text-center">Molar Mass = Atomic Mass (g/mol)</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Calculator */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-xl font-bold text-gradient mb-6">Mole Calculator</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Substance
              </label>
              <div className="grid grid-cols-1 gap-2">
                {commonSubstances.map((substance, index) => (
                  <Button
                    key={index}
                    variant={selectedSubstance.name === substance.name ? "default" : "outline"}
                    className="justify-start transition-smooth hover:glow-effect"
                    onClick={() => setSelectedSubstance(substance)}
                  >
                    <span className="font-mono mr-2">{substance.formula}</span>
                    {substance.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Enter Mass (grams)
              </label>
              <Input
                type="number"
                value={inputMass}
                onChange={(e) => setInputMass(e.target.value)}
                placeholder="Enter mass in grams"
                className="transition-smooth focus:glow-effect"
              />
            </div>

            <Button 
              onClick={calculateMoles}
              className="w-full transition-smooth hover:glow-effect"
            >
              Calculate Moles & Molecules
            </Button>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/10 p-4 rounded-lg">
              <h4 className="font-semibold text-accent mb-2">Selected Substance</h4>
              <p className="text-lg">{selectedSubstance.name}</p>
              <p className="text-muted-foreground">
                Molar Mass: {selectedSubstance.molarMass} g/mol
              </p>
            </div>

            {calculatedValues && (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h5 className="font-semibold text-primary mb-2">Results</h5>
                  <div className="space-y-2 text-sm">
                    <p><strong>Given Mass:</strong> {calculatedValues.givenMass} g</p>
                    <p><strong>Number of Moles:</strong> {calculatedValues.moles?.toFixed(4)} mol</p>
                    <p><strong>Number of Molecules:</strong> {formatScientific(calculatedValues.molecules || 0)}</p>
                  </div>
                </div>

                <div className="bg-accent/10 p-3 rounded-lg">
                  <p className="text-xs text-center font-mono">
                    {calculatedValues.givenMass}g ÷ {calculatedValues.molarMass}g/mol = {calculatedValues.moles?.toFixed(4)} mol
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Atomic and Molecular Mass */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-bold text-gradient mb-4">Atomic Mass</h3>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              The mass of an atom expressed in atomic mass units (AMU).
            </p>
            
            <div className="bg-muted/20 p-3 rounded-lg">
              <p className="text-center font-semibold">1 AMU = 1/12 mass of C-12 atom</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <p><strong>Example:</strong></p>
              <p>• Carbon-12: 12 AMU</p>
              <p>• Hydrogen: 1 AMU</p>
              <p>• Oxygen: 16 AMU</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-bold text-gradient mb-4">Molecular Mass</h3>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Sum of atomic masses of all atoms in a molecule.
            </p>
            
            <div className="bg-accent/10 p-3 rounded-lg">
              <p className="text-sm"><strong>Water (H₂O):</strong></p>
              <p className="font-mono text-center">2(1) + 1(16) = 18 AMU</p>
            </div>
            
            <div className="bg-accent/10 p-3 rounded-lg">
              <p className="text-sm"><strong>CO₂:</strong></p>
              <p className="font-mono text-center">1(12) + 2(16) = 44 AMU</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};