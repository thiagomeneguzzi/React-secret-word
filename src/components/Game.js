import './Game.css';
import {useRef, useState} from "react";

const Game = ({verifyLetter, guessedLetters, guesses, wrongLetters, score, letters, pickedWord}) => {
    const [letter, setLetter] = useState('');

    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetter(letter);

        setLetter('');
        inputRef.current.focus();
    }

    return (
        <div className="game">
            <p className="Points">Pontuação: {score}</p>
            <h1>Adivinhe a palavra:</h1>
            <h3 className="tip">
                Dica sobre a palavra: <span>{pickedWord.category}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativa(s)...</p>
            <div className="wordContainer">
                {letters.map((letter, index) => (
                    guessedLetters.includes(letter) ? (
                        <span key={index} className="letter">{letter}</span>
                    ) : (
                        <span key={index} className="blankSquare"></span>
                    )
                ))}
            </div>
            <div className="letterContainer">
                <p>Tente adivinhas uma letra da palavra</p>
                <form onSubmit={handleSubmit}>
                    <input ref={inputRef} type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter}/>
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas</p>
                {wrongLetters.map((letter, index) => (
                    <span key={index}>{letter}, </span>
                ))}
            </div>
        </div>

    )
}

export default Game;