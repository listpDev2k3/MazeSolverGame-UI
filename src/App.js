import './App.css';
import { useState, useEffect } from 'react';
import men from "./assets/images/men.png";
import girl from "./assets/images/girl.png"

function App() {
  const level = [
    [1, 0, 1, 0],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 1]
  ];

  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [path, setPath] = useState([]);

  const handleCellClick = (x, y) => {
    const isAdjacent = Math.abs(x - currentPosition.x) + Math.abs(y - currentPosition.y) === 1;

    if (isAdjacent) {
      setCurrentPosition({ x, y });
    }
  };

  const menStyle = (currentPosition) => {
    return {
      left: currentPosition.x * 51 + "px",
      top: currentPosition.y * 51 + "px"
    };
  };

  const search = (level, startMen, endMen, type) => {
    const queueOrStack = [startMen];
    const visited = new Set();
    const newVisitedPositions = [...path];
    let dem = 1;
    while (queueOrStack.length > 0) {
      const currentPosMen = type === "DFS" ? queueOrStack.shift() : queueOrStack.pop();
      if (
        currentPosMen.x >= 0 &&
        currentPosMen.x < level[0].length &&
        currentPosMen.y >= 0 &&
        currentPosMen.y < level.length &&
        level[currentPosMen.y][currentPosMen.x] === 1 &&
        !visited.has(currentPosMen.x + "-" + currentPosMen.y)
      ) {
        newVisitedPositions.push(currentPosMen);
        console.log(dem++)
        console.log(currentPosMen ) 
        if (currentPosMen.x === endMen.x && currentPosMen.y === endMen.y) {
          setPath(newVisitedPositions);
          console.log("TÌM THẤY ĐƯỜNG ĐẾN ĐÍCH");
          return true;
        }

        visited.add(currentPosMen.x + "-" + currentPosMen.y);

        const neighbors = [
          { x: currentPosMen.x - 1, y: currentPosMen.y },
          { x: currentPosMen.x + 1, y: currentPosMen.y },
          { x: currentPosMen.x, y: currentPosMen.y - 1 },
          { x: currentPosMen.x, y: currentPosMen.y + 1 }
        ];

        for (const neighbor of neighbors) {
          queueOrStack.push(neighbor);
        }
      }
    }

    console.log("KHÔNG TÌM THẤY ĐƯỜNG ĐẾN ĐÍCH");
    return false;
  };
  // const IDS = (level, start, end, maxDepth) => {
  //   search(level, currentPosition, { x: 3, y: 3 }, "DFS");
  //   for (let depth = 0; depth < maxDepth; depth++) {
  //     if (dfs(start, 0)) {
  //       return true;
  //     }
  //   }
  
  //   return false;
  // };
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < path.length) {
        setCurrentPosition(path[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 500); 
  }, [path]);

  const Menu = () => {
    return (
      <div className="menu">
        <button
          className="breadthSearch"
          type="text"
          onClick={() => { 
            search(level, currentPosition, { x: 3, y: 3 }, "BFS");
          }}
        >
          Tìm Kiếm Theo Chiều Rộng BFS
        </button>
        <button
          className="breadthSearch"
          type="text"
          onClick={() => { 
            search(level, currentPosition, { x: 3, y: 3 }, "DFS");
          }}
        >
          Tìm Kiếm Theo Chiều Sâu DFS
        </button>
        <button
          className="breadthSearch"
          type="text"
          onClick={() => { 
            search(level, currentPosition, { x: 3, y: 3 }, "DFS");
          }}
        >
                Tìm Kiếm Sâu Dần IDS
            </button>
      </div>
    );
  }

  return (
    <>
      <div className="table">
        {level.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              cell === 1 ? (
                <div
                  key={cellIndex}
                  className="cell"
                  onClick={() => handleCellClick(cellIndex, rowIndex)}
                ></div>
              ) : (
                <div key={cellIndex} className="wall"></div>
              )
            ))}
          </div>
        ))}
        <img
          id="men"
          src={men}
          alt="icon"
          width="50px"
          height="50px"
          style={menStyle(currentPosition)}
        />
        <img
          id="girl"
          src={girl}
          alt="icon"
          width="50px"
          height="50px"
        />
      </div>
      <Menu />
    </>
  );
}

export default App;
