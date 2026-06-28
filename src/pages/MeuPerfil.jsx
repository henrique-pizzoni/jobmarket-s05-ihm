import { useState } from 'react'
import { ChevronLeft, Bell, CheckCircle2, Circle, FileText, X, Plus, Upload } from 'lucide-react'
import BottomNav from '../components/BottomNav'

const areasOpcoes = [
  'Desenvolvimento', 'Redes', 'IoT', 'Inteligência Artificial',
  'Cloud Computing', 'Sistemas', 'Eletrônica', 'Telecomunicações',
]

export default function MeuPerfil({ navigate }) {
  const [areas, setAreas] = useState(['Desenvolvimento', 'Redes', 'IoT', 'Inteligência Artificial', 'Cloud Computing'])
  const [curriculo] = useState({ nome: 'curriculo_mariana_silva.pdf', tamanho: '1.2 MB' })
  const [adicionando, setAdicionando] = useState(false)
  const [saved, setSaved] = useState(false)

  const removeArea = (a) => setAreas(prev => prev.filter(x => x !== a))
  const addArea = (a) => {
    if (!areas.includes(a)) setAreas(prev => [...prev, a])
    setAdicionando(false)
  }

  const sections = [
    { label: 'Dados acadêmicos', done: true },
    { label: 'Experiência profissional', done: true },
    { label: 'Competências', done: true },
  ]

  const completo = Math.round((areas.length > 0 ? 70 : 55) + (curriculo ? 0 : 0))

  return (
    <div className="screen">
      <div className="page-header">
        <button className="icon-btn" onClick={() => navigate('mercado')}><ChevronLeft size={22} /></button>
        <span className="header-title">Meu Perfil</span>
        <div className="header-icons">
          <button className="icon-btn"><Bell size={20} /></button>
          <div className="avatar">M</div>
        </div>
      </div>

      <div className="screen-content" style={{ padding: '20px' }}>
        {/* Progress */}
        <div className="card" style={{ padding: '16px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1E293B' }}>Perfil completo</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#2563EB' }}>{completo}%</span>
          </div>
          <div style={{ height: 8, background: '#E2E8F0', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${completo}%`, background: 'linear-gradient(90deg, #2563EB, #60A5FA)', borderRadius: 4, transition: 'width 0.4s' }} />
          </div>
        </div>

        {/* Seções simples */}
        <div className="card" style={{ marginBottom: 16, overflow: 'hidden' }}>
          {sections.map(({ label, done }, i) => (
            <div
              key={label}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px',
                borderBottom: i < sections.length - 1 ? '1px solid #F1F5F9' : 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: '#1E293B' }}>{label}</span>
              {done
                ? <CheckCircle2 size={20} color="#10B981" fill="#D1FAE5" />
                : <Circle size={20} color="#CBD5E1" />}
            </div>
          ))}
        </div>

        {/* Áreas de interesse */}
        <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1E293B' }}>Áreas de interesse</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>Selecione até 5 áreas</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            {areas.map(a => (
              <span key={a} className="filter-chip">
                {a}
                <button onClick={() => removeArea(a)} style={{ display: 'flex', alignItems: 'center', background: 'transparent', color: '#64748B', padding: 0, marginLeft: 2 }}>
                  <X size={12} />
                </button>
              </span>
            ))}
            {areas.length < 5 && !adicionando && (
              <button
                className="filter-chip"
                style={{ background: '#F8FAFC', borderStyle: 'dashed', color: '#64748B', cursor: 'pointer' }}
                onClick={() => setAdicionando(true)}
              >
                <Plus size={12} />
                Adicionar área
              </button>
            )}
          </div>

          {adicionando && (
            <div style={{ background: '#F8FAFC', borderRadius: 10, padding: 12 }}>
              <p style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>Escolha uma área:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {areasOpcoes.filter(a => !areas.includes(a)).map(a => (
                  <button
                    key={a}
                    onClick={() => addArea(a)}
                    style={{
                      padding: '5px 12px', borderRadius: 20, border: '1px solid #E2E8F0',
                      background: '#fff', fontSize: 12, color: '#1E293B', cursor: 'pointer',
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setAdicionando(false)}
                style={{ marginTop: 10, background: 'transparent', color: '#94A3B8', fontSize: 12 }}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        {/* Currículo PDF */}
        <div className="card" style={{ padding: '16px', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1E293B' }}>Currículo (PDF)</span>
            <span style={{ fontSize: 12, color: '#64748B' }}>Anexe seu currículo atualizado</span>
          </div>

          {curriculo ? (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
              background: '#F0FDF4', borderRadius: 10, border: '1px solid #A7F3D0',
            }}>
              <FileText size={28} color="#EA580C" />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>{curriculo.nome}</p>
                <p style={{ fontSize: 12, color: '#64748B' }}>{curriculo.tamanho}</p>
              </div>
              <CheckCircle2 size={20} color="#10B981" />
            </div>
          ) : (
            <button
              style={{
                width: '100%', padding: '20px', borderRadius: 10, border: '2px dashed #CBD5E1',
                background: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}
            >
              <Upload size={22} color="#94A3B8" />
              <span style={{ fontSize: 13, color: '#64748B' }}>Clique para fazer upload do PDF</span>
            </button>
          )}
        </div>

        {/* Salvar */}
        <button
          className="btn-primary"
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
          style={{ background: saved ? '#10B981' : '#1B3A6B', transition: 'background 0.3s' }}
        >
          {saved ? '✓ Perfil salvo!' : 'Salvar perfil'}
        </button>
      </div>

      <BottomNav active="mercado" navigate={navigate} />
    </div>
  )
}
