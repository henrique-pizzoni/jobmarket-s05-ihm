import { useState } from 'react'
import { ChevronLeft, Bell, Search, X } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { vagas, areasDisponiveis, modalidades, tiposTrabalho } from '../data/vagas'

export default function BuscarVagas({ navigate }) {
  const [busca, setBusca] = useState('')
  const [area, setArea] = useState('Desenvolvimento')
  const [modalidade, setModalidade] = useState('Estágio')
  const [tipo, setTipo] = useState('Presencial')
  const [filtrosAtivos, setFiltrosAtivos] = useState(['Desenvolvimento', 'Redes', 'Estágio', 'Presencial', 'Híbrido'])

  const removeChip = (c) => setFiltrosAtivos(prev => prev.filter(x => x !== c))

  const limpar = () => {
    setFiltrosAtivos([])
    setArea('')
    setModalidade('')
    setTipo('')
    setBusca('')
  }

  const aplicar = () => {
    let resultado = [...vagas]
    if (busca.trim()) {
      const q = busca.toLowerCase()
      resultado = resultado.filter(v =>
        v.titulo.toLowerCase().includes(q) || v.empresa.toLowerCase().includes(q)
      )
    }
    if (area) resultado = resultado.filter(v => v.area === area || v.tags.includes(area))
    if (modalidade) resultado = resultado.filter(v => v.tags.includes(modalidade))
    if (tipo) resultado = resultado.filter(v => v.tags.includes(tipo))
    navigate('lista', { vagasFiltradas: resultado.length > 0 ? resultado : vagas, filtroInicial: 'todas' })
  }

  return (
    <div className="screen">
      <div className="page-header">
        <button className="icon-btn" onClick={() => navigate('mercado')}><ChevronLeft size={22} /></button>
        <span className="header-title">Buscar vagas</span>
        <div className="header-icons">
          <button className="icon-btn"><Bell size={20} /></button>
          <div className="avatar">M</div>
        </div>
      </div>

      <div className="screen-content">
        <div style={{ padding: '16px 20px 0', maxWidth: 800, margin: '0 auto', width: '100%' }}>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar por cargo, empresa ou palavra-chave"
              style={{
                width: '100%', padding: '12px 14px 12px 40px', borderRadius: 12,
                border: '1.5px solid #E2E8F0', background: '#fff', fontSize: 13, color: '#1E293B',
              }}
            />
          </div>

          {/* Filtros */}
          <div className="card" style={{ padding: '18px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1E293B' }}>Filtros</span>
              <button style={{ background: 'transparent', color: '#2563EB', fontSize: 13, fontWeight: 600 }} onClick={limpar}>
                Limpar filtros
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              {[
                { label: 'Área', value: area, setter: setArea, opts: areasDisponiveis },
                { label: 'Modalidade', value: modalidade, setter: setModalidade, opts: modalidades },
                { label: 'Tipo de trabalho', value: tipo, setter: setTipo, opts: tiposTrabalho },
              ].map(({ label, value, setter, opts }) => (
                <div key={label}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 6 }}>{label}</label>
                  <select
                    value={value}
                    onChange={e => setter(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 10,
                      border: '1.5px solid #E2E8F0', background: '#fff', fontSize: 13, color: '#1E293B',
                      appearance: 'none',
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                      backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
                    }}
                  >
                    <option value="">Selecione</option>
                    {opts.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {/* Chips filtros ativos */}
            {filtrosAtivos.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 10 }}>Filtros ativos</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {filtrosAtivos.map(c => (
                    <span key={c} className="filter-chip">
                      {c}
                      <button onClick={() => removeChip(c)} style={{ display: 'flex', alignItems: 'center', background: 'transparent', color: '#2563EB', padding: 0 }}>
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="btn-primary" onClick={aplicar} style={{ marginBottom: 14 }}>
            Aplicar filtros
          </button>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#64748B' }}>
            {vagas.length} vagas encontradas
          </p>
        </div>
      </div>

      <BottomNav active="mercado" navigate={navigate} />
    </div>
  )
}
