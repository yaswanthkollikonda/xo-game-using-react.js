import React, { useRef, useState } from 'react';
import './XoGame.css';
import circle from './Assets/circle.png';
import cross from './Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const Xogame = () => {
    let [count, setcount] = useState(0);
    let [lock, setlock] = useState(false);
    let [currentPlayer, setCurrentPlayer] = useState('X');
    let titleRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    const toggle = (e, num) => {
        if (lock) {
            return 0;
        }
        if (data[num] === "") {
            if (count % 2 === 0) {
                e.target.innerHTML = `<img src='${cross}'>`;
                data[num] = 'x';
                setCurrentPlayer('O');
            } else {
                e.target.innerHTML = `<img src='${circle}'>`;
                data[num] = 'o';
                setCurrentPlayer('X');
            }
            setcount(count + 1);
            checkWin();
        }
    };

    const checkWin = () => {
        if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            won(data[2]);
        } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
            won(data[5]);
        } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
            won(data[8]);
        } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
            won(data[6]);
        } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
            won(data[7]);
        } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
            won(data[8]);
        } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
            won(data[8]);
        } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
            won(data[6]);
        }
    };

    const won = (winner) => {
        setlock(true);
        const image = winner === "x" ? cross : circle;
        titleRef.current.innerHTML = `Congrats <img src="${image}"> Wins`;
    };

    const reset = () => {
        setlock(false);
        data = ["", "", "", "", "", "", "", "", ""];
        setcount(0);
        setCurrentPlayer('X');
        titleRef.current.innerHTML = "XO Game In<span>React</span>";
        box_array.map((e) => {
            return e.current.innerHTML = "";
        });
    };

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>XO Game In<span>React</span></h1>
            <h2 className={`current-player ${currentPlayer === 'X' ? 'current-player-x' : 'current-player-o'}`}>
                Current Player: {currentPlayer}
            </h2>
            <div className="board">
                <div className='row1'>
                    <div className="boxes" ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
                    <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
                    <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
                </div>
                <div className='row2'>
                    <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
                    <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
                    <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
                </div>
                <div className='row3'>
                    <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
                    <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
                    <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
                </div>
            </div>
            <button className='reset' onClick={() => { reset() }}>Reset</button>
        </div>
    );
};

export default Xogame;
