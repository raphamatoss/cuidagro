import type { Alert } from "../types/alert";

export const alertService = {
  async getAll(): Promise<Alert[]> {
    // MOCK TEMPORÁRIO
    return [
      {
        id: 1,
        patientName: "João Silva",
        message: "Risco Alto",
        date: "10/03/2025"
      },
      {
        id: 2,
        patientName: "Maria Souza",
        message: "Risco Alto",
        date: "12/03/2025"
      }
    ];
  }
};
