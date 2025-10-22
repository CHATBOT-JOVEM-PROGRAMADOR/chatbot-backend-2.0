
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');
    const input = document.getElementById('pergunta');

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const pergunta = input.value.trim();
        if (!pergunta) return; // evita mensagens vazias

        // Exibe mensagem do usuário
        const userMsg = document.createElement("div");
        userMsg.classList.add("user");
        userMsg.innerHTML = `<b>Você:</b> ${pergunta}`;
        chatBox.appendChild(userMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
        input.value = '';

        try {
            // Faz requisição para o backend Flask
            const resp = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pergunta }),
            });

            if (!resp.ok) throw new Error("Erro na resposta do servidor");

            const data = await resp.json();

            // Exibe resposta do bot
            const botMsg = document.createElement("div");
            botMsg.classList.add("bot");
            botMsg.innerHTML = `<b>Bot:</b> ${data.resposta}`;
            chatBox.appendChild(botMsg);
            chatBox.scrollTop = chatBox.scrollHeight;

        } catch (error) {
            console.error("Erro:", error);
            const errorMsg = document.createElement("div");
            errorMsg.classList.add("bot", "error");
            errorMsg.innerHTML = `<b>Erro:</b> Não foi possível obter resposta.`;
            chatBox.appendChild(errorMsg);
        }
    });
});




document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bg");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // ======== Luz e Objeto 3D ========
  const geometry = new THREE.IcosahedronGeometry(2, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00d9ff,
    wireframe: true,
    emissive: 0x0088ff
  });
  const shape = new THREE.Mesh(geometry, material);
  scene.add(shape);

  const light = new THREE.PointLight(0x00d9ff, 1.5);
  light.position.set(5, 5, 5);
  scene.add(light);

  camera.position.z = 5;

  // ======== Partículas de Fundo ========
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00d9ff,
    size: 0.03
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // ======== Animação ========
  function animate() {
    requestAnimationFrame(animate);
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.015;
    particlesMesh.rotation.y += 0.005;
    renderer.render(scene, camera);
  }

  animate();

  // ======== Ajuste do tamanho da tela ========
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ======== Transição de saída do loading ========
  window.addEventListener("load", () => {
    const loading = document.getElementById("loading-screen");
    const main = document.getElementById("main-content");
   
    setTimeout(() => {
      loading.style.opacity = "0";
      setTimeout(() => {
        loading.style.display = "none";
        main.classList.remove("hidden");
        document.body.style.overflow = "auto";
        
      }, 4000);
    }, 6000);
    
  });
});


// CHAT BOX

// === ABRIR / FECHAR CHAT ===
document.addEventListener("DOMContentLoaded", () => {
  const chatIcon = document.getElementById("chat-icon");
  const chatWidget = document.getElementById("chat-widget");
  const closeChat = document.getElementById("close-chat");

  // === ABRIR / FECHAR CHAT ===
  chatIcon.addEventListener("click", () => {
    chatWidget.classList.toggle("hidden");
  });

  closeChat.addEventListener("click", (e) => {
    e.stopPropagation(); // evita conflito de cliques
    chatWidget.classList.add("hidden");
  });

  // === PERMITIR ARRASTAR ===
  const header = chatWidget.querySelector(".chat-header");
  let offsetX = 0, offsetY = 0, isDragging = false;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - chatWidget.offsetLeft;
    offsetY = e.clientY - chatWidget.offsetTop;
    chatWidget.style.transition = "none";
    document.body.style.userSelect = "none"; // evita seleção de texto
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "auto";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    chatWidget.style.left = `${e.clientX - offsetX}px`;
    chatWidget.style.top = `${e.clientY - offsetY}px`;
    chatWidget.style.bottom = "auto";
    chatWidget.style.right = "auto";
  });
});

// navbar

// Espera a tela de loading sumir
window.addEventListener("load", () => {
    const navbar = document.querySelector(".futuristic-navbar");
    const loadingScreen = document.getElementById("loading-screen");

    // inicia fade-out do loading
    loadingScreen.style.opacity = "0";

    // depois do fade de 2s, esconde completamente e mostra navbar
    setTimeout(() => {
        loadingScreen.style.display = "none";
        navbar.classList.add("visible"); // mostra navbar com efeito
    }, 4000); // 2000ms = 2s
});

// Dropdown clicável
document.querySelectorAll(".dropdown").forEach(drop => {
    drop.addEventListener("click", () => {
        drop.classList.toggle("active");
    });
});

//mostrar cada seção
function mostrarSecao(secaoId) {
    const secoes = ['chatbot', 'sobre-projeto', 'contatos'];
    secoes.forEach(id => {
        document.getElementById(id).style.display = (id === secaoId) ? 'block' : 'none';
    });

    // rola para o topo da seção, ajustando 80px para a navbar
    const top = document.getElementById(secaoId).offsetTop - 80; 
    window.scrollTo({ top: top, behavior: 'smooth' });
}



