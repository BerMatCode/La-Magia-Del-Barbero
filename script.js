// === CONFIGURACIÓN DE TEMA ===
const themeToggle = document.getElementById('themeToggle');
const footerLogo = document.getElementById('footerLogo');
const whatsappImg = document.getElementById('whatsappImg');
const htmlEl = document.documentElement;

// Cargar tema guardado o usar dorado por defecto
const savedTheme = localStorage.getItem('barberTheme') || 'gold';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeImages(savedTheme);

// Función para actualizar imágenes según tema
function updateThemeImages(theme) {
  if (theme === 'purple') {
    footerLogo.src = 'https://raw.githubusercontent.com/BerMatMods/La-Magia-Del-Barbero/main/logo%20neon%20morado.png';
    whatsappImg.src = 'https://raw.githubusercontent.com/BerMatMods/La-Magia-Del-Barbero/main/WhatsApp%20morado.png';
  } else {
    footerLogo.src = 'https://raw.githubusercontent.com/BerMatMods/La-Magia-Del-Barbero/main/logo%20neon%20dorado.png';
    whatsappImg.src = 'https://raw.githubusercontent.com/BerMatMods/La-Magia-Del-Barbero/main/WhatsApp%20dorado.png';
  }
}

// Toggle de tema al hacer clic en el badge
themeToggle.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Animación de transición suave
  htmlEl.setAttribute('data-theme-transition', 'true');
  
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'gold' ? 'purple' : 'gold';
  
  // Actualizar atributo y guardar preferencia
  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('barberTheme', newTheme);
  
  // Actualizar imágenes
  updateThemeImages(newTheme);
  
  // Efecto visual de feedback
  themeToggle.style.transform = 'scale(0.95)';
  setTimeout(() => {
    themeToggle.style.transform = '';
    htmlEl.removeAttribute('data-theme-transition');
  }, 300);
  
  // Mensaje de confirmación sutil
  const originalText = themeToggle.innerHTML;
  themeToggle.innerHTML = newTheme === 'purple' ? '💈𝗕𝗮𝗿𝗯𝗲𝗿 𝗦𝗵𝗼𝗽💈' : '💈𝗕𝗮𝗿𝗯𝗲𝗿 𝗦𝗵𝗼𝗽💈';
  setTimeout(() => {
    themeToggle.innerHTML = originalText;
  }, 1500);
});

// === RESTO DEL CÓDIGO ORIGINAL ===
document.getElementById('year').textContent = new Date().getFullYear();

// Optimización de scroll para evitar lag
let ticking = false;
window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      const header = document.getElementById('mainHeader');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Toggle menú móvil
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', function() {
  navLinks.classList.toggle('active');
  this.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileToggle.classList.remove('active');
  });
});

function selectService(serviceName, price) {
  document.getElementById('service').value = serviceName + '|' + price;
  document.getElementById('reservas').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    document.getElementById('service').focus();
  }, 800);
}

function updateSummary() {
  const service = document.getElementById('service').value;
  const professional = document.getElementById('professional').value;
  const date = document.getElementById('date').value;
  if (service && professional && date) {
    const [serviceName, price] = service.split('|');
    const [profName] = professional.split('|');
    document.getElementById('sumService').textContent = serviceName.toUpperCase();
    document.getElementById('sumProfessional').textContent = profName.toUpperCase();
    
    const [year, month, day] = date.split('-');
    const dateObj = new Date(year, month - 1, day);
    document.getElementById('sumDate').textContent = dateObj.toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).toUpperCase();
    
    document.getElementById('sumPrice').textContent = 'S/ ' + price;
    document.getElementById('summary').style.display = 'block';
  } else {
    document.getElementById('summary').style.display = 'none';
  }
}

['service', 'professional', 'date'].forEach(id => {
  document.getElementById(id).addEventListener('change', updateSummary);
});

function showModal() {
  document.getElementById('warningModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('warningModal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalAndScroll() {
  closeModal();
  document.getElementById('reservas').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    document.getElementById('service').focus();
  }, 800);
}

document.getElementById('warningModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

function confirmBooking() {
  const service = document.getElementById('service').value;
  const professional = document.getElementById('professional').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  
  if (!service || !professional || !date || !time || !name || !phone) {
    showModal();
    return;
  }
  
  const [serviceName, price] = service.split('|');
  const [profName, profPhone, professionalTitle] = professional.split('|');
  
  const [year, month, day] = date.split('-');
  const dateObj = new Date(year, month - 1, day);
  const dateFormatted = dateObj.toLocaleDateString('es-PE', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).toUpperCase();
  
  const separator = '━━━━━━━━━━━━━━━━━━━━━━';
  const message = `💈 *¡NUEVA RESERVA CONFIRMADA!* 💈 \n${separator}\n📋 *SERVICIO:* ${serviceName.toUpperCase()}\n💰 *PRECIO:* S/ ${price}\n\n${separator}\n✂️ *${professionalTitle}:* ${profName.toUpperCase()}\n\n${separator}\n📅 *FECHA:* ${dateFormatted}\n⏰ *HORA:* ${time}\n\n${separator}\n👤 *CLIENTE:* ${name.toUpperCase()}\n📱 *TELÉFONO:* ${phone}\n${email ? `📧 *EMAIL:* ${email}\n` : ''}\n${separator}\n✨ *¡Muchas gracias estaré puntual!* ✨`;
  
  const whatsappURL = `https://wa.me/${profPhone}?text=${encodeURIComponent(message)}`;
  
  document.getElementById('bookingForm').style.display = 'none';
  document.getElementById('confirmation').classList.add('active');
  document.getElementById('confirmation').scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  setTimeout(() => {
    document.getElementById('whatsappLink').href = whatsappURL;
    document.getElementById('whatsappLink').click();
  }, 1500);
}

function resetForm() {
  document.getElementById('bookingForm').style.display = 'block';
  document.getElementById('confirmation').classList.remove('active');
  document.getElementById('service').value = '';
  document.getElementById('professional').value = 'Kennedy Ramirez|51977355999|BARBERO';
  document.getElementById('date').value = '';
  document.getElementById('time').value = '';
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
  document.getElementById('summary').style.display = 'none';
  document.getElementById('bookingForm').scrollIntoView({ behavior: 'smooth' });
}

const today = new Date().toISOString().split('T')[0];
document.getElementById('date').setAttribute('min', today);

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('confirmation').classList.remove('active');
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && document.getElementById('warningModal').classList.contains('active')) {
    closeModal();
  }
});
