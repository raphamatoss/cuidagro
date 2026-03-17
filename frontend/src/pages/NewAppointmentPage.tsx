// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronLeft, Calendar, MapPin, Stethoscope } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { useModal } from '../contexts/useModalContext';
// import { appointmentService } from '../services/appointmentService';
// import type { Appointment, Medico, Local } from '../types/appointment';

// export default function NewAppointmentPage() {
//     const navigate = useNavigate();
//     const { user } = useAuth();
//     const { showModal } = useModal();

//     const [selectedDoc, setSelectedDoc] = useState<string>(DOCTORS_MOCK[0].cpf);
//     const [selectedDate, setSelectedDate] = useState('');
//     const [selectedTime, setSelectedTime] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!user?.cpf) return;

//         setIsSubmitting(true);

//         try {
//             const medicoObj = DOCTORS_MOCK.find((d) => d.cpf === selectedDoc)!;
//             const localObj = LOCATIONS_MOCK[0];

//             const newAppointment: Appointment = {
//                 diaHora: `${selectedDate}T${selectedTime}:00`, 
//                 medico: medicoObj,
//                 local: localObj,
//                 agricultor: { cpf: user.cpf }, 
//                 status: 'PENDENTE',
//             };

//             console.log('Enviando agendamento:', newAppointment);

//             await appointmentService.schedule(newAppointment);

//             showModal({
//                 type: 'success',
//                 title: 'Agendamento Realizado!',
//                 description: 'Sua consulta foi marcada com sucesso.',
//                 onConfirm: () => navigate('/appointments'),
//             });
//         } catch (error) {
//             console.error(error);
//             showModal({
//                 type: 'error',
//                 title: 'Erro ao Agendar',
//                 description: 'Verifique os dados e tente novamente.',
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="flex min-h-screen flex-col bg-gray-50 pb-20">
//             <header className="bg-white px-4 py-4 shadow-sm flex items-center gap-4">
//                 <button
//                     onClick={() => navigate(-1)}
//                     className="p-2 rounded-full hover:bg-gray-100"
//                 >
//                     <ChevronLeft size={24} className="text-gray-600" />
//                 </button>
//                 <h1 className="text-lg font-bold text-gray-800">
//                     Novo Agendamento
//                 </h1>
//             </header>

//             <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
//                 <section className="bg-white p-5 rounded-2xl shadow-sm">
//                     <div className="flex items-center gap-2 mb-4 text-agro-blue font-bold">
//                         <Stethoscope size={20} /> Escolha o Especialista
//                     </div>
//                     <select
//                         className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-200"
//                         value={selectedDoc}
//                         onChange={(e) => setSelectedDoc(e.target.value)}
//                     >
//                         {DOCTORS_MOCK.map((doc) => (
//                             <option key={doc.cpf} value={doc.cpf}>
//                                 {doc.nome} - {doc.especialidade}
//                             </option>
//                         ))}
//                     </select>
//                 </section>

//                 <section className="bg-white p-5 rounded-2xl shadow-sm">
//                     <div className="flex items-center gap-2 mb-4 text-agro-blue font-bold">
//                         <Calendar size={20} /> Data e Hora
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="text-xs text-gray-500 font-bold ml-1 mb-1 block">
//                                 Data
//                             </label>
//                             <input
//                                 type="date"
//                                 required
//                                 className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
//                                 value={selectedDate}
//                                 onChange={(e) =>
//                                     setSelectedDate(e.target.value)
//                                 }
//                             />
//                         </div>
//                         <div>
//                             <label className="text-xs text-gray-500 font-bold ml-1 mb-1 block">
//                                 Horário
//                             </label>
//                             <input
//                                 type="time"
//                                 required
//                                 className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
//                                 value={selectedTime}
//                                 onChange={(e) =>
//                                     setSelectedTime(e.target.value)
//                                 }
//                             />
//                         </div>
//                     </div>
//                 </section>

//                 <section className="bg-white p-5 rounded-2xl shadow-sm opacity-80">
//                     <div className="flex items-center gap-2 mb-2 text-gray-500 font-bold">
//                         <MapPin size={20} /> Local de Atendimento
//                     </div>
//                     <p className="text-gray-700 text-sm">
//                         {LOCATIONS_MOCK[0].logradouro},{' '}
//                         {LOCATIONS_MOCK[0].numero}
//                     </p>
//                     <p className="text-gray-500 text-xs">
//                         {LOCATIONS_MOCK[0].cidade} - {LOCATIONS_MOCK[0].estado}
//                     </p>
//                 </section>

//                 <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="mt-4 w-full h-14 bg-agro-blue text-white rounded-full font-bold text-lg shadow-lg hover:bg-blue-800 disabled:opacity-70"
//                 >
//                     {isSubmitting ? 'Confirmando...' : 'Confirmar Agendamento'}
//                 </button>
//             </form>
//         </div>
//     );
// }
