import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
function App() {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState();

  //check winner
  const checkWinner = (squares) => {
    let combos = {
       across:  [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],

      down: [
        [0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
				[2, 4, 6],
      ]
    };

    for(let combo in combos){
      combos[combo].forEach((pattern) => {
        if(
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === '' 

        ){
         //do nothing
        } else if (
          squares[pattern[0]] ===   squares[pattern[1]] &&
          squares[pattern[1]] ===   squares[pattern[2]]
        ){
          setWinner( squares[pattern[0]])
        }
      });
    }
  };

  const handleClick = (num) => {
    let squares = [...cells];
    if (cells[num] !== "") {
      alert("already clicked");
      return;
    }

    if (turn === "x") {
      squares[num] = "x";
      setTurn("o");
    } else if (turn === "o") {
      squares[num] = "o";
      setTurn("x");
    }

    console.log(squares);
    setCells(squares);
    checkWinner(squares)
    // console.log(squares)
  };

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

 

  const reset = () => {
    setCells(Array(9).fill(''));
    setWinner();
  }
  return (
    <div className="container">
    {  winner &&  `${winner} wins`}
      <table>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      <button 
      onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
