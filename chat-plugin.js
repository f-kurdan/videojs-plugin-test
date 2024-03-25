videojs.registerPlugin('chat', function (options) {
    var player = this;

    var chatContainer = document.getElementById('chat-container');
    var chatMessages = document.getElementById('chat-messages');
    var chatInput = document.getElementById('chat-input');
    var chatButton = document.getElementById('chat-send');

    // Обработчик клика на кнопку отправки
    chatButton.onclick = function () {
        var message = chatInput.value.trim();
        if (message) {
            // Отображение сообщения в чате
            var messageContainer = document.createElement('div');
            messageContainer.textContent = message;
            messageContainer.classList.add('vjs-chat-message');
            chatMessages.appendChild(messageContainer);

            // Сохранение сообщений в локальном хранилище
            var messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
            messages.push(message);
            localStorage.setItem('chatMessages', JSON.stringify(messages));

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
    var savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    savedMessages.forEach(function (message) {
        var messageContainer = document.createElement('div');
        messageContainer.textContent = message;
        messageContainer.classList.add('vjs-chat-message');
        chatMessages.appendChild(messageContainer);
    });
});

// Инициализация плагина чата после создания плеера
var player = videojs('my-video');
player.chat();