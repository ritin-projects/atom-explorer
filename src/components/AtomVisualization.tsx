import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  electrons: number[];
  color: string;
}

const elements: Element[] = [
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, electrons: [1], color: 'hsl(0 100% 70%)' },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, electrons: [2], color: 'hsl(60 100% 70%)' },
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, electrons: [2, 1], color: 'hsl(120 100% 70%)' },
  { symbol: 'C', name: 'Carbon', atomicNumber: 6, electrons: [2, 4], color: 'hsl(200 100% 70%)' },
  { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, electrons: [2, 5], color: 'hsl(240 100% 70%)' },
  { symbol: 'O', name: 'Oxygen', atomicNumber: 8, electrons: [2, 6], color: 'hsl(300 100% 70%)' },
];

export const AtomVisualization: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<Element>(elements[0]);
  const [isAnimating, setIsAnimating] = useState(true);

  const renderElectronShells = () => {
    const shells: JSX.Element[] = [];
    let electronCount = 0;

    selectedElement.electrons.forEach((electronsInShell, shellIndex) => {
      const radius = 60 + shellIndex * 40;
      const electrons: JSX.Element[] = [];

      for (let i = 0; i < electronsInShell; i++) {
        const angle = (360 / electronsInShell) * i;
        electrons.push(
          <div
            key={`electron-${shellIndex}-${i}`}
            className={`absolute w-3 h-3 bg-accent rounded-full glow-effect ${
              isAnimating ? 'animate-orbit' : ''
            }`}
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px)`,
              animationDuration: `${4 + shellIndex * 2}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        );
        electronCount++;
      }

      shells.push(
        <div
          key={`shell-${shellIndex}`}
          className="absolute border border-muted-foreground/30 rounded-full"
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {electrons}
        </div>
      );
    });

    return shells;
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Element Selector */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {elements.map((element) => (
          <Button
            key={element.symbol}
            variant={selectedElement.symbol === element.symbol ? "default" : "outline"}
            className="w-16 h-16 p-0 transition-smooth hover:glow-effect"
            onClick={() => setSelectedElement(element)}
          >
            <div className="text-center">
              <div className="text-lg font-bold">{element.symbol}</div>
              <div className="text-xs">{element.atomicNumber}</div>
            </div>
          </Button>
        ))}
      </div>

      {/* Atom Visualization */}
      <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex flex-col items-center space-y-6">
          <h3 className="text-2xl font-bold text-gradient">
            {selectedElement.name} Atom
          </h3>
          
          <div className="relative w-80 h-80">
            {/* Nucleus */}
            <div
              className="absolute w-8 h-8 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-glow"
              style={{ backgroundColor: selectedElement.color }}
            />
            
            {/* Electron Shells */}
            {renderElectronShells()}
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="text-center">
              <div className="text-muted-foreground">Atomic Number</div>
              <div className="text-lg font-semibold text-primary">{selectedElement.atomicNumber}</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Electrons</div>
              <div className="text-lg font-semibold text-accent">
                {selectedElement.electrons.reduce((a, b) => a + b, 0)}
              </div>
            </div>
          </div>

          <Button
            onClick={() => setIsAnimating(!isAnimating)}
            variant="outline"
            className="transition-smooth hover:glow-effect"
          >
            {isAnimating ? 'Pause Animation' : 'Start Animation'}
          </Button>
        </div>
      </Card>
    </div>
  );
};