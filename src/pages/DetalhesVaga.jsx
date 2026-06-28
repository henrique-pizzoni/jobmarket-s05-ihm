import { useState } from 'react'
import { ChevronLeft, Bookmark, BookmarkCheck, Building2, MapPin, CheckCircle2, AlertTriangle, ExternalLink, ClipboardList } from 'lucide-react'

export default function DetalhesVaga({ navigate, vaga, onCandidatar }) {
  const [tab, setTab] = useState('vaga')
  const [saved, setSaved] = useState(false)
  const [modal, setModal] = useState(null)

  if (!vaga) return null
  const isInterna = vaga.tipo === 'interna'

  const handleCandidatar = () => {
    if (!isInterna) { setModal('redir'); return }
    const nova = onCandidatar(vaga)
    setModal(nova ? 'sucesso' : 'ja_inscrito')
  }

  const handleFechar = () => {
    setModal(null)
    if (modal === 'sucesso') navigate('candidaturas')
  }

  return (
    <div className="screen" style={{ background: '#fff' }}>
      {/* Header */}
      <div style={{
        background: '#fff', padding: '12px 20px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button className="icon-btn" onClick={() => navigate('lista')}><ChevronLeft size={22} /></button>
        <button
          className="icon-btn"
          style={{ color: saved ? '#2563EB' : '#94A3B8' }}
          onClick={() => setSaved(s => !s)}
        >
          {saved ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}
        </button>
      </div>

      {/* Conteúdo */}
      <div className="detalhes-content" style={{ padding: '24px 20px 110px', maxWidth: 760, margin: '0 auto' }}>
        <span className={`badge-tipo badge-${vaga.tipo}`} style={{ marginBottom: 14, display: 'inline-block' }}>
          {isInterna ? 'Interna' : 'Externa'}
        </span>

        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1E293B', marginBottom: 12, lineHeight: 1.3 }}>
          {vaga.titulo}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: '#64748B', fontSize: 14 }}>
          <Building2 size={15} />
          <span>{vaga.empresa}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, color: '#64748B', fontSize: 14 }}>
          <MapPin size={15} />
          <span>{vaga.local}</span>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
          {vaga.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', marginBottom: 24 }}>
          {[['vaga', 'Sobre a vaga'], ['empresa', 'Empresa']].map(([key, label]) => (
            <button
              key={key}
              className={`tab ${tab === key ? 'active' : ''}`}
              style={{ flex: 'none', paddingLeft: 0, paddingRight: 28, fontSize: 14 }}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'vaga' ? (
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 10 }}>Descrição</h3>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.8, marginBottom: 24 }}>{vaga.descricao}</p>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>Responsabilidades</h3>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {vaga.responsabilidades.map((r, i) => (
                <li key={i} style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{r}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 10 }}>Sobre a empresa</h3>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.8 }}>{vaga.sobreEmpresa || 'Informações sobre a empresa em breve.'}</p>
          </div>
        )}
      </div>

      {/* Botão fixo */}
      <div className="detalhes-fixed-btn" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '14px 20px 20px', background: '#fff', borderTop: '1px solid #E2E8F0',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {isInterna ? (
            <button className="btn-primary" onClick={handleCandidatar}>Candidatar-se</button>
          ) : (
            <button className="btn-orange" onClick={handleCandidatar}>
              Ver no site da empresa <ExternalLink size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Modal Sucesso */}
      {modal === 'sucesso' && (
        <div className="overlay">
          <div className="modal-card">
            <div style={{ width: 70, height: 70, borderRadius: 35, background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <CheckCircle2 size={38} color="#10B981" />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1E293B', marginBottom: 10 }}>
              Candidatura enviada com sucesso!
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, marginBottom: 24 }}>
              Seu currículo foi enviado para análise. Você pode acompanhar o status em Minhas Candidaturas.
            </p>
            <button className="btn-primary" onClick={handleFechar}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal Já inscrito */}
      {modal === 'ja_inscrito' && (
        <div className="overlay">
          <div className="modal-card">
            <div style={{ width: 70, height: 70, borderRadius: 35, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <ClipboardList size={36} color="#2563EB" />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1E293B', marginBottom: 10 }}>
              Você já está inscrito!
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, marginBottom: 24 }}>
              Sua candidatura para esta vaga já foi enviada. Acompanhe o status em Minhas Candidaturas.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-outline" onClick={() => setModal(null)}>Fechar</button>
              <button className="btn-primary" style={{ flex: 1 }} onClick={() => { setModal(null); navigate('candidaturas') }}>
                Ver candidaturas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Redirecionamento */}
      {modal === 'redir' && (
        <div className="overlay">
          <div className="modal-card">
            <div style={{ width: 70, height: 70, borderRadius: 35, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <AlertTriangle size={38} color="#F59E0B" />
            </div>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1E293B', marginBottom: 10 }}>
              Você será redirecionado para o site da empresa parceira.
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, marginBottom: 24 }}>
              A candidatura será realizada no site externo.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-outline" onClick={() => setModal(null)}>Cancelar</button>
              <button
                style={{ flex: 1, padding: 12, borderRadius: 10, background: '#EA580C', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                onClick={() => { setModal(null); window.open(vaga.urlEmpresa || '#', '_blank') }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
