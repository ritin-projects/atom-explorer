import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Ion {
  element: string;
  symbol: string;
  charge: number;
  type: 'cation' | 'anion';
}

interface Compound {
  name: string;
  formula: string;
  cation: Ion;
  anion: Ion;
  explanation: string;
}

const commonIons: Ion[] = [
  { element: 'Sodium', symbol: 'Na', charge: 1, type: 'cation' },
  { element: 'Calcium', symbol: 'Ca', charge: 2, type: 'cation' },
  { element: 'Aluminum', symbol: 'Al', charge: 3, type: 'cation' },
  { element: 'Chloride', symbol: 'Cl', charge: -1, type: 'anion' },
  { element: 'Oxide', symbol: 'O', charge: -2, type: 'anion' },
  { element: 'Nitride', symbol: 'N', charge: -3, type: 'anion' }
];

const exampleCompounds: Compound[] = [
  {
    name: 'Sodium Chloride',
    formula: 'NaCl',
    cation: { element: 'Sodium', symbol: 'Na', charge: 1, type: 'cation' },
    anion: { element: 'Chloride', symbol: 'Cl', charge: -1, type: 'anion' },
    explanation: 'Na⁺ loses 1 electron, Cl⁻ gains 1 electron. Charges balance: (+1) + (-1) = 0'
  },
  {
    name: 'Calcium Chloride',
    formula: 'CaCl₂',
    cation: { element: 'Calcium', symbol: 'Ca', charge: 2, type: 'cation' },
    anion: { element: 'Chloride', symbol: 'Cl', charge: -1, type: 'anion' },
    explanation: 'Ca²⁺ loses 2 electrons, 2 Cl⁻ each gain 1 electron. Charges balance: (+2) + 2(-1) = 0'
  },
  {
    name: 'Aluminum Oxide',
    formula: 'Al₂O₃',
    cation: { element: 'Aluminum', symbol: 'Al', charge: 3, type: 'cation' },
    anion: { element: 'Oxide', symbol: 'O', charge: -2, type: 'anion' },
    explanation: '2 Al³⁺ lose 6 electrons total, 3 O²⁻ gain 6 electrons total. Charges balance: 2(+3) + 3(-2) = 0'
  }
];

