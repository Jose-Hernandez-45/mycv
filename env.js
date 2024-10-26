// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario por su ID
    const form = document.getElementById('contactForm');

    // Añadir un evento al enviar el formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir la recarga de la página

        // Recoger los datos del formulario
        const formData = new FormData(form);

        // Enviar los datos mediante fetch (AJAX)
        fetch('enviar.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // Convertir la respuesta a texto
        .then(data => {
            // Mostrar el mensaje en el div #resultado
            document.getElementById('resultado').innerHTML = data;
        })
        .catch(error => {
            // Manejar cualquier error
            document.getElementById('resultado').innerHTML = 'Hubo un error: ' + error;
        });
    });
});