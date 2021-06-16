export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 720, 480)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 25, 25)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer) {
        context.fillStyle = 'red';
        context.fillRect(currentPlayer.x, currentPlayer.y, 25, 25);
        context.rotate(currentPlayer.angle)
    }

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
    })
}
