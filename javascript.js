const textoEncriptar = document.getElementById("texto_encriptar");
const encriptado = document.getElementById("text_encriptado");
const btnEncriptar = document.getElementById("encriptar");
const btnDesencriptar = document.getElementById("desencriptar");
const imagenEncriptado = document.getElementById("imagen_encriptado");
const renderText = document.getElementById("render_text");

const check = document.getElementById("checkbox");

const matrix = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

function repla(letter) {
  let r = null;
  matrix.forEach((u) => {
    if (letter === u[0]) {
      r = u[1];
    }
  });

  return r ? r : letter;
}

function encriptar(str) {
  matrix.forEach((u) => {
    if (str.includes(u[0])) {
      str = str.replaceAll(u[0], u[1]);
    }
  });
  return str;
}

function desencriptarText(str) {
  for (let i = 0; i < matrix.length; i++) {
    if (str.includes(matrix[i][1])) {
      str = str.replaceAll(matrix[i][1], matrix[i][0]);
    }
  }
  return str;
}

check.onclick = () => {
  if (check.checked) {
    btnEncriptar.disabled = true;
    check.value = "true";
  } else {
    btnEncriptar.disabled = false;
    check.value = "false";
  }
  return;
};
let str = "";
textoEncriptar.oninput = (e) => {
  str = e.target.value;

  if (str === "") {
    encriptado.value = "";
    renderText.style.display = "block";
  }
  let lastLetra = str[str.length - 1] || "A";

  if (
    (lastLetra.charCodeAt() >= 97 && lastLetra.charCodeAt() <= 122) ||
    lastLetra.charCodeAt() === 32
  ) {
    str = e.target.value;
  } else {
    textoEncriptar.value = textoEncriptar.value.slice(0, -1);
    lastLetra = "";
  }

  if (check.value === "true") {
    imagenEncriptado.style.display = "none";
    renderText.style.display = "none";

    if (e.inputType !== "deleteContentBackward") {
      encriptado.value += repla(lastLetra);
    } else {
      encriptado.value = encriptar(str);
    }
  } else {
    btnEncriptar.onclick = () => {
      e.preventDefault();

      encriptado.value = encriptar(str);
      imagenEncriptado.style.display = "none";
      renderText.style.display = "none";
    };
  }
};

btnDesencriptar.onclick = (e) => {
  e.preventDefault();
  textoEncriptar.value = desencriptarText(encriptado.value);
};

document.getElementById("copiar").onclick = (e) => {
  e.preventDefault();
  const mensaje = encriptado;
  mensaje.select();
  navigator.clipboard.writeText(mensaje.value);
  mensaje.value = "";
};
