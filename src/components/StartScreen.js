import './StartScreen.css';

const StartScreen = ({ start }) => {

    return (
        <div className="start">
            <h1>Secret word</h1>
            <p>Clique no botão para começar o jogo</p>
            <button onClick={() => start()}>Começar o jogo</button>
        </div>

    )
}

export default StartScreen;