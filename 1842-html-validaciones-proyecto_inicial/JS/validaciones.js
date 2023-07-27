export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = ""
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = monstrarMensajeDeError(tipoDeInput, input)
  }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo no puede estar vacío",
  },
  email: {
    valueMissing: "El campo no puede estar vacío",
    typeMismatch: "El correo no es válido"
  },
  password: {
    valueMissing: "El campo no puede estar vacío",
    patternMismatch: "Mínimo 6 caracteres, máximo 12. Debe contener una mayúscula y un número. Sin caracteres especiales."
  },
  nacimiento: {
    valueMissing: "El campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad.",
  },
  numero: {
    valueMissing: "El campo no puede estar vacío",
    patternMismatch: "El formato requerido es XXX-XXX-XXXX"
  },
  direccion: {
    valueMissing: "El campo no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 10 y 40 caracteres"
  },
  ciudad: {
    valueMissing: "El campo no puede estar vacío",
    patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres"
  },
  estado: {
    valueMissing: "El campo no puede estar vacío",
    patternMismatch: "El estado debe contener entre 10 y 40 caracteres"
  },
};

function monstrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach(error=>{
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    })
    return mensaje 
}

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad.";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );

  return diferenciaFechas <= fechaActual;
}
