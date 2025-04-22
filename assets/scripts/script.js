function openModal() {
    document.getElementById('modal-login').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-login').style.display = 'none';
}

function clearFields() {
    document.getElementById('usuario').value = "";
    document.getElementById('password').value = "";
}

function openAdmin(){
  if(email.value=='xio@gmail.com' && password.value=='123'){
      window.open('admin.html')
  }

}




function abrirModal(id) {
    document.getElementById(id).style.display = 'block';
    /*.style Accede a los estilos CSS en línea del elemento.*/
    /* .display Modifica la propiedad display del elemento convirtiéndolo a bloque*/
  }
  
  function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
    /*El valor none oculta el modal*/
  }
  
  /* Carrusel historias*/
document.addEventListener( 'DOMContentLoaded', function() {
  var splide = new Splide( '.splide', {
    type   : 'loop',
    perPage: 4,
   perMove: 2,
   breakpoints: {
    992: {
      perPage: 2,
      perMove: 1,
    },
    768: {
      perPage: 1,
      perMove: 1,
    },
  },
  
  } );
  
  splide.mount();
} );


/* Icono mostrar/ocultar */

function togglePassword() {
  const input = document.getElementById("password");
  const icon = document.querySelector(".toggle-icon");
  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "visibility_off";
  } else {
    input.type = "password";
    icon.textContent = "visibility";
  }
}