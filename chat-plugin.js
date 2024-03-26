videojs.registerPlugin('chat', function (options) {
    const player = this;
    var playerId = player.id(); 
    var storageKey = 'vjs-chat-messages-' + playerId;
    
    const chatContainer = document.createElement('div');
    chatContainer.classList.add('vjs-chat');

    const chatMessages = document.createElement('div');
    chatMessages.classList.add('vjs-chat-messages');
    chatContainer.appendChild(chatMessages);

    const chatInput = document.createElement('input');
    chatInput.classList.add('vjs-chat-input');
    chatInput.type = 'text';
    chatInput.placeholder = 'Введите сообщение';

    const chatButton = document.createElement('button');
    chatButton.classList.add('vjs-chat-button');
    chatButton.textContent = 'Отправить';

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('vjs-chat-input-container');
    inputContainer.appendChild(chatInput);
    inputContainer.appendChild(chatButton);

    chatContainer.appendChild(inputContainer);

    // Обработчик клика на кнопку отправки
    chatButton.onclick = function () {
        const message = chatInput.value.trim();
        if (message) {
            // Отображение сообщения в чате
            const messageContainer = document.createElement('div');
            messageContainer.textContent = message;
            messageContainer.classList.add('vjs-chat-message');
            chatMessages.appendChild(messageContainer);

            // Сохранение сообщений в локальном хранилище
            const messages = JSON.parse(localStorage.getItem(storageKey) || '[]');
            messages.push(message);
            localStorage.setItem(storageKey, JSON.stringify(messages));

            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Очистка поля ввода
            chatInput.value = '';
        }
    };

    //Добавление контейнера чата в плеер
    player.el().appendChild(chatContainer);

    // Показ чата при начале воспроизведения
    player.on('play', function () {
        chatContainer.style.display = 'block';
    });

    // Загрузка сохраненных сообщений из локального хранилища
    const savedMessages = JSON.parse(localStorage.getItem(storageKey) || '[]');
    savedMessages.forEach(function (message) {
        const messageContainer = document.createElement('div');
        messageContainer.textContent = message;
        messageContainer.classList.add('vjs-chat-message');
        chatMessages.appendChild(messageContainer);
    });
});

// Инициализация плагина чата после создания плеера
const player = videojs('my-video');
player.chat();