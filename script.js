const cursos = [
  { id: "MAT1", nombre: "Matemática I", semestre: 1, prereqs: [] },
  { id: "MAT2", nombre: "Matemática II", semestre: 2, prereqs: ["MAT1"] },
  // ... aquí se pegan todos los cursos de la malla que te hice
];

let estado = cursos.map(c => ({
  ...c,
  aprobada: false,
  desbloqueada: c.prereqs.length === 0
}));

function renderMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  const semestres = [...new Set(cursos.map(c => c.semestre))].sort((a, b) => a - b);

  semestres.forEach(sem => {
    const col = document.createElement("div");
    col.className = "semestre";
    const titulo = document.createElement("h3");
    titulo.textContent = `Semestre ${sem}`;
    col.appendChild(titulo);

    estado
      .filter(c => c.semestre === sem)
      .forEach(curso => {
        const div = document.createElement("div");
        div.className = `materia ${
          curso.aprobada ? "aprobada" :
          curso.desbloqueada ? "desbloqueada" :
          "bloqueada"
        }`;
        div.textContent = curso.nombre;
        div.onclick = () => toggleCurso(curso.id);
        col.appendChild(div);
      });

    container.appendChild(col);
  });
}

function toggleCurso(id) {
  const curso = estado.find(c => c.id === id);
  if (!curso.desbloqueada) return;

  curso.aprobada = !curso.aprobada;

  estado.forEach(c => {
    c.desbloqueada = c.prereqs.every(pid => estado.find(x => x.id === pid)?.aprobada);
  });

  renderMalla();
}

renderMalla();
