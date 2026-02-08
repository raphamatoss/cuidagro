import type { Pesticide } from '../types/pesticide';

export const pesticideService = {
  getAll: async (): Promise<Pesticide[]> => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6InZpbmlAZ21haWwuY29tIiwiZXhwIjoxNzcwNjA0NzYxfQ.FhHpNZHqLFwL51Q7H8P5x4TEBPGjGewaCGzdsbL-qmk';

    const response = await fetch('/api/agrotoxicos', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro na busca de pesticidas');
    }

    const data = await response.json();
    return data;
  },
};
