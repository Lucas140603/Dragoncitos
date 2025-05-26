// Lista de estudiantes y su experiencia actual
const alumnos = {
  "Josefina Alves": { xp: 0, mascota: "d" },
  "Yasmin Benítez": { xp: 0, mascota: "d" },
  "Julieta Cuadrado": { xp: 0, mascota: "d" },
  "Lucas Duarte": { xp: 0, mascota: "d" },
  "Mahia Echerán": { xp: 0, mascota: "d" },
  "Facundo Gómez": { xp: 0, mascota: "d" },
  "Uma Gonzalez": { xp: 0, mascota: "d" },
  "Valentino Gordano": { xp: 0, mascota: "d" },
  "Juan Leles": { xp: 0, mascota: "d" },
  "Esteban Marins": { xp: 0, mascota: "d" },
  "Bautista Medina": { xp: 0, mascota: "d" },
  "Aldana Montes": { xp: 0, mascota: "d" },
  "Mateo Nievas": { xp: 0, mascota: "d" },
  "Benjamin Noble": { xp: 0, mascota: "d" },
  "Gastón Olhagaray": { xp: 0, mascota: "d" },
  "Anastasia Olivera": { xp: 0, mascota: "d" },
  "Evelin Pereira": { xp: 0, mascota: "d" },
  "Isa Pintos": { xp: 0, mascota: "d" },
  "Joaquin Rodriguez": { xp: 0, mascota: "d" },
  "Clara Romero": { xp: 0, mascota: "f" },
  "Luana Santestevan": { xp: 0, mascota: "d" },
  "Julieta Santos": { xp: 0, mascota: "u" },
  "Guzman Silva": { xp: 0, mascota: "d" },
  "Axel Silva": { xp: 0, mascota: "d" },
  "Tiago Sosa": { xp: 0, mascota: "d" },
  "Julieta Torres": { xp: 0, mascota: "d" },
  "Fernando Trentini": { xp: 0, mascota: "d" },
  "Sofia Viera": { xp: 0, mascota: "d" }
};

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
function getImagenMascota(mascota, nivel) {
  let etapa = "huevo";
  if (nivel >= 8) etapa = "adulto";
  else if (nivel >= 7) etapa = "joven";
  else if (nivel >= 3) etapa = "bebe";
  return `${mascota}_${etapa}.png`;
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
