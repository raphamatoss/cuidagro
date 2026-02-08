import type { Pesticide } from '../types/pesticide';

export const pesticideService = {
  getAll: async (): Promise<Pesticide[]> => {
    const response = await fetch('http://54.91.153.23:9090/agrotoxicos'); //conexão com a API via endpoint
    if(!response.ok){
      throw new Error('Erro na busca de pesticidas');
    }

    const data = await response.json();
    return data;
    
  }
};