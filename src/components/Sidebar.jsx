import { Home, BookOpen, LayoutGrid, Briefcase, Settings, Bell } from 'lucide-react'
import inatelLogo from '../assets/inatel_logo_png.png'

const items = [
  { id: 'home',     label: 'Início',        Icon: Home },
  { id: 'acad',     label: 'Acadêmico',     Icon: BookOpen },
  { id: 'servicos', label: 'Serviços',      Icon: LayoutGrid },
  { id: 'mercado',  label: 'Mercado',       Icon: Briefcase },
  { id: 'config',   label: 'Configurações', Icon: Settings },
]

export default function Sidebar({ active, navigate }) {
  const handleClick = (id) => {
    if (id === 'home') navigate('home')
    else if (id === 'mercado') navigate('mercado')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={inatelLogo} alt="Inatel" style={{ height: 36, objectFit: 'contain' }} />
      </div>

      <nav className="sidebar-nav">
        {items.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`sidebar-item ${active === id ? 'active' : ''}`}
            onClick={() => handleClick(id)}
          >
            <Icon size={20} strokeWidth={active === id ? 2.2 : 1.8} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <div className="avatar" style={{ flexShrink: 0 }}>M</div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Mariana Silva</p>
            <p style={{ fontSize: 11, color: '#94A3B8' }}>Engenharia — 7º per.</p>
          </div>
        </div>
        <button className="icon-btn" style={{ flexShrink: 0 }}><Bell size={16} /></button>
      </div>
    </aside>
  )
}