// ====== REDIMENSIONAMENTO DO PAINEL TTS ======
// ===== ELEMENTOS =====
const ttsIcon = document.getElementById('tts-icon');
const ttsPanel = document.getElementById('tts-panel');
const ttsHeader = document.getElementById('tts-header');
const ttsText = document.getElementById('tts-text');
const playBtn = document.getElementById('tts-play');
const pauseBtn = document.getElementById('tts-pause');
const stopBtn = document.getElementById('tts-stop');
const ttsResizeHandle = document.getElementById('tts-resize-handle');

// ===== ABRIR / FECHAR PAINEL =====
const closeTTS = document.getElementById('close-tts');



// botão de abrir/fechar TTS
ttsIcon.addEventListener('click', () => {
    ttsPanel.classList.toggle('hidden');
});

closeTTS.addEventListener('click', (e) => {
    e.stopPropagation();
    ttsPanel.classList.add('hidden');
});



// ===== SELECIONAR TEXTO DA PÁGINA =====
document.addEventListener('mouseup', () => {
  const selecionado = window.getSelection().toString().trim();
  if (selecionado !== "") {
    ttsText.value = selecionado;
  }
});

// ===== CONTROLES DE ÁUDIO =====
playBtn.addEventListener('click', () => {
  const texto = ttsText.value.trim();
  if (texto) responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.0 });
});

pauseBtn.addEventListener('click', () => responsiveVoice.pause());


// ====== REDIMENSIONAMENTO ======
let resizing = false;

ttsResizeHandle.addEventListener('mousedown', (e) => {
  e.preventDefault();
  resizing = true;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mouseup', () => {
  resizing = false;
  document.body.style.userSelect = 'auto';
});

document.addEventListener('mousemove', (e) => {
  if (!resizing) return;

  const newWidth = e.clientX - ttsPanel.getBoundingClientRect().left;
  const newHeight = e.clientY - ttsPanel.getBoundingClientRect().top;

  ttsPanel.style.width = `${Math.min(newWidth, window.innerWidth * 0.9)}px`;
  ttsPanel.style.height = `${Math.min(newHeight, window.innerHeight * 0.9)}px`;
});

// ====== ARRASTAR ======
let dragging = false;
let offsetX, offsetY;

ttsHeader.addEventListener('mousedown', (e) => {
  dragging = true;
  const rect = ttsPanel.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mouseup', () => {
  dragging = false;
  document.body.style.userSelect = 'auto';
});



document.addEventListener('mousemove', (e) => {
  if (!dragging) return;

  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  // Evita sair da tela
  x = Math.max(0, Math.min(x, window.innerWidth - ttsPanel.offsetWidth));
  y = Math.max(0, Math.min(y, window.innerHeight - ttsPanel.offsetHeight));

  ttsPanel.style.left = x + 'px';
  ttsPanel.style.top = y + 'px';
  ttsPanel.style.bottom = 'auto';
  ttsPanel.style.right = 'auto';
});


// ====== LIMITES DE TAMANHO E POSIÇÃO DO CHAT ======
(function setupChatBounds() {
  const chatWidget = document.getElementById('chat-widget');
  if (!chatWidget) return;

  const MIN_WIDTH = 400;
  const MIN_HEIGHT = 480;
  const MAX_WIDTH = window.innerWidth * 0.9;
  const MAX_HEIGHT = window.innerHeight * 0.85;

  // Corrige tamanho sempre que o chat é redimensionado
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const el = entry.target;
      const width = el.offsetWidth;
      const height = el.offsetHeight;

      // limita tamanho mínimo e máximo
      if (width < MIN_WIDTH) el.style.width = `${MIN_WIDTH}px`;
      if (height < MIN_HEIGHT) el.style.height = `${MIN_HEIGHT}px`;
      if (width > MAX_WIDTH) el.style.width = `${MAX_WIDTH}px`;
      if (height > MAX_HEIGHT) el.style.height = `${MAX_HEIGHT}px`;
    }
  });
  resizeObserver.observe(chatWidget);

  // Impede que o chat vá pra fora da tela
  function keepChatInViewport() {
    const rect = chatWidget.getBoundingClientRect();
    const margin = 20; // distância mínima das bordas

    if (rect.right > window.innerWidth - margin)
      chatWidget.style.right = `${margin}px`;
    if (rect.bottom > window.innerHeight - margin)
      chatWidget.style.bottom = `${margin}px`;
    if (rect.left < margin)
      chatWidget.style.left = `${margin}px`;
    if (rect.top < margin)
      chatWidget.style.top = `${margin}px`;
  }

  // verifica sempre que a janela muda de tamanho
  window.addEventListener('resize', () => {
    keepChatInViewport();
  });

  // e também logo após carregar
  window.addEventListener('load', keepChatInViewport);
})();


