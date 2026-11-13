# Graph Report - O-Crismando  (2026-11-13)

## Corpus Check
- 16 files · ~13,413 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .example 1, .webmanifest 1)

## Summary
- 143 nodes · 358 edges · 8 communities (7 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7cc4e8be`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- Aluno.jsx
- Admin.jsx
- Licao.jsx
- Personagem
- O Crismando
- Editor

## God Nodes (most connected - your core abstractions)
1. `Personagem()` - 30 edges
2. `Aluno()` - 17 edges
3. `Licao()` - 14 edges
4. `Inicio()` - 12 edges
5. `dataBR()` - 11 edges
6. `Admin()` - 11 edges
7. `Prontuario()` - 11 edges
8. `Bandeira()` - 10 edges
9. `hoje()` - 10 edges
10. `Editor()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/pages/admin/Admin.jsx
- `App()` --calls--> `Aluno()`  [EXTRACTED]
  src/App.jsx → src/pages/aluno/Aluno.jsx
- `Entregas()` --calls--> `Medalha()`  [EXTRACTED]
  src/pages/admin/Admin.jsx → src/components/Icones.jsx
- `Trofeus()` --calls--> `Medalha()`  [EXTRACTED]
  src/pages/admin/Admin.jsx → src/components/Icones.jsx
- `Acervo()` --calls--> `Personagem()`  [EXTRACTED]
  src/pages/aluno/Aluno.jsx → src/components/Personagem.jsx

## Import Cycles
- None detected.

## Communities (8 total, 1 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (23): dependencies, lucide-react, react, react-dom, @supabase/supabase-js, devDependencies, tailwindcss, @tailwindcss/vite (+15 more)

### Community 1 - "Aluno.jsx"
Cohesion: 0.13
Nodes (26): Bau(), Chama(), CORES, DESENHOS, Gema(), Medalha(), Acervo(), Aluno() (+18 more)

### Community 2 - "Admin.jsx"
Cohesion: 0.25
Nodes (21): Personagem(), dataBR(), hoje(), ABAS, Admin(), carregar(), Campanhas(), Conteudo() (+13 more)

### Community 3 - "Licao.jsx"
Cohesion: 0.17
Nodes (15): lucide-react, react, @supabase/supabase-js, App(), Bandeira(), AREAS, sb, STATUS (+7 more)

### Community 4 - "Personagem"
Cohesion: 0.15
Nodes (24): Aureola(), AVATAR_PADRAO, Barba(), Bracos(), Cabeca(), CABELO_CORES, CabeloAtras(), CabeloFrente() (+16 more)

### Community 5 - "O Crismando"
Cohesion: 0.33
Nodes (5): Estrutura, O Crismando, Primeiro catequista, Regras, Rodar

### Community 6 - "Editor"
Cohesion: 0.29
Nodes (4): Editor(), addLicao(), recarregarLicoes(), LicaoEditor()

## Knowledge Gaps
- **1 isolated node(s):** `tailwindcss`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 42 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Licao.jsx` to `package.json`, `Aluno.jsx`, `Admin.jsx`, `Personagem`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **What connects `tailwindcss` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08666666666666667 - nodes in this community are weakly interconnected._
- **Why does `Personagem()` connect `Admin.jsx` to `Aluno.jsx`, `Licao.jsx`, `Personagem`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Should `Aluno.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13118279569892474 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Licao.jsx` to `package.json`, `Aluno.jsx`, `Admin.jsx`, `Personagem`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._