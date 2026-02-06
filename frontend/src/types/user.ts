export interface UserProfile {
  id: number;
  name: string;
  email: string;
  cpf: string;
  doencas?: string[];  // Pode vir null do banco
  alergias?: string[]; // Pode vir null do banco
  tipoSanguineo?: string;
}