// ---- RECONHECIMENTO DE VOZ PARA O CHAT ----
(function initChatVoice() {
  const micBtn = document.getElementById('mic-btn');
  const input = document.getElementById('pergunta');
  const form = document.getElementById('chat-form');

  if (!micBtn || !input || !form) return; // segurança

  // Feature detect
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    // navegador não suportado: esconde o botão
    micBtn.style.display = 'none';
    console.warn('Reconhecimento de voz não suportado neste navegador.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.interimResults = true;   // mostra resultados parciais
  recognition.continuous = false;      // encerra quando o usuário parar de falar

  let finalTranscript = '';
  let isListening = false;

  function startListening() {
    finalTranscript = '';
    try {
      recognition.start();
    } catch (err) {
      // alguns browsers lançam se start() chamado em estados inválidos
      console.warn('Erro ao iniciar reconhecimento:', err);
    }
  }

  function stopListening() {
    try {
      recognition.stop();
    } catch (err) {
      console.warn('Erro ao parar reconhecimento:', err);
    }
  }

  // clique no botão: inicia/para gravação
  micBtn.addEventListener('click', () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  });

  recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add('listening');
    micBtn.setAttribute('aria-pressed', 'true');
    micBtn.title = 'Gravando... clique para parar';
  };

  recognition.onend = () => {
    isListening = false;
    micBtn.classList.remove('listening');
    micBtn.setAttribute('aria-pressed', 'false');
    micBtn.title = 'Falar';
    // se houver transcrição final, insere no input e envia
    if (finalTranscript.trim().length > 0) {
      input.value = finalTranscript.trim();
      // envia o form programaticamente (usa requestSubmit se disponível)
      if (typeof form.requestSubmit === 'function') {
        form.requestSubmit();
      } else {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
    }
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error', event);
    // parar e resetar estado visual
    isListening = false;
    micBtn.classList.remove('listening');
    micBtn.setAttribute('aria-pressed', 'false');
    micBtn.title = 'Falar';
  };

  recognition.onresult = (event) => {
    let interim = '';
    finalTranscript = finalTranscript || ''; // mantém já finalizados (se houver)
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interim += transcript;
      }
    }
    // Mostra texto ao usuário em tempo real (interim + final)
    input.value = (finalTranscript + ' ' + interim).trim();
  };

})();


// ====== REDIMENSIONAMENTO SINCRONIZADO (versão estável) ======
(() => {
  const ttsPanel = document.getElementById('tts-panel');
  const ttsResizeHandle = document.getElementById('tts-resize-handle');
  const chatWidget = document.getElementById('chat-widget');
  const chatResizeHandle = document.getElementById('resize-handle'); // seu handle do chat

  if (!ttsPanel || !ttsResizeHandle || !chatWidget || !chatResizeHandle) return;

  let activeResize = null; // 'tts' | 'chat' | null
  document.body.style.touchAction = 'none'; // evita comportamento estranho em touch

  function startResize(kind, e) {
    e.preventDefault();
    activeResize = kind;
    document.body.style.userSelect = 'none';
  }

  ttsResizeHandle.addEventListener('mousedown', (e) => startResize('tts', e));
  chatResizeHandle.addEventListener('mousedown', (e) => startResize('chat', e));

  // suporte para touch (opcional)
  ttsResizeHandle.addEventListener('touchstart', (e) => startResize('tts', e.touches[0]));
  chatResizeHandle.addEventListener('touchstart', (e) => startResize('chat', e.touches[0]));

  function stopResize() {
    activeResize = null;
    document.body.style.userSelect = 'auto';
  }
  document.addEventListener('mouseup', stopResize);
  document.addEventListener('touchend', stopResize);

  document.addEventListener('mousemove', (e) => {
    if (!activeResize) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    // Decide qual painel estamos usando como "ativo" (quem iniciou)
    const activePanel = activeResize === 'tts' ? ttsPanel : chatWidget;
    const rect = activePanel.getBoundingClientRect();

    // Calcula tamanho baseado na posição do ponteiro relativo ao canto superior-esquerdo do painel
    let newW = Math.max(160, Math.min(clientX - rect.left, window.innerWidth * 0.9));
    let newH = Math.max(120, Math.min(clientY - rect.top, window.innerHeight * 0.85));

    // Aplica tamanho aos dois painéis (sincroniza)
    [ttsPanel, chatWidget].forEach(panel => {
      panel.style.width = `${newW}px`;
      panel.style.height = `${newH}px`;
    });

    // Fallback: se por algum motivo o textarea não estiver flex, ajusta manualmente
    const ttsText = document.getElementById('tts-text');
    if (ttsText) {
      // calcula espaço disponível subtraindo header e botões (aprox.)
      const header = document.getElementById('tts-header');
      const buttons = document.getElementById('tts-buttons');
      const headerH = header ? header.getBoundingClientRect().height : 40;
      const buttonsH = buttons ? buttons.getBoundingClientRect().height : 40;
      const pad = 32; // padding interno + margens
      const availH = Math.max(60, newH - headerH - buttonsH - pad);
      ttsText.style.height = `${availH}px`;
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (!activeResize) return;
    const touch = e.touches[0];
    if (touch) {
      // delega ao mesmo handler de mouse
      document.dispatchEvent(new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
        bubbles: true
      }));
    }
  }, { passive: false });

})();


