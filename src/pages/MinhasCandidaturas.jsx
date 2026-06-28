import { useState } from 'react'
import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { statusLabel } from '../data/candidaturas'
import { vagas } from '../data/vagas'

const TABS = [
  { key: 'todas',       label: 'Todas' },
  { key: 'em_analise',  label: 'Em análise' },
  { key: 'aprovado',    label: 'Aprovadas' },
  { key: 'rejeitado',   label: 'Rejeitadas' },
  { key: 'finalizado',  label: 'Finalizadas' },
]

export default function MinhasCandidaturas({ navigate, candidaturas }) {
  const [tab, setTab] = useState('todas')

  const abrirVaga = (c) => {
    const vaga = vagas.find(v => v.titulo === c.vagaTitulo && v.empresa === c.empresa)
    if (vaga) navigate('detalhes', { vaga })
  }

  const filtradas = tab === 'todas'
    ? candidaturas
    : candidaturas.filter(c => c.status === tab)

  return (
    <div className="screen">
      <div className="page-header">
        <button className="icon-btn" onClick={() => navigate('mercado')}><ChevronLeft size={22} /></button>
        <span className="header-title">Minhas Candidaturas</span>
        <div style={{ width: 36 }} />
      </div>

      {/* Tabs scroll */}
      <div
        style={{
          display: 'flex', overflowX: 'auto', background: '#fff',
          borderBottom: '1px solid #E2E8F0', scrollbarWidth: 'none', position: 'sticky', top: 57, zIndex: 9,
        }}
      >
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            className={`tab ${tab === key ? 'active' : ''}`}
            style={{ whiteSpace: 'nowrap', paddingLeft: 16, paddingRight: 16 }}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="screen-content" style={{ padding: '16px 20px 0' }}>
        {filtradas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94A3B8' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#64748B', marginBottom: 6 }}>Nenhuma candidatura</p>
            <p style={{ fontSize: 13 }}>Suas candidaturas aparecerão aqui.</p>
          </div>
        ) : (
          <div className="card" style={{ overflow: 'hidden' }}>
            {filtradas.map((c, i) => (
              <div
                key={c.id}
                onClick={() => abrirVaga(c)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                  borderBottom: i < filtradas.length - 1 ? '1px solid #F1F5F9' : 'none',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Ícone empresa */}
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: c.tipo === 'interna' ? '#EFF6FF' : '#FFF7ED',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Building2 size={20} color={c.tipo === 'interna' ? '#2563EB' : '#EA580C'} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.vagaTitulo}
                  </p>
                  <p style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{c.empresa}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8' }}>Candidatura enviada em {c.dataEnvio}</p>
                </div>

                {/* Status + chevron */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <span className={`status-badge status-${c.status}`}>
                    {statusLabel[c.status]}
                  </span>
                  <ChevronRight size={14} color="#CBD5E1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="mercado" navigate={navigate} />
    </div>
  )
}
