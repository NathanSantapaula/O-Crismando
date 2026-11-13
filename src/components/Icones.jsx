// Ícones ilustrados próprios: baú, chama da ofensiva e medalhas dos troféus.

export function Bau({ aberto = false, size = 72, apagado = false }) {
  const m = apagado ? ['#3A4A58', '#2C3A46', '#55687A'] : ['#C9862E', '#94591C', '#F2D29B']
  return (
    <svg viewBox="0 0 80 72" width={size} height={size * 0.9} aria-hidden>
      <ellipse cx="40" cy="66" rx="30" ry="5" fill="#000" opacity=".25" />
      {aberto
        ? <path d="M10 22 18 4h44l8 18Z" fill={m[1]} />
        : <path d="M10 30V20Q10 8 22 8h36q12 0 12 12v10Z" fill={m[0]} />}
      <rect x="8" y="28" width="64" height="34" rx="6" fill={m[0]} />
      <rect x="8" y="28" width="64" height="8" fill={m[1]} />
      <rect x="16" y="8" width="8" height="54" rx="2" fill={m[2]} opacity={aberto ? 0 : 1} />
      <rect x="56" y="8" width="8" height="54" rx="2" fill={m[2]} opacity={aberto ? 0 : 1} />
      {aberto && <><rect x="16" y="28" width="8" height="34" fill={m[2]} /><rect x="56" y="28" width="8" height="34" fill={m[2]} /><path d="M24 26q16-16 32 0" fill="#FFDB4D" /></>}
      <circle cx="40" cy="36" r="7" fill={apagado ? '#55687A' : '#FFF4DA'} />
      <rect x="38" y="36" width="4" height="7" rx="2" fill={m[1]} />
    </svg>
  )
}

