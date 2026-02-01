import type { Pesticide } from '../types/pesticide';

export const pesticideService = {
  getAll: async (): Promise<Pesticide[]> => {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'Glifosato', type: 'Herbicida', toxicityLevel: 'red' },
          { id: '2', name: '2,4-D', type: 'Herbicida', toxicityLevel: 'yellow' },
          { id: '3', name: 'Mancozeb', type: 'Fungicida', toxicityLevel: 'blue' },
          { id: '4', name: 'Acefato', type: 'Inseticida', toxicityLevel: 'yellow' },
          { id: '5', name: 'Atrazina', type: 'Herbicida', toxicityLevel: 'green' },
          { id: '6', name: 'Paraquat', type: 'Herbicida', toxicityLevel: 'red' },
          { id: '7', name: 'Clorpirifós', type: 'Inseticida', toxicityLevel: 'yellow' },
          { id: '8', name: 'Carbofuran', type: 'Inseticida', toxicityLevel: 'red' },
        ]);
      }, 800);
    });
  }
};