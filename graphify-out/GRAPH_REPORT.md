# Graph Report - O-Crismando  (2026-11-13)

## Corpus Check
- 31 files · ~681,596 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .example 1, .webmanifest 1)

## Summary
- 217 nodes · 501 edges · 9 communities (8 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `24167f90`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- Aluno.jsx
- Admin.jsx
- JesusArte.jsx
- Personagem
- O Crismando
- hd.py
- JesusHumano.jsx

## God Nodes (most connected - your core abstractions)
1. `Personagem()` - 33 edges
2. `Aluno()` - 18 edges
3. `react` - 14 edges
4. `Licao()` - 14 edges
5. `Inicio()` - 12 edges
6. `dataBR()` - 11 edges
7. `Admin()` - 11 edges
8. `Prontuario()` - 11 edges
9. `JesusHumano()` - 10 edges
10. `Bandeira()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/pages/admin/Admin.jsx
- `App()` --calls--> `Comparar()`  [EXTRACTED]
  src/App.jsx → src/pages/Comparar.jsx
- `App()` --calls--> `JesusLab()`  [EXTRACTED]
  src/App.jsx → src/pages/JesusLab.jsx
- `Perfil()` --calls--> `Medalha()`  [EXTRACTED]
  src/pages/aluno/Aluno.jsx → src/components/Icones.jsx
- `Trofeus()` --calls--> `Medalha()`  [EXTRACTED]
  src/pages/aluno/Aluno.jsx → src/components/Icones.jsx

## Import Cycles
- None detected.

## Communities (9 total, 1 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.07
Nodes (28): dependencies, lucide-react, react, react-dom, @supabase/supabase-js, devDependencies, tailwindcss, @tailwindcss/vite (+20 more)

### Community 1 - "Aluno.jsx"
Cohesion: 0.11
Nodes (39): lucide-react, App(), Bau(), Chama(), CORES, DESENHOS, Gema(), NavIcone() (+31 more)

### Community 2 - "Admin.jsx"
Cohesion: 0.15
Nodes (25): Medalha(), dataBR(), hoje(), ABAS, Admin(), carregar(), Campanhas(), Conteudo() (+17 more)

### Community 3 - "JesusArte.jsx"
Cohesion: 0.38
Nodes (3): JesusArte(), origem(), Parte()

### Community 4 - "Personagem"
Cohesion: 0.12
Nodes (28): Arte(), AVATAR_PADRAO, Barba(), Bracos(), Cabeca(), CABELO_CORES, CabeloAtras(), CabeloFrente() (+20 more)

### Community 5 - "O Crismando"
Cohesion: 0.33
Nodes (5): Estrutura, Fidelingo, Primeiro catequista, Regras, Rodar

### Community 6 - "hd.py"
Cohesion: 0.11
Nodes (8): ampliar(), sangrar(), caixa(), cilindro(), crescer(), mascara(), salvar(), tapar()

### Community 7 - "JesusHumano.jsx"
Cohesion: 0.16
Nodes (20): CAMADAS, curva(), em(), GESTOS, girarX(), inversa(), JesusHumano(), desenha() (+12 more)

## Knowledge Gaps
- **1 isolated node(s):** `tailwindcss`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 63 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `package.json` to `Aluno.jsx`, `Admin.jsx`, `JesusArte.jsx`, `Personagem`, `JesusHumano.jsx`?**
  _High betweenness centrality (0.220) - this node is a cross-community bridge._
- **What connects `tailwindcss` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0659536541889483 - nodes in this community are weakly interconnected._
- **Why does `Personagem()` connect `Personagem` to `Aluno.jsx`, `Admin.jsx`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `Aluno.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1054421768707483 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Aluno.jsx` to `package.json`, `Admin.jsx`, `Personagem`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Should `Admin.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14942528735632185 - nodes in this community are weakly interconnected._