import { Bell, TrendingUp, BookOpen, ChevronRight, Megaphone } from 'lucide-react'
import inatelLogo from '../assets/inatel_logo_png.png'
import BottomNav from '../components/BottomNav'

export default function Home({ navigate }) {
  return (
    <div className="screen">
      {/* Header */}
      <div style={{ background: '#fff', padding: '14px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src={inatelLogo} alt="Inatel" style={{ height: 32, objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="icon-btn"><Bell size={20} /></button>
          <div className="avatar">M</div>
        </div>
      </div>

      <div className="screen-content">
        <div className="home-content" style={{ padding: '20px 20px 0' }}>
          {/* Saudação */}
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1E293B' }}>Olá, Mariana!</h1>
            <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Terça-feira, 20 de maio</p>
          </div>

          {/* Banner Mercado de Trabalho */}
          <div
            className="card"
            onClick={() => navigate('mercado')}
            style={{
              background: 'linear-gradient(135deg, #1B3A6B 0%, #2752C7 100%)',
              padding: '20px',
              marginBottom: 28,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Mercado de Trabalho</h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 14, lineHeight: 1.5, maxWidth: 340 }}>
                Encontre estágios, vagas e oportunidades para impulsionar sua carreira.
              </p>
              <button
                style={{
                  background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: 8, color: '#fff', padding: '8px 14px', fontSize: 13, fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}
              >
                Acessar oportunidades <ChevronRight size={14} />
              </button>
            </div>
            <div style={{ fontSize: 64, marginLeft: 16, opacity: 0.9 }}>💼</div>
          </div>

          {/* Meus Widgets */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B' }}>Meus widgets</h2>
              <button style={{ background: 'transparent', color: '#2563EB', fontSize: 13, fontWeight: 600 }}>Editar</button>
            </div>

            <div className="widgets-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {/* Widget Notas */}
              <div className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <TrendingUp size={14} color="#2563EB" />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Notas</span>
                </div>
                <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>Média geral</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#1B3A6B' }}>8.6</span>
                  <span style={{ fontSize: 11, color: '#10B981', fontWeight: 600, background: '#D1FAE5', padding: '2px 8px', borderRadius: 20 }}>Excelente</span>
                </div>
                <svg width="100%" height="30" viewBox="0 0 100 30" style={{ display: 'block', marginBottom: 8 }}>
                  <polyline points="0,26 20,20 40,22 60,13 80,16 100,8" fill="none" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="0,28 20,22 40,24 60,15 80,18 100,10" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <button style={{ background: 'transparent', color: '#2563EB', fontSize: 11, fontWeight: 600 }}>Ver detalhes</button>
              </div>

              {/* Widget Próximas aulas */}
              <div className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <BookOpen size={14} color="#2563EB" />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Próximas aulas</span>
                </div>
                {[
                  { hora: '10:20', nome: 'Cálculo II', sala: 'Sala 204 - Prédio 2' },
                  { hora: '13:30', nome: 'Redes de Computadores', sala: 'Sala 301 - Prédio 1' },
                ].map((aula) => (
                  <div key={aula.hora} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1B3A6B', minWidth: 40 }}>{aula.hora}</span>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', lineHeight: 1.3 }}>{aula.nome}</p>
                      <p style={{ fontSize: 11, color: '#94A3B8' }}>{aula.sala}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Widget extra no desktop */}
              <div className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <span style={{ fontSize: 14 }}>💼</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Candidaturas</span>
                </div>
                <p style={{ fontSize: 28, fontWeight: 800, color: '#1B3A6B', marginBottom: 4 }}>4</p>
                <p style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>candidaturas enviadas</p>
                <button
                  style={{ background: 'transparent', color: '#2563EB', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}
                  onClick={() => navigate('candidaturas')}
                >
                  Ver status <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Avisos */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B' }}>Avisos</h2>
              <button style={{ background: 'transparent', color: '#2563EB', fontSize: 13, fontWeight: 600 }}>Ver todos</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { titulo: 'Feira de Estágios Inatel', texto: 'Participe da nossa feira e conecte-se com empresas parceiras.' },
                { titulo: 'Período de matrículas aberto', texto: 'As matrículas para o próximo semestre estão abertas até 30/06.' },
              ].map(({ titulo, texto }) => (
                <div key={titulo} className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Megaphone size={18} color="#2563EB" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', marginBottom: 3 }}>{titulo}</p>
                    <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5, marginBottom: 6 }}>{texto}</p>
                    <button style={{ background: 'transparent', color: '#2563EB', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                      Saiba mais <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="home" navigate={navigate} />
    </div>
  )
}
