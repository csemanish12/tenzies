import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  console.log("rerendering")
  const [dice, setDice] = React.useState(getAllNewDice())
  const [isTenzies, setIsTenzies] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  const [highScore, setHighScore] = React.useState(localStorage.getItem("high-score"))

  React.useEffect(() => {
    const dieValue = dice[0].value
    let isWon = true
    for (let i = 0; i < dice.length; i++) {
      const die = dice[i]

      if (die.value !== dieValue || !die.isHeld) {
        isWon = false
        break
      }
    }

    if (isWon) {
      console.log("you have won")
      setIsTenzies(true)
      setHighScore(prevHighScore => {
        if (prevHighScore === null || counter < prevHighScore){
          localStorage.setItem("high-score", counter)
          return counter
        }
        else {
          
          return prevHighScore
        } 
      })
    }

  }, [dice])

  function getAllNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(createDie())

    }
    return newDice
  }

  function createDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() }
  }

  function rollDice() {
    if (!isTenzies) {
      setCounter(prevCounter => prevCounter + 1)
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ?
          die :
          createDie()
      }))
    } else {
      setIsTenzies(false)
      setDice(getAllNewDice())
      setCounter(0)
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))

  }

  const diceElements = dice.map(die => <Die value={die.value} isHeld={die.isHeld} holdDice={() => { holdDice(die.id) }} key={die.id} />)


  return (
    <div>
      <div className="metrics">
        <h2 className="current-count">Dice Rolled: {counter} times</h2>
        <h2 className="highscore">High Score: {highScore ? highScore: 0} times</h2>
      </div>
      <main className="main">
        {isTenzies && <Confetti />}

        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice">
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>{isTenzies ? "New Game" : "Roll Dice"}</button>
      </main>
    </div>
  )
}