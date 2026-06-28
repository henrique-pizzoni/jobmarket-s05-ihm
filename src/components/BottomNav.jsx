import { Home, BookOpen, LayoutGrid, Briefcase, Settings } from 'lucide-react'

const items = [
  { id: 'home',     label: 'Início',        Icon: Home },
  { id: 'acad',     label: 'Acadêmico',     Icon: BookOpen },
  { id: 'servicos', label: 'Serviços',      Icon: LayoutGrid },
  { id: 'mercado',  label: 'Mercado',       Icon: Briefcase },
  { id: 'config',   label: 'Configurações', Icon: Settings },
]

export default function BottomNav({ active = 'home', navigate }) {
  const handleClick = (id) => {
    if (id === 'home')    navigate('home')
    else if (id === 'mercado') navigate('mercado')
  }

  return (
    <nav className="bottom-nav">
      {items.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`nav-item ${active === id ? 'active' : ''}`}
          onClick={() => handleClick(id)}
        >
          <Icon size={22} strokeWidth={active === id ? 2.2 : 1.8} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
