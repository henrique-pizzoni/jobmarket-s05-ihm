import { useState } from 'react'
import { ChevronLeft, Bell, SlidersHorizontal } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import VagaCard from '../components/VagaCard'
import { vagas as todasVagas } from '../data/vagas'

const TABS = ['Todas', 'Internas', 'Externas']

export default function ListaVagas({ navigate, vagasFiltradas, filtroInicial = 'todas' }) {
  const lista = vagasFiltradas || todasVagas
  const initialTab = filtroInicial === 'internas' ? 1 : filtroInicial === 'externas' ? 2 : 0
  const [tab, setTab] = useState(initialTab)

  const filtrada = tab === 0
    ? lista
    : tab === 1
    ? lista.filter(v => v.tipo === 'interna')
    : lista.filter(v => v.tipo === 'externa')

  return (
    <div className="screen">
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div className="page-header" style={{ borderBottom: 'none' }}>
          <button className="icon-btn" onClick={() => navigate('buscar')}><ChevronLeft size={22} /></button>
          <span className="header-title">Vagas</span>
          <div className="header-icons">
            <button className="icon-btn" onClick={() => navigate('buscar')}><SlidersHorizontal size={20} /></button>
            <button className="icon-btn"><Bell size={20} /></button>
            <div className="avatar">M</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ borderBottom: 'none', borderTop: '1px solid #E2E8F0' }}>
          {TABS.map((t, i) => (
            <button key={t} className={`tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>
              {t}
              {i > 0 && (
                <span style={{
                  marginLeft: 4, fontSize: 11, fontWeight: 700,
                  background: tab === i ? '#EFF6FF' : '#F1F5F9',
                  color: tab === i ? '#2563EB' : '#94A3B8',
                  padding: '1px 6px', borderRadius: 20,
                }}>
                  {i === 1
                    ? lista.filter(v => v.tipo === 'interna').length
                    : lista.filter(v => v.tipo === 'externa').length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="screen-content" style={{ padding: '16px 20px 0' }}>
        <p style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>
          {filtrada.length} vaga{filtrada.length !== 1 ? 's' : ''} encontrada{filtrada.length !== 1 ? 's' : ''}
        </p>

        {filtrada.length > 0 ? (
          <div className="vagas-list">
            {filtrada.map(vaga => (
              <VagaCard key={vaga.id} vaga={vaga} onClick={() => navigate('detalhes', { vaga })} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#64748B', marginBottom: 6 }}>Nenhuma vaga encontrada</p>
            <p style={{ fontSize: 13 }}>Tente ajustar os filtros de busca.</p>
          </div>
        )}
      </div>

      <BottomNav active="mercado" navigate={navigate} />
    </div>
  )
}