// Chama de Pentecostes da ofensiva: língua de fogo com rostinho; apagada fica cinza e dormindo
export function Chama({ size = 28, acesa = true, className = '' }) {
  const [fora, meio, dentro] = acesa ? ['#FF7A1A', '#FFA826', '#FFE066'] : ['#3A4A58', '#47596A', '#5B6E80']
  return (
    <svg viewBox="0 0 32 38" width={size} height={size * 1.19} className={className} aria-hidden="true">
      <path d="M16 1c1.5 6 10 9.5 10 20a10 10 0 0 1-20 0c0-5 2.5-8 5-10.5.3 3 1.5 4.8 3 5.5C13.5 10 14 5 16 1Z" fill={fora} />
      <path d="M16 9c1 4 7 6.5 7 13.5a7 7 0 0 1-14 0c0-3.5 1.8-5.6 3.6-7.4.2 2 1.1 3.3 2.2 3.8C14.6 15.5 15 12 16 9Z" fill={meio} />
      <path d="M16 18c.6 2.4 4 3.8 4 7.2a4 4 0 0 1-8 0c0-2 1-3.2 2-4.2.1 1.1.6 1.8 1.2 2.1 0-1.9.2-3.4.8-5.1Z" fill={dentro} />
      {acesa
        ? <><circle cx="13.3" cy="26" r="1.3" fill="#7A2E00" /><circle cx="18.7" cy="26" r="1.3" fill="#7A2E00" /><path d="M14 29q2 1.6 4 0" stroke="#7A2E00" strokeWidth="1.2" fill="none" strokeLinecap="round" /></>
        : <path d="M12 26.5h2.6M17.4 26.5H20" stroke="#26323D" strokeWidth="1.3" strokeLinecap="round" />}
      <path d="M9.5 18q-1 3 0 6" stroke="#fff" strokeOpacity=".45" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// XP = graça: medalhinha dourada com a cruz e brilho
export function Gema({ size = 24 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <circle cx="16" cy="17" r="13" fill="#C98A12" />
      <circle cx="16" cy="15.5" r="13" fill="#FFC800" />
      <circle cx="16" cy="15.5" r="9.5" fill="#FFDB4D" />
      <path d="M14.4 8.5h3.2v4.2h4.2v3.2h-4.2v7.6h-3.2v-7.6h-4.2v-3.2h4.2Z" fill="#C98A12" />
      <path d="M8 11a9 9 0 0 1 5-4.6" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".7" />
      <path d="M26 4l.8 1.8L28.6 6.6 26.8 7.4 26 9.2 25.2 7.4 23.4 6.6 25.2 5.8Z" fill="#FFF3B8" />
    </svg>
  )
}

const DESENHOS = {
  pomba: <g><path d="M-14 4q4-6 12-6 6 0 9-4 4-2 6 1l4 1-4 2q0 8-9 11-10 3-18-5Z" fill="#fff" /><path d="M-4 0q-2-12 10-16 0 10-6 16Z" fill="#E3ECF5" /><circle cx="8" cy="-4" r="1.3" fill="#2361C4" /><path d="M-14 4l-5-1 3 4Z" fill="#fff" /></g>,
  livro: <g><rect x="-11" y="-9" width="22" height="18" rx="2" fill="#fff" /><path d="M-1.5-6h3v12h-3zM-5-2h10v3H-5z" fill="#B3263E" /></g>,
  chama: <g transform="translate(-9 -11) scale(.75)"><path d="M12 1c1 5 7 8 7 15a7 7 0 0 1-14 0c0-4 2-6 4-8 0 3 1 4 2 4 0-4 0-8 1-11Z" fill="#fff" /></g>,
  igreja: <path d="M0-14l3 4h-2v3l9 6v12H-10V-1l9-6v-3h-2Z M-3 11V5h6v6Z" fill="#fff" fillRule="evenodd" />,
  cajado: <path d="M-1 12V-6q0-6 5-6t5 5q0 4-4 4v-3q1 0 1-1t-2-2q-2 0-2 3v18Z" fill="#fff" />,
  sol: <g fill="#fff">{[...Array(8)].map((_, i) => <rect key={i} x="-1.5" y="-13" width="3" height="6" rx="1.5" transform={`rotate(${i * 45})`} />)}<circle r="6" /></g>,
  trofeu: <path d="M-8-10h16v6q0 8-8 9-8-1-8-9ZM-2 5h4v4h4v3H-6V9h4Z" fill="#fff" />,
}
const CORES = { pomba: '#3D8BFF', livro: '#E0455F', chama: '#FF9600', igreja: '#7FB83A', cajado: '#8B5CF6', sol: '#FFC800', trofeu: '#FFC800' }

// Medalha de conquista: fita de duas pontas, aro dourado, disco na cor do troféu e brilho
export function Medalha({ icone = 'trofeu', ativo = true, size = 64 }) {
  const c = ativo ? CORES[icone] || '#FFC800' : '#4A5D70'
  const fita = ativo ? ['#E0455F', '#3D8BFF'] : ['#33475A', '#2A3A4A']
  const aro = ativo ? ['#FFD84D', '#C98A12'] : ['#5B6E80', '#3E5063']
  return (
    <svg viewBox="-34 -34 68 76" width={size} height={size * 1.12} aria-hidden="true">
      <path d="M-15 14-22 40-12 35-6 42 1 16Z" fill={fita[0]} /><path d="M15 14 22 40 12 35 6 42-1 16Z" fill={fita[1]} />
      <circle r="28" cy="2" fill={aro[1]} />
      <circle r="28" fill={aro[0]} />
      {[...Array(16)].map((_, i) => <circle key={i} r="1.6" cx={Math.cos((i / 16) * Math.PI * 2) * 24.5} cy={Math.sin((i / 16) * Math.PI * 2) * 24.5} fill={aro[1]} opacity=".55" />)}
      <circle r="20" fill={c} />
      <path d="M0-20a20 20 0 0 1 20 20H0Z" fill="#000" opacity=".1" />
      <g opacity={ativo ? 1 : 0.4} transform="scale(.82)">{DESENHOS[icone] || DESENHOS.trofeu}</g>
      <path d="M-15-12a19 19 0 0 1 12-9" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity={ativo ? 0.6 : 0.2} />
    </svg>
  )
}

// Ícones da barra inferior: silhueta simples, cor chapada, um detalhe só. Sempre coloridos.
export function NavIcone({ tipo, size = 42 }) {
  const svg = c => <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">{c}</svg>
  switch (tipo) {
    case 'inicio': return svg(<>
      <path d="M24 1.5v10M20 5.2h8" stroke="#FFC800" strokeWidth="3.6" strokeLinecap="round" />
      <path d="M10 27 24 17.5 38 27v13a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5Z" fill="#FFC800" />
      <path d="M6.5 27 24 15.5 41.5 27" stroke="#F04E55" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 45V36.5a4.5 4.5 0 0 1 9 0V45Z" fill="#B05A2C" />
    </>)
    case 'ranking': return svg(<>
      <path d="M24 3.5 40 9.5v12.8C40 33.5 33.2 41.6 24 45c-9.2-3.4-16-11.5-16-22.7V9.5Z" fill="#4FB4FF" />
      <path d="m24 15 3 6.1 6.7 1-4.8 4.7 1.1 6.6-6-3.1-6 3.1 1.1-6.6-4.8-4.7 6.7-1Z" fill="#FFFFFF" />
    </>)
    case 'trofeus': return svg(<>
      <path d="M13 10H7.5C7.5 18 10 22 15 23M35 10h5.5c0 8-2.5 12-7.5 13" stroke="#FFC800" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 5h26v12.5a13 13 0 0 1-26 0Z" fill="#FFC800" />
      <path d="M21 30h6v7h-6Z" fill="#FFC800" />
      <rect x="13" y="36" width="22" height="9" rx="4.5" fill="#B3263E" />
      <rect x="16" y="9" width="3.5" height="10" rx="1.75" fill="#FFF3B8" />
    </>)
    case 'acervo': return svg(<>
      <rect x="8" y="4" width="32" height="40" rx="6" fill="#B3263E" />
      <rect x="8" y="4" width="7" height="40" rx="3" fill="#8E1F35" />
      <circle cx="27" cy="21" r="8.5" fill="none" stroke="#FFC800" strokeWidth="3" />
      <path d="M27 15.5v11M22 19.5h10" stroke="#FFC800" strokeWidth="2.6" strokeLinecap="round" />
      <rect x="19" y="34" width="16" height="3.5" rx="1.75" fill="#FFC800" />
    </>)
    default: return null
  }
}
