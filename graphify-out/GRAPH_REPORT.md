# Graph Report - O-Crismando  (2026-11-13)

## Corpus Check
- 21 files · ~49,462 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .example 1, .webmanifest 1)

## Summary
- 162 nodes · 394 edges · 8 communities (6 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `20882965`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- Aluno.jsx
- Admin.jsx
- Licao.jsx
- Personagem
- O Crismando

## God Nodes (most connected - your core abstractions)
1. `Personagem()` - 33 edges
2. `Aluno()` - 18 edges
3. `Licao()` - 14 edges
4. `Inicio()` - 12 edges
5. `dataBR()` - 11 edges
6. `Admin()` - 11 edges
7. `Prontuario()` - 11 edges
8. `react` - 10 edges
9. `Bandeira()` - 10 edges
10. `hoje()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/pages/admin/Admin.jsx
- `App()` --calls--> `Aluno()`  [EXTRACTED]
  src/App.jsx → src/pages/aluno/Aluno.jsx
- `Entregas()` --calls--> `Medalha()`  [EXTRACTED]
  src/pages/admin/Admin.jsx → src/components/Icones.jsx
- `Trofeus()` --calls--> `Medalha()`  [EXTRACTED]
  src/pages/admin/Admin.jsx → src/components/Icones.jsx
- `Admin()` --calls--> `Personagem()`  [EXTRACTED]
  src/pages/admin/Admin.jsx → src/components/Personagem.jsx

## Import Cycles
- None detected.

## Communities (8 total, 2 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (23): dependencies, lucide-react, react, react-dom, @supabase/supabase-js, devDependencies, tailwindcss, @tailwindcss/vite (+15 more)

### Community 1 - "Aluno.jsx"
Cohesion: 0.12
Nodes (34): @supabase/supabase-js, Bau(), Chama(), CORES, DESENHOS, Gema(), Medalha(), NavIcone() (+26 more)

### Community 2 - "Admin.jsx"
Cohesion: 0.16
Nodes (22): dataBR(), ABAS, Admin(), carregar(), Campanhas(), Conteudo(), Editor(), addLicao() (+14 more)

### Community 3 - "Licao.jsx"
Cohesion: 0.17
Nodes (13): react, react-dom, App(), Bandeira(), Codigo(), Comparar(), REF, Galeria() (+5 more)

### Community 4 - "Personagem"
Cohesion: 0.14
Nodes (26): Arte(), Aureola(), AVATAR_PADRAO, Barba(), Bracos(), Cabeca(), CABELO_CORES, CabeloAtras() (+18 more)

### Community 5 - "O Crismando"
Cohesion: 0.33
Nodes (5): Estrutura, O Crismando, Primeiro catequista, Regras, Rodar

## Knowledge Gaps
- **1 isolated node(s):** `tailwindcss`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 49 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Licao.jsx` to `package.json`, `Aluno.jsx`, `Admin.jsx`, `Personagem`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **What connects `tailwindcss` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08666666666666667 - nodes in this community are weakly interconnected._
- **Why does `Personagem()` connect `Personagem` to `Aluno.jsx`, `Admin.jsx`, `Licao.jsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `Aluno.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12179487179487179 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `package.json` to `Aluno.jsx`, `Admin.jsx`, `Licao.jsx`, `Personagem`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Should `Personagem` be split into smaller, more focused modules?**
  _Cohesion score 0.14482758620689656 - nodes in this community are weakly interconnected._