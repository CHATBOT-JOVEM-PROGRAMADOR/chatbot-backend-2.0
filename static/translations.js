const translations = {
    pt: {
        chatTitle: "FALA BOT",
        placeholder: "Digite sua pergunta...",
        sendButton: "Enviar",
        userLabel: "Você:",
        botLabel: "Bot:",
        openChat: "Abrir chat",
        closeChat: "Fechar chat",
        minimize: "Minimizar",
        language: "Idioma:",
        errorMessage: "Desculpe, ocorreu um erro. Tente novamente.",
        welcomeTitle: "FALA BOT",
        welcomeSubtitle: "Seu assistente inteligente para informações sobre o Programa Jovem Programador. Clique no botão de chat para começar a conversar!",
        featureAiTitle: "Assistente IA",
        featureAiDesc: "Powered by Google Gemini para respostas precisas e contextuais",
        featureLangTitle: "Multilíngue",
        featureLangDesc: "Suporte para Português, Inglês e Espanhol",
        featureChatTitle: "Chat Intuitivo",
        featureChatDesc: "Interface moderna e responsiva para melhor experiência"
    },
    en: {
        chatTitle: "TALK BOT",
        placeholder: "Type your question...",
        sendButton: "Send",
        userLabel: "You:",
        botLabel: "Bot:",
        openChat: "Open chat",
        closeChat: "Close chat",
        minimize: "Minimize",
        language: "Language:",
        errorMessage: "Sorry, an error occurred. Please try again.",
        welcomeTitle: "TALK BOT",
        welcomeSubtitle: "Your intelligent assistant for information about the Young Programmer Program. Click the chat button to start chatting!",
        featureAiTitle: "AI Assistant",
        featureAiDesc: "Powered by Google Gemini for accurate and contextual responses",
        featureLangTitle: "Multilingual",
        featureLangDesc: "Support for Portuguese, English and Spanish",
        featureChatTitle: "Intuitive Chat",
        featureChatDesc: "Modern and responsive interface for better experience"
    },
    es: {
        chatTitle: "HABLA BOT",
        placeholder: "Escribe tu pregunta...",
        sendButton: "Enviar",
        userLabel: "Tú:",
        botLabel: "Bot:",
        openChat: "Abrir chat",
        closeChat: "Cerrar chat",
        minimize: "Minimizar",
        language: "Idioma:",
        errorMessage: "Lo siento, ocurrió un error. Inténtalo de nuevo.",
        welcomeTitle: "HABLA BOT",
        welcomeSubtitle: "Tu asistente inteligente para información sobre el Programa Joven Programador. ¡Haz clic en el botón de chat para empezar a chatear!",
        featureAiTitle: "Asistente IA",
        featureAiDesc: "Impulsado por Google Gemini para respuestas precisas y contextuales",
        featureLangTitle: "Multiidioma",
        featureLangDesc: "Soporte para Portugués, Inglés y Español",
        featureChatTitle: "Chat Intuitivo",
        featureChatDesc: "Interfaz moderna y responsiva para mejor experiencia"
    }
};

let currentLanguage = 'pt';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('chatbot-language', lang);
    updateTexts();
}

function updateTexts() {
    const t = translations[currentLanguage];
    
    // Update chat elements
    const chatTitle = document.getElementById('chat-title');
    const perguntaInput = document.getElementById('pergunta');
    const sendButton = document.getElementById('send-button');
    const chatButton = document.getElementById('chat-button');
    const languageLabel = document.getElementById('language-label');
    
    if (chatTitle) chatTitle.textContent = t.chatTitle;
    if (perguntaInput) perguntaInput.placeholder = t.placeholder;
    if (sendButton) sendButton.textContent = t.sendButton;
    if (languageLabel) languageLabel.textContent = t.language;
    
    // Update welcome screen
    const welcomeTitle = document.getElementById('welcome-title');
    const welcomeSubtitle = document.getElementById('welcome-subtitle');
    const featureAiTitle = document.getElementById('feature-ai-title');
    const featureAiDesc = document.getElementById('feature-ai-desc');
    const featureLangTitle = document.getElementById('feature-lang-title');
    const featureLangDesc = document.getElementById('feature-lang-desc');
    const featureChatTitle = document.getElementById('feature-chat-title');
    const featureChatDesc = document.getElementById('feature-chat-desc');
    
    if (welcomeTitle) welcomeTitle.textContent = t.welcomeTitle;
    if (welcomeSubtitle) welcomeSubtitle.textContent = t.welcomeSubtitle;
    if (featureAiTitle) featureAiTitle.textContent = t.featureAiTitle;
    if (featureAiDesc) featureAiDesc.textContent = t.featureAiDesc;
    if (featureLangTitle) featureLangTitle.textContent = t.featureLangTitle;
    if (featureLangDesc) featureLangDesc.textContent = t.featureLangDesc;
    if (featureChatTitle) featureChatTitle.textContent = t.featureChatTitle;
    if (featureChatDesc) featureChatDesc.textContent = t.featureChatDesc;
    
    // Update chat button title
    if (typeof updateChatButtonTitle === 'function') {
        updateChatButtonTitle();
    }
    
    // Update existing messages
    const userMessages = document.querySelectorAll('.user b');
    const botMessages = document.querySelectorAll('.bot b');
    
    userMessages.forEach(msg => msg.textContent = t.userLabel);
    botMessages.forEach(msg => msg.textContent = t.botLabel);
}

function initializeLanguage() {
    const savedLang = localStorage.getItem('chatbot-language') || 'pt';
    currentLanguage = savedLang;
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = savedLang;
    }
    updateTexts();
}

// Export for global access
window.translations = translations;
window.setLanguage = setLanguage;
window.updateTexts = updateTexts;
window.initializeLanguage = initializeLanguage;
window.currentLanguage = () => currentLanguage;