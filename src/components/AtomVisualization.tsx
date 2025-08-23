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
             const radius = 100 + shellIndex * 60; // Much larger distance to ensure electrons never appear near nucleus
      const electrons: JSX.Element[] = [];

      for (let i = 0; i < electronsInShell; i++) {
        const angle = (360 / electronsInShell) * i;
                 const animationDuration = 4 + shellIndex * 1.5; // Original speed - smooth orbiting
        
                 electrons.push(
           <div
             key={`electron-${shellIndex}-${i}`}
             className={`absolute w-3 h-3 bg-accent rounded-full glow-effect`}
             style={{
               left: '50%',
               top: '50%',
               transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px)`,
               animation: isAnimating ? `orbit ${animationDuration}s linear infinite` : 'none',
               animationDelay: isAnimating ? `${i * (animationDuration / electronsInShell)}s` : '0s',
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
      <div className="text-center mb-4">
        <h4 className="text-lg font-semibold text-accent mb-2">Select an Element</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Click on an element to see its atomic structure
        </p>
      </div>
      
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

             {/* Atom Visualization - Dynamic Layout */}
       <Card className={`p-8 bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-700 w-full max-w-7xl ${
         isAnimating ? 'shadow-lg shadow-primary/20' : ''
       }`}>
         <div className="relative">
           {/* Atom Model - Dynamic Positioning */}
           <div className={`flex flex-col items-center space-y-6 transition-all duration-700 ${
             isAnimating 
               ? 'w-full justify-center' 
               : 'w-1/2 justify-start'
           }`}>
             <h3 className="text-2xl font-bold text-gradient">
               {selectedElement.name} Atom
             </h3>
             
                               <div className="relative w-80 h-80">
                    {/* Nucleus */}
                    <div
                      className={`absolute w-12 h-12 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                        isAnimating ? 'animate-pulse-glow' : ''
                      }`}
                 style={{ 
                   backgroundColor: selectedElement.color,
                   boxShadow: isAnimating 
                     ? `0 0 20px ${selectedElement.color}, 0 0 40px ${selectedElement.color}` 
                     : `0 0 10px ${selectedElement.color}`
                 }}
               />
               
               {/* Electron Shells */}
               {renderElectronShells()}
             </div>

             <div className="grid grid-cols-2 gap-8 text-sm">
               <div className="text-center">
                 <div className="text-muted-foreground">Atomic Number</div>
                 <div className="text-xl font-semibold text-primary">{selectedElement.atomicNumber}</div>
               </div>
               <div className="text-center">
                 <div className="text-muted-foreground">Electrons</div>
                 <div className="text-xl font-semibold text-accent">
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

           {/* Explanations - Dynamic Visibility */}
           <div className={`absolute right-0 top-0 w-1/2 space-y-6 transition-all duration-700 ${
             isAnimating 
               ? 'opacity-0 pointer-events-none translate-x-8 scale-95' 
               : 'opacity-100 translate-x-0 scale-100'
           }`}>
             <h4 className="text-xl font-semibold text-accent text-center lg:text-left">
               Atomic Structure Details
             </h4>
             
                           {/* Nucleus Explanation */}
              <div className="bg-card/90 backdrop-blur-sm border border-primary/20 rounded-xl p-4 shadow-xl shadow-primary/10">
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-4 h-4 rounded-full shadow-lg shadow-primary/30"
                    style={{ backgroundColor: selectedElement.color }}
                  ></div>
                  <h5 className="font-bold text-primary text-lg">Nucleus</h5>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Contains protons and neutrons. The center of the atom with positive charge.
                </p>
                <div className="text-xs text-primary/70">
                  <strong>Fun fact:</strong> 99.9% of an atom's mass is in the nucleus!
                </div>
              </div>
              
              {/* Shell Explanations */}
              {selectedElement.electrons.map((electronsInShell, shellIndex) => {
                return (
                  <div
                    key={`explanation-${shellIndex}`}
                    className="bg-card/90 backdrop-blur-sm border border-accent/20 rounded-xl p-4 shadow-xl shadow-accent/10"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-4 h-4 rounded-full bg-accent shadow-lg shadow-accent/30"></div>
                      <h5 className="font-bold text-accent text-lg">
                        Shell {shellIndex + 1} ({electronsInShell} e⁻)
                      </h5>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      Energy level {shellIndex + 1}. Can hold maximum {shellIndex === 0 ? 2 : shellIndex === 1 ? 8 : 18} electrons.
                    </p>
                    <div className="text-xs text-accent/70">
                      <strong>Current:</strong> {electronsInShell} electron{electronsInShell !== 1 ? 's' : ''} present
                    </div>
                  </div>
                );
              })}
             
             
           </div>
         </div>
       </Card>
    </div>
  );
};