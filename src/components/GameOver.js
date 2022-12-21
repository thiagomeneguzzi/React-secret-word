import './GameOver.css';

const GameOver = ({reset, score}) => {
    return (
        <div>
            <h1>Fim de jogo!</h1>
            <h2>
                Sua pontuação foi de: <span>{score}</span>
            </h2>
            <button onClick={() => reset()}>Resetar jogo</button>
        </div>

    )
}

export default GameOver;