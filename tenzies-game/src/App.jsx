import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  console.log("rerendering")
  const [dice, setDice] = React.useState(getAllNewDice())
  const [isTenzies, setIsTenzies] = React.useState(false)

  React.useEffect(() => {
    console.log("re-rendering......")
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
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ?
          die :
          createDie()
      }))
    } else {
      setIsTenzies(false)
      setDice(getAllNewDice())
    }
  }

  function holdDice(id) {
    console.log("clicked......")
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))

  }

  const diceElements = dice.map(die => <Die value={die.value} isHeld={die.isHeld} holdDice={() => { holdDice(die.id) }} key={die.id} />)


  return (
    <main className="main">
      {isTenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{isTenzies ? "New Game" : "Roll Dice"}</button>
    </main>
  )
}