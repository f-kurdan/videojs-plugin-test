document.addEventListener('DOMContentLoaded', () => {
    const players = ['my-video1', 'my-video2']; // ID для всех плееров
    players.forEach((playerId) => {
        const player = videojs(playerId);
        player.chat();
    });
});