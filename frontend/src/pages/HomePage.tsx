import { 
  Activity, 
  Sprout, 
  Calendar, 
  Stethoscope, 
  User, 
  Bell, 
  Menu,
  SmilePlus,
  Home as HomeIcon,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NavItem } from '../components/NavItem';

export default function HomePage() {
  const navigate = useNavigate();

  // Dados do menu para gerar o grid dinamicamente
  const menuItems = [
    {
      title: "Minha Saúde",
      description: "Ficha de saúde pessoal",
      icon: Activity,
      color: "bg-blue-100 text-blue-600",
      route: "/saude"
    },
    {
      title: "Agrotóxicos",
      description: "Catálogo e Segurança",
      icon: Sprout,
      color: "bg-green-100 text-green-600",
      route: "/agrotoxicos"
    },
    {
      title: "Minhas Consultas",
      description: "Histórico e Agendamento",
      icon: Calendar,
      color: "bg-purple-100 text-purple-600",
      route: "/consultas"
    },
    {
      title: "Falar com Médico",
      description: "Telemedicina",
      icon: Stethoscope,
      color: "bg-orange-100 text-orange-600",
      route: "/medico"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 ">
      
      <header className="px-6 pt-12 pb-6 flex items-center justify-between bg-white shadow-sm sticky top-0 z-10">
        <div>
          <p className="text-gray-500 text-sm font-medium">Boa tarde,</p>
          <h1 className="text-2xl font-bold text-gray-800">
            João da Silva
          </h1>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell className="text-gray-600" size={24} />
          {/* Bolinha de notificação */}
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
      </header>

      <main className="px-6 mt-6 flex flex-col gap-6 pb-28">
        
        {/* Card de "Check-in diário" */}
        <div className="relative overflow-hidden rounded-3xl bg-agro-blue p-6 text-white shadow-lg shadow-blue-200">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Como você está hoje?</h2>
            <p className="text-blue-100 text-sm mb-4 max-w-50">
              Registre seus sintomas para manter seu médico atualizado.
            </p>
            <button 
              onClick={() => navigate('/symptoms')}
              className="bg-white text-agro-blue px-6 py-3 rounded-full font-bold text-sm shadow-md active:scale-95 active:bg-white/90 transition-transform flex items-center gap-2 "
            >
              <SmilePlus size={20} />
              Fazer Check-in
            </button>
          </div>
          
          {/* Elemento decorativo de fundo */}
          <div className="absolute -right-6 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute right-4 top-6 text-white/20">
            <Activity size={80} />
          </div>
        </div>

        {/* Grid de funcionalidades */}
        <div>
          <h3 className="text-gray-700 font-bold mb-4 text-lg">Acesso Rápido</h3>
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.route)}
                className="flex flex-col items-start p-4 gap-1 text-center bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98] justify-between"
              >
                <div className={`p-3 rounded-xl mb-2 w-full flex justify-center ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <span className="font-bold text-gray-800 mx-auto leading-tight">
                  {item.title}
                </span>
                <span className="text-xs text-gray-400 mt-2 mx-auto text-center">
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Barra de navegação inferior  */}
      <nav className="fixed bottom-3 left-6 right-6 bg-white rounded-2xl shadow-[0px_-2px_15px_0px_rgba(209,201,205,0.55)]  shadow-gray-200/50 border border-gray-100 px-6 py-4 flex justify-between items-center z-50">
        <NavItem icon={HomeIcon} label="Início" isActive />
        <NavItem icon={Search} label="Buscar" />
        
        {/* Botão central de destaque */}
        <div className="-mt-8">
            <button className="bg-agro-blue p-4 rounded-full shadow-lg shadow-blue-300 text-white hover:bg-blue-700 transition-colors">
                <User size={28} />
            </button>
        </div>

        <NavItem icon={Calendar} label="Agenda" />
        <NavItem icon={Menu} label="Menu" />
      </nav>

    </div>
  );
}

