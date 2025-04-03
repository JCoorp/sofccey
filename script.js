document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  const name = document.querySelector("input[name='name']");
  const email = document.querySelector("input[name='email']");
  const message = document.querySelector("textarea[name='message']");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!name.value || !email.value || !message.value) {
        alert("Por favor llena todos los campos.");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            message: message.value,
          }),
        });

        if (res.ok) {
          alert("✅ ¡Tu mensaje fue enviado con éxito!");
          form.reset();
        } else {
          alert("❌ Hubo un error al enviar tu mensaje.");
        }
      } catch (err) {
        console.error(err);
        alert("❌ Error al conectar con el servidor.");
      }
    });
  }

  // ✅ Iniciar carruseles correctamente
  iniciarCarrusel(".carrusel-proyecto", 3500);
  iniciarCarrusel(".equipo-carousel", 3000);
});

function iniciarCarrusel(selector, intervalo = 3000) {
  let index = 0;
  const slides = document.querySelectorAll(`${selector} .carousel-slide`);
  if (slides.length === 0) return;

  function mostrarSiguiente() {
    slides.forEach(s => s.style.display = "none");
    index = (index + 1) % slides.length;
    slides[index].style.display = "block";
  }

  mostrarSiguiente();
  setInterval(mostrarSiguiente, intervalo);
}
