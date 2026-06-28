import { Bell, ChevronLeft, Briefcase, Globe, User, ClipboardList, ChevronRight } from 'lucide-react'
import inatelLogo from '../assets/inatel_logo_png.png'
import BottomNav from '../components/BottomNav'
import VagaCard from '../components/VagaCard'
import { vagas } from '../data/vagas'

const quickItems = [
  { id: 'internas',     label: 'Vagas Internas',      Icon: Briefcase,     color: '#EFF6FF', iconColor: '#2563EB' },
  { id: 'externas',     label: 'Vagas Externas',      Icon: Globe,         color: '#FFF7ED', iconColor: '#EA580C' },
  { id: 'perfil',       label: 'Meu Perfil',          Icon: User,          color: '#F0FDF4', iconColor: '#10B981' },
  { id: 'candidaturas', label: 'Minhas Candidaturas', Icon: ClipboardList, color: '#FAF5FF', iconColor: '#8B5CF6' },
]

export default function MercadoTrabalho({ navigate }) {
  const destaque = vagas.slice(0, 4)

  const handleQuick = (id) => {
    if (id === 'perfil') navigate('perfil')
    else if (id === 'candidaturas') navigate('candidaturas')
    else if (id === 'internas') navigate('lista', { filtroInicial: 'internas' })
    else if (id === 'externas') navigate('lista', { filtroInicial: 'externas' })
  }

  return (
    <div className="screen">
      {/* Header azul */}
      <div style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2752C7 100%)', padding: '16px 20px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button className="icon-btn" style={{ color: 'rgba(255,255,255,0.8)' }} onClick={() => navigate('home')}>
            <ChevronLeft size={24} />
          </button>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="icon-btn" style={{ color: 'rgba(255,255,255,0.8)' }}><Bell size={20} /></button>
            <div className="avatar">M</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <img src={inatelLogo} alt="Inatel" style={{ height: 28, objectFit: 'contain', marginBottom: 10, filter: 'brightness(0) invert(1)', opacity: 0.95 }} />
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Mercado de Trabalho</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5, maxWidth: 300 }}>
              Explore oportunidades e construa o seu futuro.
            </p>
          </div>
          <div style={{ fontSize: 56, marginTop: 4 }}>💼</div>
        </div>
      </div>

      <div className="screen-content">
        <div className="mercado-content" style={{ padding: '20px 20px 0', marginTop: -14 }}>
          {/* Quick access */}
          <div className="card" style={{ padding: '18px', marginBottom: 28, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {quickItems.map(({ id, label, Icon, color, iconColor }) => (
              <button
                key={id}
                onClick={() => handleQuick(id)}
                style={{ background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '4px 0' }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 15, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={24} color={iconColor} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#475569', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
              </button>
            ))}
          </div>

          {/* Vagas em destaque */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E293B' }}>Vagas em destaque</h2>
              <button
                style={{ background: 'transparent', color: '#2563EB', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}
                onClick={() => navigate('buscar')}
              >
                Ver todas <ChevronRight size={14} />
              </button>
            </div>

            <div className="vagas-list">
              {destaque.map(vaga => (
                <VagaCard key={vaga.id} vaga={vaga} onClick={() => navigate('detalhes', { vaga })} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="mercado" navigate={navigate} />
    </div>
  )
}
