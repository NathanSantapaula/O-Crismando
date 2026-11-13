import Boneco, { OPCOES } from '../components/Boneco'

// conferência: todo penteado em todo formato de cabeça (abra /?cabelos no modo dev)
export default function GradeCabelo() {
  return (
    <main className="min-h-dvh bg-ground p-3">
      {OPCOES.formato.map(f => (
        <div key={f} className="mb-2 flex flex-wrap gap-1">
          {OPCOES.cabelo.map(c => <div key={c} className="rounded bg-surface"><Boneco spec={{ formato: f, cabelo: c, corCabelo: '#7A4A2A' }} busto size={64} /></div>)}
        </div>
      ))}
    </main>
  )
}
