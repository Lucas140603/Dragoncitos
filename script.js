// Lista de estudiantes y su experiencia actual
const alumnos = {
  "Josefina Alves": { xp: 6, mascota: "l" },
  "Yasmin Benítez": { xp: 2, mascota: "p" },
  "Julieta Cuadrado": { xp: 2.5, mascota: "d" },
  "Lucas Duarte": { xp: 0, mascota: "d" },
  "Mahia Echerán": { xp: 6, mascota: "o" },
  "Facundo Gómez": { xp: 0.5, mascota: "leo" },
  "Uma Gonzalez": { xp: 2.5, mascota: "d" },
  "Valentino Gordano": { xp: 3, mascota: "d" },
  "Juan Leles": { xp: 2.5, mascota: "s" },
  "Esteban Marins": { xp: 1, mascota: "d" },
  "Bautista Medina": { xp: 1.5, mascota: "tig" },
  "Aldana Montes": { xp: 3, mascota: "r" },
  "Mateo Nievas": { xp: 1.5, mascota: "g" },
  "Tadeo Noble": { xp: 4, mascota: "d" },
  "Gastón Olhagaray": { xp: 0, mascota: "d" },
  "Anastasia Olivera": { xp: 6, mascota: "v" },
  "Evelin Pereira": { xp: 2.5, mascota: "u" },
  "Isa Pintos": { xp: 1, mascota: "d" },
  "Joaquin Rodriguez": { xp: 1.5, mascota: "d" },
  "Clara Romero": { xp: 1.5, mascota: "f" },
  "Luana Santestevan": { xp: 3, mascota: "chim" },
  "Julieta Santos": { xp: 6, mascota: "t" },
  "Guzman Silva": { xp: 0, mascota: "d" },
  "Axel Silva": { xp: 1, mascota: "d" },
  "Tiago Sosa": { xp: 1, mascota: "d" },
  "Julieta Torres": { xp: 0.5, mascota: "d" },
  "Fernando Trentini": { xp: 0, mascota: "d" },
  "Sofia Viera": { xp: 2.5, mascota: "a" }
};

// Niveles iniciales (XP acumulada total para alcanzar del nivel 1 al 5)
const nivelesIniciales = [1, 3, 6, 10, 15];

// Función para calcular nivel
function calcularNivel(xp) {
  for (let i = 0; i < nivelesIniciales.length; i++) {
    if (xp < nivelesIniciales[i]) return i;
  }
  return 5 + Math.floor((xp - 15) / 5);
}

// Función para calcular el progreso % dentro del nivel
function progresoNivel(xp) {
  const nivel = calcularNivel(xp);
  let xpAnterior, xpSiguiente;

  if (nivel <= 5) {
    xpAnterior = nivel === 0 ? 0 : nivelesIniciales[nivel - 1];
    xpSiguiente = nivelesIniciales[nivel];
  } else {
    xpAnterior = 15 + (nivel - 5 - 1) * 5;
    xpSiguiente = xpAnterior + 5;
  }

  return ((xp - xpAnterior) / (xpSiguiente - xpAnterior)) * 100;
}

// Función para seleccionar imagen de mascota según tipo y nivel
function getImagenMascota(mascota, nivel) {
  let etapa = "huevo";
  if (nivel >= 8) etapa = "adulto";
  else if (nivel >= 6) etapa = "joven";
  else if (nivel >= 3) etapa = "bebe";
  else etapa = "huevo";
  return `img/${mascota}_${etapa}.png`;
}

// Mostrar todos los alumnos en la cuadrícula
const grid = document.getElementById("dragon-grid");

Object.entries(alumnos).forEach(([nombre, datos]) => {
  const nivel = calcularNivel(datos.xp);
  const progreso = progresoNivel(datos.xp);

  let xpAnterior, xpSiguiente;

  if (nivel <= 5) {
    xpAnterior = nivel === 0 ? 0 : nivelesIniciales[nivel - 1];
    xpSiguiente = nivelesIniciales[nivel];
  } else {
    xpAnterior = 15 + (nivel - 5 - 1) * 5;
    xpSiguiente = xpAnterior + 5;
  }

  const xpActualNivel = datos.xp - xpAnterior;
  const xpParaSiguienteNivel = xpSiguiente - xpAnterior;

  const tarjeta = document.createElement("div");
  tarjeta.className = "dragon-card";

  const imagen = getImagenMascota(datos.mascota, nivel);

  tarjeta.innerHTML = `
    <div><strong>${nombre}</strong></div>
    <img class="dragon-img" src="${imagen}" alt="Mascota">
    <div class="level">Nivel: ${nivel}</div>
    <div class="exp-bar">
      <div class="exp-fill" style="width: ${progreso}%;"></div>
    </div>
    <div>XP: ${xpActualNivel.toFixed(1)} / ${xpParaSiguienteNivel}</div>
  `;

  grid.appendChild(tarjeta);
});
