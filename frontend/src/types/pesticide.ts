export interface Pesticide {
  id: string;
  name: string;
  type: 'Herbicida' | 'Inseticida' | 'Fungicida' | 'Outro';
  toxicityLevel: string;
}