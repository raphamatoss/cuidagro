import type { Doencas } from '../types/disease';

export const diseaseService = {
    getAll: async (): Promise<Doencas[]> => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6InZpbmlAZ21haWwuY29tIiwiZXhwIjoxNzcwNjA0NzYxfQ.FhHpNZHqLFwL51Q7H8P5x4TEBPGjGewaCGzdsbL-qmk';

        const response = await fetch('/api/doencas', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro na busca de doenças');
        }

        return await response.json();
    },
};
