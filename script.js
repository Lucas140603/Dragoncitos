// Lista de estudiantes y su experiencia actual
const alumnos = {
  "Josefina Alves": { xp: 21, mascota: "l" },
  "Yasmin Benitez": { xp: 20, mascota: "p" },
  "Julieta Cuadrado": { xp: 12.5, mascota: "d" },
  "Lucas Duarte": { xp: 3, mascota: "d" },
  "Mahia Echerán": { xp: 26, mascota: "pan" },
  "Facundo Gómez": { xp: 10, mascota: "leo" },
  "Uma Gonzalez": { xp: 14, mascota: "tuc" },
  "Valentino Gordano": { xp: 21, mascota: "vel" },
  "Juan Leles": { xp: 20, mascota: "s" },
  "Esteban Marins": { xp: 14, mascota: "d" },
  "Bautista Medina": { xp: 18.5, mascota: "tig" },
  "Aldana Montes": { xp: 17, mascota: "r" },
  "Mateo Nievas": { xp: 22, mascota: "g" },
  "Tadeo Noble": { xp: 23, mascota: "d" },
  "Gastón Olhagaray": { xp: 6, mascota: "d" },
  "Anastasia Olivera": { xp: 16, mascota: "v" },
  "Evelin Pereira": { xp: 14.5, mascota: "u" },
  "Isa Pintos": { xp: 11, mascota: "d" },
  "Joaquin Rodriguez": { xp: 20, mascota: "ag" },
  "Clara Romero": { xp: 20, mascota: "f" },
  "Luana Santestevan": { xp: 26, mascota: "chim" },
  "Julieta Santos": { xp: 26, mascota: "t" },
  "Guzman Silva": { xp: 0, mascota: "d" },
  "Axel Silva": { xp: 9, mascota: "d" },
  "Tiago Sosa": { xp: 12, mascota: "d" },
  "Julieta Torres": { xp: 8.5, mascota: "d" },
  "Fernando Trentini": { xp: 7.5, mascota: "d" },
  "Sofia Viera": { xp: 22, mascota: "a" }
};

const nivelesIniciales = [1, 3, 6, 10, 15];

function calcularNivel(xp) {
  for (let i = 0; i < nivelesIniciales.length; i++) {
    if (xp < nivelesIniciales[i]) return i;
  }
  return 5 + Math.floor((xp - 15) / 5);
}

function progresoNivel(xp) {
  const nivel = calcularNivel(xp);
  let xpAnterior, xpSiguiente;

  if (nivel < 5) {
    xpAnterior = nivel === 0 ? 0 : nivelesIniciales[nivel - 1];
    xpSiguiente = nivelesIniciales[nivel];
  } else {
    xpAnterior = 15 + (nivel - 5) * 5;
    xpSiguiente = xpAnterior + 5;
  }

  return ((xp - xpAnterior) / (xpSiguiente - xpAnterior)) * 100;
}

function getImagenMascota(mascota, nivel) {
  let etapa = "huevo";
  if (nivel >= 8) etapa = "adulto";
  else if (nivel >= 6) etapa = "joven";
  else if (nivel >= 3) etapa = "bebe";
  return `img/${mascota}_${etapa}.png`;
}

function mostrarEvolucion(nombreAlumno, mascota, nivel) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = 9998;

  const modal = document.createElement("div");
  modal.className = "modal";

  const titulo = document.createElement("h2");
  titulo.textContent = `Evolución de la mascota de ${nombreAlumno}`;

  const etapas = ["huevo", "bebe", "joven", "adulto"];
  const nivelesPorEtapa = { huevo: 0, bebe: 3, joven: 6, adulto: 8 };

  etapas.forEach(etapa => {
    if (nivel >= nivelesPorEtapa[etapa]) {
      const img = document.createElement("img");
      img.src = `img/${mascota}_${etapa}.png`;
      img.alt = etapa;
      modal.appendChild(img);
    }
  });

  const cerrarBtn = document.createElement("button");
  cerrarBtn.innerText = "Cerrar";
  cerrarBtn.onclick = () => {
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  };

  modal.appendChild(cerrarBtn);
  document.body.appendChild(overlay);
  document.body.appendChild(modal);
}

const grid = document.getElementById("dragon-grid");

Object.entries(alumnos).forEach(([nombre, datos]) => {
  const nivel = calcularNivel(datos.xp);
  const progreso = progresoNivel(datos.xp);

  let xpAnterior, xpSiguiente;

  if (nivel < 5) {
    xpAnterior = nivel === 0 ? 0 : nivelesIniciales[nivel - 1];
    xpSiguiente = nivelesIniciales[nivel];
  } else {
    xpAnterior = 15 + (nivel - 5) * 5;
    xpSiguiente = xpAnterior + 5;
  }

  const xpActualNivel = datos.xp - xpAnterior;
  const xpParaSiguienteNivel = xpSiguiente - xpAnterior;

  const tarjeta = document.createElement("div");
  tarjeta.className = "dragon-card";

  const imagenSrc = getImagenMascota(datos.mascota, nivel);

  tarjeta.innerHTML = `
    <div><strong>${nombre}</strong></div>
    <img class="dragon-img" src="${imagenSrc}" alt="Mascota">
    <div class="level">Nivel: ${nivel}</div>
    <div class="exp-bar">
      <div class="exp-fill" style="width: ${progreso}%;"></div>
    </div>
    <div>XP: ${xpActualNivel.toFixed(1)} / ${xpParaSiguienteNivel}</div>
  `;

  const img = tarjeta.querySelector("img");
  img.addEventListener("click", () => {
    mostrarEvolucion(nombre, datos.mascota, nivel);
  });

  grid.appendChild(tarjeta);
});
