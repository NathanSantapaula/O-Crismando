import { useState } from 'react'
import Personagem from '../components/Personagem'

// Referência x desenho, lado a lado: abra /?comparar
const REF = { jesus: '15a0266b', maria: '4daa6a5c', jose: '5bb66c05', pedro: 'e8b4804e', agostinho: 'd4102e0d', carlo: 'eb6eb0cf' }
export default function Comparar() {
  const [falando, setFalando] = useState(false)
  return (
    <main className="min-h-dvh bg-[#454545] p-4 text-white">
      <button className="btn btn-sol mb-4 !w-auto" onClick={() => setFalando(!falando)}>{falando ? 'Parar de falar' : 'Falar'}</button>
      {Object.entries(REF).map(([id, f]) => (
        <div key={id} className="mb-8 flex flex-wrap items-end gap-6">
          <img src={`/arte-original/${f}-image.jpg`} alt={`referência ${id}`} className="h-[420px] rounded-xl" />
          <Personagem id={id} size={240} falando={falando} />
          <Personagem id={id} mini size={110} falando={falando} />
          <Personagem id={id} busto size={110} falando={falando} />
        </div>
      ))}
    </main>
  )
}
