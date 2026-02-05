import type { Pesticide } from '../types/pesticide';

export const pesticideService = {
  getAll: async (): Promise<Pesticide[]> => {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'Glifosato', type: 'Herbicida', toxicityLevel: 'Alto' },
          { id: '2', name: '2,4-D', type: 'Herbicida', toxicityLevel: 'Médio' },
          { id: '3', name: 'Mancozeb', type: 'Fungicida', toxicityLevel: 'Leve' },
          { id: '4', name: 'Acefato', type: 'Inseticida', toxicityLevel: 'Médio' },
          { id: '5', name: 'Atrazina', type: 'Herbicida', toxicityLevel: 'Muito leve' },
          { id: '6', name: 'Paraquat', type: 'Herbicida', toxicityLevel: 'Alto' },
          { id: '7', name: 'Clorpirifós', type: 'Inseticida', toxicityLevel: 'Médio' },
          { id: '8', name: 'Carbofuran', type: 'Inseticida', toxicityLevel: 'Alto' },
        ]);
      }, 800);
    });
  }
};