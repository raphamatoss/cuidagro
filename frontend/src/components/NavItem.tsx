export function NavItem({ icon: Icon, label, isActive = false }: 
    { icon: React.ElementType, label: string, isActive?: boolean }) {
    return (
        <button className={`flex flex-col items-center gap-1 ${isActive ? 'text-agro-blue' : 'text-gray-400'}`}>
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{label}</span>
        </button>
    )
}