export const ChemicalFormulae: React.FC = () => {
  const [selectedCompound, setSelectedCompound] = useState<Compound>(exampleCompounds[0]);
  const [selectedCation, setSelectedCation] = useState<Ion | null>(null);
  const [selectedAnion, setSelectedAnion] = useState<Ion | null>(null);
  const [calculatedFormula, setCalculatedFormula] = useState<string>('');

  const cations = commonIons.filter(ion => ion.type === 'cation');
  const anions = commonIons.filter(ion => ion.type === 'anion');

  const calculateFormula = () => {
    if (!selectedCation || !selectedAnion) return;

    const cationCharge = Math.abs(selectedCation.charge);
    const anionCharge = Math.abs(selectedAnion.charge);
    
    // Find LCM to balance charges
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const lcm = (cationCharge * anionCharge) / gcd(cationCharge, anionCharge);
    
    const cationCount = lcm / cationCharge;
    const anionCount = lcm / anionCharge;

    let formula = '';
    if (cationCount === 1) {
      formula += selectedCation.symbol;
    } else {
      formula += selectedCation.symbol + getSubscript(cationCount);
    }
    
    if (anionCount === 1) {
      formula += selectedAnion.symbol;
    } else {
      formula += selectedAnion.symbol + getSubscript(anionCount);
    }

    setCalculatedFormula(formula);
  };

  const getSubscript = (num: number): string => {
    const subscripts = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
    return num.toString().split('').map(digit => subscripts[parseInt(digit)]).join('');
  };

  const getChargeDisplay = (charge: number): string => {
    const absCharge = Math.abs(charge);
    const sign = charge > 0 ? '⁺' : '⁻';
    return absCharge === 1 ? sign : absCharge + sign;
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-2xl font-bold text-gradient mb-4">Chemical Formulae & Ionic Compounds</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-accent mb-3">What are Ions?</h4>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Ions are atoms that have gained or lost electrons, giving them a net electric charge.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  <h5 className="font-semibold text-red-400 mb-1">Cations (+)</h5>
                  <p className="text-xs text-muted-foreground">Lost electrons</p>
                  <p className="text-xs text-muted-foreground">Positive charge</p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  <h5 className="font-semibold text-blue-400 mb-1">Anions (-)</h5>
                  <p className="text-xs text-muted-foreground">Gained electrons</p>
                  <p className="text-xs text-muted-foreground">Negative charge</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-accent mb-3">Ionic Compounds</h4>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Formed when cations and anions combine. The total positive charge must equal the total negative charge.
              </p>
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-center font-mono text-primary">
                  Total Positive = Total Negative
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Formula Builder */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-xl font-bold text-gradient mb-6">Formula Builder</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-red-400 mb-3">Select Cation (+)</h4>
            <div className="space-y-2">
              {cations.map((ion, index) => (
                <Button
                  key={index}
                  variant={selectedCation?.symbol === ion.symbol ? "default" : "outline"}
                  className="w-full justify-between transition-smooth hover:glow-effect"
                  onClick={() => setSelectedCation(ion)}
                >
                  <span>{ion.element}</span>
                  <Badge className="bg-red-500/20 text-red-400">
                    {ion.symbol}{getChargeDisplay(ion.charge)}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-3">Select Anion (-)</h4>
            <div className="space-y-2">
              {anions.map((ion, index) => (
                <Button
                  key={index}
                  variant={selectedAnion?.symbol === ion.symbol ? "default" : "outline"}
                  className="w-full justify-between transition-smooth hover:glow-effect"
                  onClick={() => setSelectedAnion(ion)}
                >
                  <span>{ion.element}</span>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {ion.symbol}{getChargeDisplay(ion.charge)}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-accent mb-3">Calculate Formula</h4>
            <div className="space-y-4">
              {selectedCation && selectedAnion && (
                <div className="bg-muted/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Selected Ions:</p>
                  <p className="font-mono">
                    {selectedCation.symbol}{getChargeDisplay(selectedCation.charge)} + {selectedAnion.symbol}{getChargeDisplay(selectedAnion.charge)}
                  </p>
                </div>
              )}
              
              <Button 
                onClick={calculateFormula}
                disabled={!selectedCation || !selectedAnion}
                className="w-full transition-smooth hover:glow-effect"
              >
                Calculate Formula
              </Button>
              
              {calculatedFormula && (
                <div className="bg-primary/10 p-4 rounded-lg animate-fade-in">
                  <h5 className="font-semibold text-primary mb-2">Chemical Formula:</h5>
                  <p className="text-2xl font-bold text-center font-mono">{calculatedFormula}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Example Compounds */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <h3 className="text-xl font-bold text-gradient mb-6">Common Ionic Compounds</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {exampleCompounds.map((compound, index) => (
            <Button
              key={index}
              variant={selectedCompound.name === compound.name ? "default" : "outline"}
              className="h-auto p-4 transition-smooth hover:glow-effect"
              onClick={() => setSelectedCompound(compound)}
            >
              <div className="text-center">
                <p className="font-semibold">{compound.name}</p>
                <p className="text-lg font-mono">{compound.formula}</p>
              </div>
            </Button>
          ))}
        </div>

        <Card className="p-4 bg-accent/5 border-accent/20">
          <h4 className="font-semibold text-accent mb-3">{selectedCompound.name} Formation</h4>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              <h5 className="font-semibold text-red-400 mb-1">Cation</h5>
              <p className="font-mono">{selectedCompound.cation.symbol}{getChargeDisplay(selectedCompound.cation.charge)}</p>
              <p className="text-sm text-muted-foreground">{selectedCompound.cation.element}</p>
            </div>
            
            <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
              <h5 className="font-semibold text-blue-400 mb-1">Anion</h5>
              <p className="font-mono">{selectedCompound.anion.symbol}{getChargeDisplay(selectedCompound.anion.charge)}</p>
              <p className="text-sm text-muted-foreground">{selectedCompound.anion.element}</p>
            </div>
          </div>
          
          <div className="bg-muted/20 p-3 rounded-lg">
            <p className="text-sm">{selectedCompound.explanation}</p>
          </div>
        </Card>
      </Card>
    </div>
  );
};