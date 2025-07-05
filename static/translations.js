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
        language: "Idioma"
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
        language: "Language"
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
        language: "Idioma"
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
    document.getElementById('chat-title').textContent = t.chatTitle;
    document.getElementById('pergunta').placeholder = t.placeholder;
    document.getElementById('send-button').textContent = t.sendButton;
    document.getElementById('chat-button').title = t.openChat;
    
    // Update language selector
    document.getElementById('language-label').textContent = t.language;
    
    // Update existing messages
    const userMessages = document.querySelectorAll('.user b');
    const botMessages = document.querySelectorAll('.bot b');
    
    userMessages.forEach(msg => msg.textContent = t.userLabel);
    botMessages.forEach(msg => msg.textContent = t.botLabel);
}

function initializeLanguage() {
    const savedLang = localStorage.getItem('chatbot-language') || 'pt';
    currentLanguage = savedLang;
    document.getElementById('language-select').value = savedLang;
    updateTexts();
}

// Export for global access
window.translations = translations;
window.setLanguage = setLanguage;
window.updateTexts = updateTexts;
window.initializeLanguage = initializeLanguage;
window.currentLanguage = () => currentLanguage;