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

export function Chama({ size = 28, acesa = true, className = '' }) {
  return (
    <svg viewBox="0 0 24 28" width={size} height={size * 1.15} className={className} aria-hidden>
      <path d="M12 1c1 5 7 8 7 15a7 7 0 0 1-14 0c0-4 2-6 4-8 0 3 1 4 2 4 0-4 0-8 1-11Z" fill={acesa ? '#FF9600' : '#3A4A58'} />
      <path d="M12 12c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 0 1 1 2 1 2 0-2 0-4 1-6Z" fill={acesa ? '#FFC800' : '#55687A'} />
    </svg>
  )
}

export function Gema({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path d="M12 2 21 8v8l-9 6-9-6V8Z" fill="#3D8BFF" /><path d="M12 2 21 8l-9 4-9-4Z" fill="#7FB2FF" /><path d="M12 12v10l-9-6V8Z" fill="#2361C4" />
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

export function Medalha({ icone = 'trofeu', ativo = true, size = 64 }) {
  const c = ativo ? CORES[icone] || '#FFC800' : '#3A4A58'
  return (
    <svg viewBox="-30 -32 60 64" width={size} height={size} aria-hidden>
      <path d="M0-30 26-15v30L0 30-26 15v-30Z" fill={c} />
      <path d="M0-30 26-15v30L0 30Z" fill="#000" opacity=".14" />
      <path d="M0-23 20-11.5v23L0 23-20 11.5v-23Z" fill="#fff" opacity=".18" />
      <g opacity={ativo ? 1 : 0.35}>{DESENHOS[icone] || DESENHOS.trofeu}</g>
    </svg>
  )
}
