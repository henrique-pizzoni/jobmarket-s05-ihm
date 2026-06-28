import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import MercadoTrabalho from './pages/MercadoTrabalho'
import MeuPerfil from './pages/MeuPerfil'
import BuscarVagas from './pages/BuscarVagas'
import ListaVagas from './pages/ListaVagas'
import DetalhesVaga from './pages/DetalhesVaga'
import MinhasCandidaturas from './pages/MinhasCandidaturas'
import { candidaturasIniciais } from './data/candidaturas'

const screenToNav = {
  home: 'home',
  mercado: 'mercado',
  perfil: 'mercado',
  buscar: 'mercado',
  lista: 'mercado',
  detalhes: 'mercado',
  candidaturas: 'mercado',
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [params, setParams] = useState({})
  const [candidaturas, setCandidaturas] = useState(candidaturasIniciais)

  const navigate = (s, p = {}) => {
    setParams(p)
    setScreen(s)
    window.scrollTo(0, 0)
  }

  const handleCandidatar = (vaga) => {
    const jaExiste = candidaturas.some(
      c => c.vagaTitulo === vaga.titulo && c.empresa === vaga.empresa
    )
    if (jaExiste) return false
    setCandidaturas(prev => [{
      id: Date.now(),
      vagaTitulo: vaga.titulo,
      empresa: vaga.empresa,
      dataEnvio: new Date().toLocaleDateString('pt-BR'),
      status: 'em_analise',
      tipo: vaga.tipo,
    }, ...prev])
    return true
  }

  const activeNav = screenToNav[screen] || 'home'

  return (
    <>
      <Sidebar navigate={navigate} active={activeNav} />

      {screen === 'home'         && <Home navigate={navigate} />}
      {screen === 'mercado'      && <MercadoTrabalho navigate={navigate} />}
      {screen === 'perfil'       && <MeuPerfil navigate={navigate} />}
      {screen === 'buscar'       && <BuscarVagas navigate={navigate} />}
      {screen === 'lista'        && (
        <ListaVagas
          navigate={navigate}
          vagasFiltradas={params.vagasFiltradas}
          filtroInicial={params.filtroInicial}
        />
      )}
      {screen === 'detalhes'     && (
        <DetalhesVaga
          navigate={navigate}
          vaga={params.vaga}
          onCandidatar={handleCandidatar}
          jaInscrito={candidaturas.some(
            c => c.vagaTitulo === params.vaga?.titulo && c.empresa === params.vaga?.empresa
          )}
        />
      )}
      {screen === 'candidaturas' && (
        <MinhasCandidaturas navigate={navigate} candidaturas={candidaturas} />
      )}
    </>
  )
}
