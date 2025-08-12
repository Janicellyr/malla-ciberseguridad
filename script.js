const cursos = [
  // I Año - Primer Semestre
  { id: "IC1", nombre: "Introducción a la Ciberseguridad", semestre: 1, prereqs: [] },
  { id: "DLA1", nombre: "Desarrollo Lógico y Algoritmos", semestre: 1, prereqs: [] },
  { id: "MAT1", nombre: "Matemática I", semestre: 1, prereqs: [] },
  { id: "GSO1", nombre: "Gestión de Sistemas Operativos I", semestre: 1, prereqs: [] },
  { id: "ING1", nombre: "Inglés Técnico I", semestre: 1, prereqs: [] },

  // I Año - Segundo Semestre
  { id: "MAT2", nombre: "Matemática II", semestre: 2, prereqs: ["MAT1"] },
  { id: "PROG1", nombre: "Programación", semestre: 2, prereqs: [] },
  { id: "SCOL", nombre: "Sistemas Colaborativos", semestre: 2, prereqs: [] },
  { id: "GSO2", nombre: "Gestión de Sistemas Operativos II", semestre: 2, prereqs: ["GSO1"] },
  { id: "RED1", nombre: "Redes de Computadoras I", semestre: 2, prereqs: [] },
  { id: "EDAT", nombre: "Estructura de Datos", semestre: 2, prereqs: ["PROG1"] },

  // I Año - Verano
  { id: "REDAC", nombre: "Redacción de Informes Técnicos y Expresión Oral", semestre: 3, prereqs: [] },
  { id: "ING2", nombre: "Inglés Técnico II", semestre: 3, prereqs: ["ING1"] },
  { id: "GEO", nombre: "Geografía de Panamá", semestre: 3, prereqs: [] },

  // II Año - Primer Semestre
  { id: "ORGCOMP", nombre: "Organización del Computador", semestre: 4, prereqs: [] },
  { id: "PROG2", nombre: "Programación II", semestre: 4, prereqs: ["PROG1"] },
  { id: "RED2", nombre: "Redes de Computadoras II", semestre: 4, prereqs: ["RED1"] },
  { id: "MAT3", nombre: "Matemáticas III", semestre: 4, prereqs: ["MAT2"] },
  { id: "CIB1", nombre: "Ciberseguridad I", semestre: 4, prereqs: [] },
  { id: "BDS", nombre: "Base de Datos Seguras", semestre: 4, prereqs: [] },

  // II Año - Segundo Semestre
  { id: "DWEB", nombre: "Desarrollo Web", semestre: 5, prereqs: [] },
  { id: "CRIP", nombre: "Criptografía", semestre: 5, prereqs: ["MAT3"] },
  { id: "EST", nombre: "Estadística y Probabilidades", semestre: 5, prereqs: [] },
  { id: "SEMB", nombre: "Sistemas Embebidos", semestre: 5, prereqs: [] },
  { id: "CIB2", nombre: "Ciberseguridad II", semestre: 5, prereqs: ["CIB1"] },

  // II Año - Verano
  { id: "ECO", nombre: "Ecología General", semestre: 6, prereqs: [] },
  { id: "HIST", nombre: "Historia de Panamá", semestre: 6, prereqs: [] },
  { id: "METINV", nombre: "Metodología de la Investigación", semestre: 6, prereqs: [] },

  // III Año - Primer Semestre
  { id: "IA", nombre: "Inteligencia Artificial Aplicada a la Ciberseguridad", semestre: 7, prereqs: [] },
  { id: "CONT", nombre: "Contabilidad General", semestre: 7, prereqs: [] },
  { id: "CIB3", nombre: "Ciberseguridad III", semestre: 7, prereqs: ["CIB2"] },
  { id: "CIBDER", nombre: "Ciberderecho: Priv., Ética y Der. Digital", semestre: 7, prereqs: [] },
  { id: "CIB4", nombre: "Ciberseguridad IV", semestre: 7, prereqs: ["CIB2"] },
  { id: "GAI", nombre: "Gestión de Almacenamiento de Información", semestre: 7, prereqs: [] },

  // III Año - Segundo Semestre
  { id: "CIB5", nombre: "Ciberseguridad V", semestre: 8, prereqs: ["CIB3", "CIB4"] },
  { id: "PENTEST", nombre: "Pruebas de Penetración y Evaluación de la Seguridad", semestre: 8, prereqs: [] },
  { id: "GINC", nombre: "Gestión de Incidentes y Análisis de Riesgo", semestre: 8, prereqs: [] },
  { id: "TOP1", nombre: "Tópicos Especiales I", semestre: 8, prereqs: [] },
  { id: "CIBINF", nombre: "Ciberinformática", semestre: 8, prereqs: ["CRIP"] },

  // III Año - Verano
  { id: "PRACT", nombre: "Práctica Profesional en Ciberseguridad", semestre: 9, prereqs: [] },

  // IV Año - Primer Semestre
  { id: "SGC", nombre: "Sistema de Gestión de la Ciberseguridad", semestre: 10, prereqs: [] },
  { id: "NUBE", nombre: "Administración y Seguridad de Entornos en la Nube", semestre: 10, prereqs: [] },
  { id: "TOP2", nombre: "Tópicos Especiales II", semestre: 10, prereqs: [] },
  { id: "ADC", nombre: "Análisis de Datos Cibernéticos", semestre: 10, prereqs: [] },
  { id: "EMP", nombre: "Formación de Emprendedores", semestre: 10, prereqs: [] },
  { id: "TG1", nombre: "Trabajo de Graduación I", semestre: 10, prereqs: [] },
  { id: "TG2", nombre: "Trabajo de Graduación II", semestre: 10, prereqs: [] }
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
