import { useCallback, useEffect, useState } from "react";

import './App.css';

import StartScreen from "./components/StartScreen";

import { wordsList } from './data/words';
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
    {id: 1, name: "start"},
    {id: 2, name: "game"},
    {id: 3, name: "end"},
]

function App() {
    const [gameStage, setGameStage] = useState(stages[0].name)

    const [words] = useState(wordsList);
    const [word, setWord] = useState({value: '', category: ''});
    const [letters, setLetters] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(3);
    const [score, setScore] = useState(0);

    const pickRandomWord = useCallback(() => {
        const possibleCategories = Object.keys(words)
        const categoryIndex = Math.floor(Math.random() * possibleCategories.length);
        const pickedCategory = possibleCategories[categoryIndex];
        const possibleWords = words[pickedCategory];
        const wordIndex = Math.floor(Math.random() * possibleWords.length);
        const pickedWord = possibleWords[wordIndex];

        setWord({value: pickedWord, category: pickedCategory});
        setLetters(pickedWord.toLowerCase().split(''))
    }, [words])

    const handleStart = () => {
        pickRandomWord();
        setGameStage(stages[1].name);
    }

    const handleLost = () => {
        setScore(0);
        resetStatistics();
    }

    const handleWin = useCallback(() => {
        setScore(score + 100);
        resetStatistics();
        pickRandomWord();
    }, [pickRandomWord, score])

    useEffect(() => {
        if(guesses === 0) {
            setGameStage(stages[2].name);
        }
    }, [guesses])

    useEffect(() => {
        const gotAllLetters = letters.every((value) => guessedLetters.includes(value))
        if(gotAllLetters) {
            alert(`Parabéns você acertou a palavra '${word.value}'`)
            handleWin();
        }
    }, [guessedLetters, handleWin, letters, word.value])

    function resetStatistics() {
        setGuessedLetters([]);
        setWrongLetters([]);
        setGuesses(3);
    }

    const verifyLetter = (letter) => {
        const normalizedLetter = letter.toLowerCase();
        const letterAlreadyUsed = checkIfLetterAlreadyHasBeenUsed(normalizedLetter);

        if(letterAlreadyUsed) {
            alert(`A letra '${normalizedLetter}' já foi utilizada.`);
            return;
        }

        const correctWord = letters.includes(letter);
        if(correctWord) {
            setGuessedLetters((prevLetters) => [...prevLetters, normalizedLetter])
        } else {
            setGuesses(guesses - 1);
            setWrongLetters((prevLetters) => [...prevLetters, normalizedLetter])
        }
    }

    const checkIfLetterAlreadyHasBeenUsed = (letter) => {
        return (guessedLetters.includes(letter) || wrongLetters.includes(letter));
    }

    const resetGame = () => {
        setGameStage(stages[0].name)
        handleLost();
    }

    return (
        <div className="App">
            {gameStage === "start" && <StartScreen start={handleStart}/>}
            {gameStage === "game" && (
                <Game
                    verifyLetter={verifyLetter}
                    pickedWord={word}
                    letters={letters}
                    guessedLetters={guessedLetters}
                    wrongLetters={wrongLetters}
                    guesses={guesses}
                    score={score}/>
            )}
            {gameStage === "end" && <GameOver reset={resetGame} score={score}/>}
        </div>
    );
}

export default App;
