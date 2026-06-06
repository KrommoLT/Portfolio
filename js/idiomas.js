const textos = {
  "en": {
    "home": "Home",
    "about": "About",
    "projects": "Projects",
    "myWork": "My Work",
    "description": "Hi! I'm Lucas, a passionate web developer with a knack for creating engaging and user-friendly websites. With a strong foundation in HTML, CSS, and JavaScript, I specialize in crafting responsive designs that look great on any device. I enjoy turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you can find me exploring the latest tech trends or working on personal projects to sharpen my skills.",
    "aboutMe_description": "I’m a frontend developer passionate about building clean and engaging web experiences. Born in Argentina and now based in Switzerland, I focus on creating responsive and user-friendly interfaces. I’m constantly improving my skills and enjoy working on real-world projects that challenge me to grow as a developer.",
    "contactInfoTitle": "Contact Info",
    "contactInfo_description": "Feel free to reach out to me through any of the platforms below. I'm always open to discussing new projects, collaborations, or just connecting with fellow developers and tech enthusiasts!",
    "contact": "Contact"
  },
  "esp": {
    "home": "Inicio",
    "about me": "Acerca de mi",
    "projects": "Proyectos",
    "myWork": "Mis proyectos",
    "description": "¡Hola! Soy Lucas, un desarrollador web apasionado con un talento para crear sitios web atractivos y fáciles de usar. Con una sólida base en HTML, CSS y JavaScript, me especializo en crear diseños responsivos que se ven bien en cualquier dispositivo. Disfruto transformando problemas complejos en diseños simples, hermosos e intuitivos. Cuando no estoy programando, puedes encontrarme explorando las últimas tendencias tecnológicas o trabajando en proyectos personales para mejorar mis habilidades.",
    "aboutMe_description": "Soy un desarrollador frontend apasionado por construir experiencias web limpias y atractivas. Nacido en Argentina y ahora basado en Suiza, me enfoco en crear interfaces responsivas y amigables para el usuario. Estoy constantemente mejorando mis habilidades y disfruto trabajando en proyectos del mundo real que me desafían a crecer como desarrollador.",
    "contactInfoTitle": "Contacto",
    "contactInfo_description": "No dudes en contactarme a través de cualquiera de las plataformas de abajo. ¡Estoy siempre abierto a discutir nuevos proyectos, colaboraciones o simplemente conectarme con otros desarrolladores y entusiastas de la tecnología!",
    "contact": "Contacto"
  }
}
/* Función para cambiar el idioma del sitio web */
function ChangeLanguage(idioma) {
    const homeEl = document.getElementById("homeLink");
    const aboutEl = document.getElementById("aboutTitle");
    const projectsEl = document.getElementById("projectsLink");
    const descriptionEl = document.getElementById("description");
    const aboutMeDescriptionEl = document.getElementById("aboutMe_description");
    const projectsTitleEl = document.getElementById("projectsTitle");
    const contactTitleEl = document.getElementById("contactTitle");
    const contactInfoEl = document.getElementById("contactInfo_description");
    const contactEl = document.getElementById("contactLink");

    if (homeEl) homeEl.textContent = textos[idioma]["home"];
    if (aboutEl) aboutEl.textContent = textos[idioma]["about"] || textos[idioma]["about me"];
    if (projectsEl) projectsEl.textContent = textos[idioma]["projects"];
    if (projectsTitleEl) projectsTitleEl.textContent = textos[idioma]["myWork"];
    if (descriptionEl) descriptionEl.textContent = textos[idioma]["description"];
    if (aboutMeDescriptionEl) aboutMeDescriptionEl.textContent = textos[idioma]["aboutMe_description"];
    if (contactTitleEl) contactTitleEl.textContent = textos[idioma]["contactInfoTitle"];
    if (contactInfoEl) contactInfoEl.textContent = textos[idioma]["contactInfo_description"];
    if (contactEl) contactEl.textContent = textos[idioma]["contact"];
}