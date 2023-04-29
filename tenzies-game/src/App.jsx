import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"

export default function App() {
  const [dice, setDice] = React.useState(getAllNewDice())

  function getAllNewDice(){
    const newDice = []
    for (let i=0; i<10; i++){
      newDice.push(createDie())

    }
    return newDice
  }

  function createDie(){
    return {value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()}
  }

  function rollDice(){
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ?
              die:
              createDie() 
    }))
  }

  function holdDice(id){
    console.log("clicked......")
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld}:
      die
    }))

  }

  const diceElements = dice.map(die => <Die value={die.value} isHeld={die.isHeld} holdDice={() => {holdDice(die.id)}} key={die.id}/>)


  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll Dice</button>
    </main>
  )
}