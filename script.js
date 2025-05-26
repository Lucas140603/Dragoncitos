// Lista de estudiantes y su experiencia actual
const alumnos = [
  { nombre: "Josefina Alves", xp: 0 },
  { nombre: "Yasmin Benítez", xp: 1 },
  { nombre: "Julieta Cuadrado", xp: 10 },
  { nombre: "Lucas Duarte", xp: 36 },
  { nombre: "Mahia Echerán", xp: 0 },
  { nombre: "Facundo Gómez", xp: 0 },
  { nombre: "Uma Gonzalez", xp: 0 },
  { nombre: "Valentino Gordano", xp: 0 },
  { nombre: "Juan Leles", xp: 0 },
  { nombre: "Esteban Marins", xp: 0 },
  { nombre: "Bautista Medina", xp: 0 },
  { nombre: "Aldana Montes", xp: 0 },
  { nombre: "Mateo Nievas", xp: 0 },
  { nombre: "Benjamin Noble", xp: 0 },
  { nombre: "Gastón Olhagaray", xp: 0 },
  { nombre: "Anastasia Olivera", xp: 0 },
  { nombre: "Evelin Pereira", xp: 0 },
  { nombre: "Isa Pintos", xp: 0 },
  { nombre: "Joaquin Rodriguez", xp: 0 },
  { nombre: "Clara Romero", xp: 0 },
  { nombre: "Luana Santestevan", xp: 0 },
  { nombre: "Julieta Santos", xp: 0 },
  { nombre: "Guzman Silva", xp: 0 },
  { nombre: "Axel Silva", xp: 0 },
  { nombre: "Tiago Sosa", xp: 0 },
  { nombre: "Julieta Torres", xp: 0 },
  { nombre: "Fernando Trentini", xp: 0 },
  { nombre: "Sofia Viera", xp: 0 }
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
