// script.js

document.addEventListener('DOMContentLoaded', () => {
  // --- Funcionalidad del Menú Móvil ---
  const mobileMenuButton = document.querySelector('header .md\\:hidden'); // Selecciona el botón de menú para móviles
  // Importante: Cambié la selección para que coincida con el ul de navegación principal en tu HTML
  const navLinks = document.querySelector('header nav ul');

  if (mobileMenuButton && navLinks) {
    // Inicialmente, ocultamos los enlaces de navegación en móviles si Tailwind CSS no lo hace por defecto
    // Es posible que ya tengas estas clases manejadas por Tailwind en el HTML para tamaños md: y superiores.
    // Aquí solo aseguramos que el menú esté oculto en móviles al inicio.
    // Quita la clase 'md:flex' de aquí si el menú debe estar oculto por defecto en todos los tamaños y solo mostrarse con el botón
    navLinks.classList.add('hidden'); // Oculta el menú por defecto en móvil

    mobileMenuButton.addEventListener('click', () => {
      // Alterna la clase 'hidden' para mostrar u ocultar el menú
      navLinks.classList.toggle('hidden');
      // Puedes añadir aquí clases para animaciones de entrada/salida si lo deseas
    });

    // Opcional: Cerrar el menú si se hace clic fuera de él o en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (!navLinks.classList.contains('hidden')) {
          navLinks.classList.add('hidden');
        }
      });
    });
  }

  ---

  // --- Funcionalidad del Formulario de Newsletter ---
  const newsletterForm = document.querySelector('footer form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Previene el envío por defecto del formulario

      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value;

      console.log(`Email para suscripción: ${email}`);

      // Aquí es donde integrarías la llamada a tu backend o servicio de email marketing.
      // Por ejemplo, usando la API de Gemini para simular una respuesta.
      try {
        // Simulación de una llamada a la API de Gemini para procesar la suscripción
        // NOTA: En una aplicación real, esto se manejaría en el backend para seguridad
        // y para interactuar con un servicio de email marketing.
        // Aquí solo simulamos una respuesta para fines de demostración.

        const prompt = `Simula una respuesta de éxito para la suscripción de un email "${email}" a un newsletter de una tienda de mate. La respuesta debe ser breve y amigable.`;
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        // Si la clave API se proporciona en tiempo de ejecución en Canvas, déjala vacía aquí.
        // De lo contrario, necesitarías asignarla antes de ejecutar el código en el navegador.
        const apiKey = ""; // La clave API se proporciona en tiempo de ejecución en Canvas
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        let message = "¡Gracias por suscribirte!"; // Mensaje por defecto

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          message = result.candidates[0].content.parts[0].text;
        }

        // Mostrar un mensaje de éxito al usuario
        alert(message); // Usamos alert para simplicidad, pero en un entorno real usarías un modal o un mensaje en la UI
        emailInput.value = ''; // Limpiar el campo del email
      } catch (error) {
        console.error('Error al procesar la suscripción:', error);
        alert('Hubo un error al intentar suscribirte. Por favor, inténtalo de nuevo.');
      }
    });
  }

  ---

  // --- Funcionalidad del Formulario de Contacto ---
  const contactForm = document.getElementById('contactForm');
  const confirmationMessage = document.getElementById('confirmationMessage');

  if (contactForm && confirmationMessage) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Evita el envío por defecto del formulario

      // *** Aquí es donde normalmente enviarías los datos del formulario a un servidor. ***
      // Por ejemplo, con fetch() o XMLHttpRequest.
      // fetch('tu_servidor/send-email.php', {
      //     method: 'POST',
      //     body: new FormData(contactForm)
      // })
      // .then(response => response.json())
      // .then(data => {
      //     if (data.success) {
      //         confirmationMessage.classList.remove('hidden'); // Muestra el mensaje
      //         contactForm.reset(); // Opcional: limpia el formulario
      //     } else {
      //         // Maneja el error, quizás mostrando otro mensaje
      //         console.error('Error al enviar el mensaje:', data.message);
      //     }
      // })
      // .catch(error => {
      //     console.error('Hubo un problema con la petición:', error);
      // });

      // *** Para este ejemplo, simulamos un envío exitoso después de un pequeño retraso ***
      setTimeout(() => {
        confirmationMessage.classList.remove('hidden'); // Muestra el mensaje de confirmación
        contactForm.reset(); // Limpia los campos del formulario
        console.log('Mensaje simulado de contacto enviado correctamente.');

        // Opcional: Ocultar el mensaje después de unos segundos
        setTimeout(() => {
          confirmationMessage.classList.add('hidden');
        }, 5000); // El mensaje se oculta después de 5 segundos (5000 milisegundos)
      }, 500); // Simula un envío que tarda 0.5 segundos (500 milisegundos)
    });
  }
});
