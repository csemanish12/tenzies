import React from "react"
import Die from "./Die"

export default function App() {
  const [dice, setDice] = React.useState(getAllNewDice())

  function getAllNewDice(){
    const newDice = []
    for (let i=0; i<10; i++){
      newDice.push(Math.ceil(Math.random() * 6))

    }
    return newDice
  }

  const diceElements = dice.map(die => <Die value={die}/>)

  return (
    <main className="main">
      <div className="dice">
        {diceElements}
      </div>
    </main>
  )
}