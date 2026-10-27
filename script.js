/* ==========================================================================
   1. CANVAS COM ESTRELAS CINTILANTES
   ========================================================================== */
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = 150;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
}

function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.4,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.alpha += star.speed * star.direction;
    if (star.alpha >= 1) {
      star.alpha = 1;
      star.direction = -1;
    } else if (star.alpha <= 0.1) {
      star.alpha = 0.1;
      star.direction = 1;
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.shadowBlur = star.radius * 3;
    ctx.shadowColor = '#ffffff';
    ctx.fill();
    ctx.restore();
  });

  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateStars();

/* ==========================================================================
   2. EFEITO TYPEWRITER (DIGITAÇÃO DINÂMICA)
   ========================================================================== */
const typewriterWords = [
  'Soluções em seu negócio.',
  'automações para seu dia a dia.',
  'dashboards para gerenciamento de sua empresa.',
  'Sistema Web para sua empresa.'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeEffect() {
  const currentWord = typewriterWords[wordIndex];

  if (isDeleting) {
    typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 2200; // pausa ao terminar de digitar
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typewriterWords.length;
    typingSpeed = 500;
  }

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();

/* ==========================================================================
   3. HABILIDADES E FERRAMENTAS (CARROSSEL)
   ========================================================================== */
const skillsData = [
  { name: 'Python', icon: 'fa-brands fa-python', color: '#3776ab' },
  { name: 'HTML & CSS', icon: 'fa-brands fa-html5', color: '#e34f26' },
  { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#f7df1e' },
  { name: 'SQL ', icon: 'fa-solid fa-database', color: '#4ECCA3' },
  { name: 'Power BI', icon: 'fa-solid fa-chart-pie', color: '#f2c811' },
  { name: 'Excel Avançado', icon: 'fa-solid fa-file-excel', color: '#107c41' }
];

const skillsTrack = document.getElementById('skills-track');
const skillPrev = document.getElementById('skill-prev');
const skillNext = document.getElementById('skill-next');

skillsData.forEach(skill => {
  const card = document.createElement('div');
  card.className = 'skill-card';
  card.innerHTML = `
    <div class="skill-icon-circle">
      <i class="${skill.icon}" style="color: ${skill.color}"></i>
    </div>
    <span class="skill-name">${skill.name}</span>
  `;
  skillsTrack.appendChild(card);
});

let currentSkillOffset = 0;

function updateSkillsCarousel() {
  const cardWidth = skillsTrack.children[0].offsetWidth + 32; // card + gap
  const visibleCards = window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1;
  const maxOffset = skillsData.length - visibleCards;

  if (currentSkillOffset < 0) currentSkillOffset = 0;
  if (currentSkillOffset > maxOffset) currentSkillOffset = maxOffset;

  skillsTrack.style.transform = `translateX(-${currentSkillOffset * cardWidth}px)`;
}

skillPrev.addEventListener('click', () => {
  if (currentSkillOffset > 0) {
    currentSkillOffset--;
    updateSkillsCarousel();
  }
});

skillNext.addEventListener('click', () => {
  const visibleCards = window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1;
  if (currentSkillOffset < skillsData.length - visibleCards) {
    currentSkillOffset++;
    updateSkillsCarousel();
  }
});

window.addEventListener('resize', updateSkillsCarousel);

/* ==========================================================================
   4. PROJETOS (RENDERIZAÇÃO & FILTRAGEM POR ABAS)
   ========================================================================== */
const projectsData = [
  {
    title: 'Sistema de Gerenciamento de Prova',
    category: 'fullstack',
    desc: 'Sistema Web desenvolvido para empresa SENAC processos administrativos para Prova.',
    tags: ['Python', 'Flask', 'SQL', 'JavaScript'],
    img: 'prova_facil.png',
    demoUrl: 'prova_facil.pdf',
    codeUrl: 'https://github.com/Viictor-Guerrero/prova_facil/tree/main/provafacil'
  },
  {
    title: 'Dashboard de Indicadores Operacionais - Power BI',
    category: 'dados',
    desc: 'Painel analítico automatizado em Power BI, tratamento de dados via Power Query.',
    tags: ['Power BI', 'Power Query', 'Excel Avançado', 'Dados'],
    img: 'imagem04.png',
    demoUrl: 'imagem05.PNG',
    codeUrl: 'https://github.com/Viictor-Guerrero'
  },
  {
    title: 'Automação & Processamento em Lote',
    category: 'backend',
    desc: 'Script em Python para integração de planilhas complexas, validação de regras de negócio e geração de relatórios.',
    tags: ['Python', 'Pandas', 'OpenPyXL', 'SQL'],
    img: 'imagem06.png',
    demoUrl: 'imagem06.png',
    codeUrl: 'https://github.com/Viictor-Guerrero'
  },
  {
    title: 'Calendário Interativo em tempo real',
    category: 'frontend',
    desc: 'Aplicação web front-end com calendário interativo, validação dinâmica de dados',
    tags: ['HTML', 'CSS', 'JavaScript'],
    img: 'imagem07.png',
    demoUrl: 'imagem09.PNG',
    codeUrl: 'https://github.com/Viictor-Guerrero'
  },
  {
    title: 'Sistema para gerenciar integrações de dados no ambiente virtual moodle',
    category: 'fullstack',
    desc: 'Sistema com autenticação de acesso, dinâmica de arquivos, cruzamentos de dados customizados.Exportação Dinâmica em Memória: Geração de relatórios em Excel (.xlsx), para integração de dados na plataforma moodle.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Python' ],
    img: 'foto_fundo.png',
    demoUrl: 'comparador_moodle.pdf',
    codeUrl: 'https://github.com/Viictor-Guerrero/sistema_identificador_moodle/tree/main'
  }, 
  {
    title: 'Sistema desenvolvido para controle de chamados',
    category: 'backend',
    desc: 'Back-end com endpoints estruturados para abertura, acompanhamento e histórico de chamados com banco SQLite.',
    tags: ['Python', 'REST API', 'SQLite'],
    img: 'imagem33.png',
    demoUrl: 'sistema_chamados.pdf',
    codeUrl: 'https://github.com/Viictor-Guerrero/sistema_de_chamados'
  },
  {
    title: 'Plataforma de gerenciamento financeiro',
    category: 'backend',
    desc: 'Plataforma criada para gerenciamento e lançamentos de produtos farmacêuticos, com pagina exclusiva de gerenciamento administrador de usuários',
    tags: ['JavaScript', 'HTML', 'CSS', 'Python', 'Pandas'],
    img: 'imagem29.PNG',
    demoUrl: 'gerenciamento_financeiro.pdf',
    codeUrl: 'https://github.com/Viictor-Guerrero/sistema_gerenciamento_financeiro'
  }
];

const projectsGrid = document.getElementById('projects-grid');
const tabButtons = document.querySelectorAll('.tab-btn');

function renderProjects(filter = 'all') {
  projectsGrid.innerHTML = '';
  const filtered = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-thumb">
        <img src="${item.img}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="project-body">
        <h3 class="project-card-title">${item.title}</h3>
        <p class="project-card-desc">${item.desc}</p>
        <div class="project-tags">
          ${item.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${item.demoUrl}" class="project-link-btn" target="_blank">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo
          </a>
          <a href="${item.codeUrl}" class="project-link-btn" target="_blank">
            <i class="fa-brands fa-github"></i> Código
          </a>
        </div>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

renderProjects();

/* ==========================================================================
   5. CERTIFICAÇÕES RELEVANTES (PAGINAÇÃO)
   ========================================================================== */
const certsData = [
  {
    title: 'Formação em Análise desenvolvimento de Sistemas',
    issuer: 'Certificação • Concluído em 2026',
    desc: 'Apto para desenvolvimento de sistemas.',
    icon: 'fa-solid fa-chart-line',
    certUrl: 'certificado_de_conclusao_ads.pdf'
  },
  {
    title: 'Desenvolvimento em Python',
    issuer: 'Formação Prática • Concluído em 2023',
    desc: 'Construção de APIs REST, back-end estruturado em Python, persistência SQL e interfaces modernas com Python e BackEnd.',
    icon: 'fa-solid fa-laptop-code',
    certUrl: 'https://www.udemy.com/certificate/UC-d3cbc031-9e56-4347-9c80-51ef6b166b3f/'
  },
  {
    title: 'Modelagem de dados e Excel Avançado',
    issuer: 'Certificação Técnica • Concluído em 2025',
    desc: 'Criação de consultas complexas, joins, agregações analíticas, triggers e otimização de consultas relacionais.',
    icon: 'fa-solid fa-database',
    certUrl: 'https://www.udemy.com/certificate/UC-8cf5e471-564b-45fb-9be8-1fcd78ea8036/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com'
  }
];

let currentCertIndex = 0;
const certCard = document.getElementById('cert-card');
const certDotsContainer = document.getElementById('cert-dots');
const certCounter = document.getElementById('cert-counter');
const certPrev = document.getElementById('cert-prev');
const certNext = document.getElementById('cert-next');

function renderCert(index) {
  const item = certsData[index];
  certCard.style.opacity = '0';

  setTimeout(() => {
    certCard.innerHTML = `
      <i class="${item.icon} cert-badge-icon"></i>
      <h3 class="cert-title">${item.title}</h3>
      <span class="cert-issuer">${item.issuer}</span>
      <p class="cert-desc">${item.desc}</p>
      <a href="${item.certUrl}" class="btn-pill" target="_blank" style="margin-top: 0.5rem;">
        Ver Comprovante
      </a>
    `;
    certCard.style.opacity = '1';
  }, 180);

  // Indicador de Dots e Contador
  certDotsContainer.innerHTML = '';
  certsData.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `cert-dot ${i === index ? 'active' : ''}`;
    certDotsContainer.appendChild(dot);
  });

  certCounter.textContent = `${index + 1} / ${certsData.length}`;
}

certPrev.addEventListener('click', () => {
  currentCertIndex = (currentCertIndex - 1 + certsData.length) % certsData.length;
  renderCert(currentCertIndex);
});

certNext.addEventListener('click', () => {
  currentCertIndex = (currentCertIndex + 1) % certsData.length;
  renderCert(currentCertIndex);
});

renderCert(currentCertIndex);

/* ==========================================================================
   6. FORMULÁRIO DE CONTATO (INTEGRAÇÃO FORMS.APP)
   ========================================================================== */
const contactForm = document.getElementById('contact-form');
const FORMS_APP_BASE = 'https://go.forms.app/form/6ada30896ce5d988c1583f8c';

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const message = document.getElementById('message')?.value || '';

    // Monta os parâmetros para transferir o que o usuário digitou direto para o formulário
    const params = new URLSearchParams({
      name: name,
      email: email,
      phone: phone,
      message: message
    });

    const targetUrl = `${FORMS_APP_BASE}?${params.toString()}`;

    // Abre o forms.app em nova aba para salvar a resposta no seu painel
    window.open(targetUrl, '_blank');

    alert(`Obrigado pelo contato, ${name}! Redirecionando para confirmar seu envio.`);
    contactForm.reset();
  });
}
