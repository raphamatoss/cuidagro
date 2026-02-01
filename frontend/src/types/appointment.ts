export interface Appointment {
    id: string | number;
    doctor: {
        name: string;
        specialty: string;
        avatarUrl?: string; // Opcional
    };
    date: string; // Ex: "20/10/2025" ou "Hoje"
    time?: string; // Ex: "10:00 - 11:00" (Opcional para histórico)
    status: 'scheduled' | 'completed' | 'canceled';
    type: 'upcoming' | 'history';
}
