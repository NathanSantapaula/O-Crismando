# O Crismando

PWA de catequese para a Crisma: trilha gamificada para o crismando (mobile) e painel do catequista (mobile e desktop).
Stack: React 18 + Vite 6 + Tailwind 4 + Lucide + Supabase (Auth, Postgres com RLS, Storage, Realtime).

## Estrutura
```
E:\O-Crismando
├─ index.html                 meta PWA, fonte Nunito
├─ public/
│  ├─ manifest.webmanifest    instalar no celular
│  ├─ sw.js                   service worker (cache do app)
│  ├─ icon.svg
│  └─ arte/                   suas pinturas sacras (ver LEIA-ME.txt)
├─ src/
│  ├─ lib.js                  cliente Supabase e utilitários
│  ├─ App.jsx                 sessão e escolha aluno/catequista
│  ├─ components/Guia.jsx     guias em SVG (Jesus, Maria, José, santos) e moldura de arte
│  └─ pages/
│     ├─ Login.jsx
│     ├─ aluno/Aluno.jsx      trilha, presença por código, reposição, acervo, perfil
│     ├─ aluno/Licao.jsx      leitura + quiz com feedback + tela de conquista
│     └─ admin/Admin.jsx      painel em tempo real, crismandos (jornada + PDI), conteúdo
└─ supabase/                  contas de teste (fora do git)
```

## Rodar
```
cd /d E:\O-Crismando
npm install
npm run dev
```
Abra http://localhost:5173 (no celular, na mesma rede: o endereço "Network" que aparece no terminal).

## Primeiro catequista
Crie a conta pelo app e promova no SQL Editor do Supabase:
`update profiles set role='catequista' where id=(select id from auth.users where email='SEU@EMAIL');`

## Regras
- Presença: só com o código do encontro liberado (validado no servidor).
- Reposição: falta em encontro liberado e passado; quiz com 70% regulariza.
- Ofensiva: dias seguidos com atividade (fuso de São Paulo).
