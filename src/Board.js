import React, { useState, useEffect } from 'react'
import Square from './Square';
import NumberOfPossibleBricks from './NumberOfPossibleBricks';



const Board = () => {
  let count = 0
  let play;
  let id = 0;
  const [list, setList] = useState([])
  const [isNext, setisNext] = useState(true)
  const [status, setStatus] = useState("Next plays: X")
  const [number, setNumber] = useState(3)
  const [isWinner, setIsWinner] = useState(true)
  const [onClickCount, setOnClickCount] = useState(0)
  const [numberOfPossibleBricks, setNumberOfPossibleBricks] = useState([])

  useEffect(() => {
    setList([])
    document.getElementsByClassName('board')[0].style.width = 52 * number + "px"
    document.getElementsByClassName('board')[0].style.width = 52 * number + "px"
    for (let i = 0; i < number; i++) {
      setList(item => [...item, Array(number).fill(null)]);
    }
  })

  const handleClick = (i, index) => {
    if (list[i][index] === null && isWinner) {
      play = isNext ? "X" : "O"
      const renderIsX = list
      renderIsX[i][index] = play
      setList(renderIsX)
      setStatus(`Next piays: ${isNext ? "O" : "X"}`)
      setisNext(!isNext)
      setOnClickCount(onClickCount => onClickCount += 1)
      if (onClickCount >= 4) {
        checkWinnerVersion(play)
      }
    }
  }


  const checksTheWinningCase = element => {
    if (element === play) {
      count++
      if (count === number) {
        setIsWinner(false)
        setOnClickCount(0)
        setStatus("Winner:" + play)
      }
    }
  }

  const checkWinnerVersion = () => {
    for (let i = 0; i < number; i++) {
      for (let j = 0; j < list[i].length; j++) {
        checksTheWinningCase(list[i][j])
      }
      count = 0
      for (let j = 0; j < list[i].length; j++) {
        checksTheWinningCase(list[j][i])
      }
      count = 0
      for (let k = 0; k < number; k++) {
        checksTheWinningCase(list[k][k])
      }
      count = 0
      for (let i = number - 1, j = 0; i >= 0; i--, j++) {
        checksTheWinningCase(list[j][i])
      }
      count = 0
    }
    if (isWinner) {
      if (onClickCount === number * number) {
        setStatus("Draw")
        setOnClickCount(0)
        setIsWinner(false)
      }
    }
  }



  return <div>
    {numberOfPossibleBricks.map(el => <NumberOfPossibleBricks key={id} value={el}/>)}
    <h3>{status}</h3>
    {list.map((el, i) => el.map((element, index) => <Square key={id++} value={element} handleClick={() => { handleClick(i, index) }} />))}
  </div>

}

export default Board