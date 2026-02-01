//import { api } from './api';
import type { Appointment } from '../types/appointment';

export const appointmentService = {
  // Busca todas as consultas
  getAll: async (): Promise<Appointment[]> => {
    // const response = await api.get('/appointments');
    // return response.data;

    // Simulação
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            doctor: { name: 'Dr. Roberto Albuquerque', specialty: 'Cardiologista' },
            date: 'Hoje',
            time: '10:00',
            status: 'scheduled',
            type: 'upcoming'
          },
          {
            id: 2,
            doctor: { name: 'Dra. Fernanda Almeida', specialty: 'Pneumologista' },
            date: '16/03/2025',
            status: 'completed',
            type: 'history'
          },
          {
            id: 3,
            doctor: { name: 'Dr. Roberto Albuquerque', specialty: 'Cardiologista' },
            date: '27/04/2025',
            status: 'completed',
            type: 'history'
          }
        ]);
      }, 1000); 
    });
  }
};