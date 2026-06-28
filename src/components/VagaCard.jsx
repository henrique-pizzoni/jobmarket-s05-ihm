import { useState } from 'react'
import { Building2, MapPin, Bookmark, BookmarkCheck } from 'lucide-react'

export default function VagaCard({ vaga, onClick, compact = false }) {
  const [saved, setSaved] = useState(false)

  return (
    <div
      className="card slide-up"
      style={{ padding: '14px 16px', cursor: 'pointer' }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span className={`badge-tipo badge-${vaga.tipo}`}>{vaga.tipo === 'interna' ? 'Interna' : 'Externa'}</span>
        <button
          style={{ background: 'transparent', color: saved ? '#2563EB' : '#94A3B8', padding: 0 }}
          onClick={(e) => { e.stopPropagation(); setSaved(s => !s) }}
          aria-label="Salvar vaga"
        >
          {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
        </button>
      </div>

      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 6, lineHeight: 1.3 }}>
        {vaga.titulo}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4, color: '#64748B', fontSize: 13 }}>
        <Building2 size={13} />
        <span>{vaga.empresa}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10, color: '#64748B', fontSize: 13 }}>
        <MapPin size={13} />
        <span>{vaga.local}</span>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {vaga.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {!compact && (
        <p style={{ fontSize: 12, color: '#94A3B8' }}>Publicado há {vaga.publicadoHa}</p>
      )}
    </div>
  )
}
