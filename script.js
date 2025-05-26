// Lista de estudiantes y su experiencia actual
const alumnos = [
  { nombre: "Josefina Alves", xp: 3 },
  { nombre: "Yasmin Benítez", xp: 2 },
  { nombre: "Julieta Cuadrado", xp: 2 },
  { nombre: "Lucas Duarte", xp: 0 },
  { nombre: "Mahia Echerán", xp: 3 },
  { nombre: "Facundo Gómez", xp: 1 },
  { nombre: "Uma Gonzalez", xp: 2 },
  { nombre: "Valentino Gordano", xp: 2 },
  { nombre: "Juan Leles", xp: 2 },
  { nombre: "Esteban Marins", xp: 1 },
  { nombre: "Bautista Medina", xp: 1 },
  { nombre: "Aldana Montes", xp: 2 },
  { nombre: "Mateo Nievas", xp: 1 },
  { nombre: "Benjamin Noble", xp: 3 },
  { nombre: "Gastón Olhagaray", xp: 0 },
  { nombre: "Anastasia Olivera", xp: 3 },
  { nombre: "Evelin Pereira", xp: 2 },
  { nombre: "Isa Pintos", xp: 1 },
  { nombre: "Joaquin Rodriguez", xp: 1 },
  { nombre: "Clara Romero", xp: 1 },
  { nombre: "Luana Santestevan", xp: 2 },
  { nombre: "Julieta Santos", xp: 3 },
  { nombre: "Guzman Silva", xp: 0 },
  { nombre: "Axel Silva", xp: 1 },
  { nombre: "Tiago Sosa", xp: 1 },
  { nombre: "Julieta Torres", xp: 1 },
  { nombre: "Fernando Trentini", xp: 0 },
  { nombre: "Sofia Viera", xp: 2 }
];

// Función para calcular nivel con suma triangular
function calcularNivel(xp) {
  let nivel = 0;
  while (((nivel + 1) * (nivel + 2)) / 2 <= xp) {
    nivel++;
  }
  return nivel;
}

// Función para calcular el progreso % dentro del nivel
function progresoNivel(xp) {
  let nivel = calcularNivel(xp);
  let xpAnterior = (nivel * (nivel + 1)) / 2;
  let xpSiguiente = ((nivel + 1) * (nivel + 2)) / 2;
  return ((xp - xpAnterior) / (xpSiguiente - xpAnterior)) * 100;
}

// Función para seleccionar imagen de dragón según nivel
function getImagenDragon(nivel) {
  if (nivel < 1) return "dragon_huevo.png";
  else if (nivel < 4) return "dragon_bebe.png";
  else if (nivel < 8) return "dragon_adolescente.png"
  else return "dragon_adulto.png";
}

const grid = document.getElementById("dragon-grid");

alumnos.forEach(alumno => {
  const nivel = calcularNivel(alumno.xp);
  const progreso = progresoNivel(alumno.xp);

  const xpActualNivel = alumno.xp - (nivel * (nivel + 1)) / 2;
  const xpParaSiguienteNivel = ((nivel + 1) * (nivel + 2)) / 2 - (nivel * (nivel + 1)) / 2;

  const tarjeta = document.createElement("div");
  tarjeta.className = "dragon-card";

  tarjeta.innerHTML = `
    <div><strong>${alumno.nombre}</strong></div>
    <img class="dragon-img" src="${getImagenDragon(nivel)}" alt="Dragón">
    <div class="level">Nivel: ${nivel}</div>
    <div class="exp-bar">
      <div class="exp-fill" style="width: ${progreso}%;"></div>
    </div>
    <div>XP: ${xpActualNivel.toFixed(0)} / ${xpParaSiguienteNivel}</div>
  `;

  grid.appendChild(tarjeta);
});
