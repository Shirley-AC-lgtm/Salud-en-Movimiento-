document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú móvil responsivo
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace (en móvil)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. Evitar que seleccionen fechas pasadas en el calendario
    const fechaInput = document.getElementById('fecha');
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', hoy);

    // 3. Envío inteligente del formulario a WhatsApp
    const bookingForm = document.getElementById('bookingForm');

    // ⚠️ CAMBIA ESTE NÚMERO POR EL WHATSAPP REAL DE TU HERMANA (con código de país 502)
    const telefonoWhatsApp = "50254784920";

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const servicio = document.getElementById('servicio').value;
        const direccion = document.getElementById('direccion').value.trim();
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const notas = document.getElementById('notas').value.trim();

        // Formatear fecha para que se lea bonita (DD/MM/AAAA)
        const partesFecha = fecha.split('-');
        const fechaFormateada = `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`;

        // Construir el mensaje estructurado sin simbolos raros
        let mensaje = `Hola *Yamileth*! Me gustaria agendar una terapia a domicilio:\n\n`;
        mensaje += `- Paciente: ${nombre}\n`;
        mensaje += `- Servicio: ${servicio}\n`;
        mensaje += `- Zona/Direccion: ${direccion}\n`;
        mensaje += `- Fecha preferida: ${fechaFormateada}\n`;
        mensaje += `- Horario: ${hora}\n`;

        if (notas !== "") {
            mensaje += `- Notas/Molestia: ${notas}\n`;
        }

        mensaje += `\nTienen disponibilidad para ese horario?`;

        // Codificar mensaje para URL y abrir WhatsApp
        const urlWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsApp, '_blank');
    });
});