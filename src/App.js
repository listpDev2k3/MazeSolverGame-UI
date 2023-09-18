import './App.css';
import { useState, useEffect } from 'react';
import men from "./assets/images/men.png";
import girl from "./assets/images/girl.png"
import Menu from "./Menu.js"
function App() {
  const level1 = [
    [1, 0, 1, 0],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 1],
  ]
  const level2 = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1]
  ];


  const [level, setLevel] = useState(level1)
  const [currentGirl, setCurrentGirl] = useState({ x: 3, y: 3 })
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [isSearching, setIsSearching] = useState(false);
  const [getPath, setGetPath] = useState(new Set());

  const getLevel = (value) => {
    value = parseInt(value);//đưa value về kiểu số. 
    if (value === 2) {
      setLevel(level2)
      setCurrentGirl({ x: 4, y: 5 })
    } else {
      setLevel(level1)
      setCurrentGirl({ x: 3, y: 3 })
    }
  }

  const handleCellClick = (x, y) => {
    // Kiểm tra xem mỗi bước đi là 1 ô hay không.
    const isAdjacent = Math.abs(x - currentPosition.x) + Math.abs(y - currentPosition.y) === 1;

    if (isAdjacent) {
      setCurrentPosition({ x, y });
    }
    currentGirl === currentPosition ? setIsSearching(true) : setIsSearching(false)
  };//chưa sử lý useFffect

  const menStyle = (currentPosition) => {
    return {
      left: currentPosition.x * 51 + "px",
      top: currentPosition.y * 51 + "px"
    };
  };
  // Hàm kiẻm tra có phải tường hay không
  const isWall = (x, y) => {
    return level[y][x] === 0;
  };

  // Hàm kiểm tra xem một ô có phải là đích hay không
  const isGoal = (x, y) => {
    return x === currentGirl.x && y === currentGirl.y;
  };

  // Hàm lấy tọa độ, kiểm tra của các ô lân cận
  const getNeighbors = (x, y, visited) => {
    const neighbors = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 }
    ];
    return neighbors.filter(neighbor => {
      return (
        neighbor.x >= 0 &&
        neighbor.x < level[0].length &&
        neighbor.y >= 0 &&
        neighbor.y < level.length &&
        !isWall(neighbor.x, neighbor.y) &&
        !visited.has(neighbor.x + "-" + neighbor.y)
      );
    });
  };

  const search = (type) => {
    const queueOrStack = [currentPosition];//Khởi tạo giá trị ban đầu 
    const visited = new Set();

    while (queueOrStack.length > 0) {
      const currentPosMen = type === "DFS" ? queueOrStack.shift() : queueOrStack.pop();
      getPath.add(currentPosMen)//Lưu lại đường đi
      if (isGoal(currentPosMen.x, currentPosMen.y)) {
        console.log(getPath)
        return true;
      }

      visited.add(currentPosMen.x + "-" + currentPosMen.y);
      
      const neighbors = getNeighbors(currentPosMen.x, currentPosMen.y, visited)
      for (const neighbor of neighbors) {
        queueOrStack.push(neighbor);
      };
    }
    return false;
  };

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      const pathArray = [...getPath];
      if (index < pathArray.length) {
        setCurrentPosition(pathArray[index]);
        index++;
      } else {
        clearInterval(timer);
        setGetPath(new Set()); // Đặt lại đối tượng Set sau khi đã sử dụng
      }
    }, 500);
  }, [getPath]);
  const Result = () => {
    return (
      <div>
        {isSearching ? <p>Tìm kiếm hoàn thành!</p> : <p>Đang tìm!</p>}
      </div>
    )
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
          style={menStyle(currentGirl)}
        />
      </div>
      <Menu
        onSearch={search}
        setCurrentPosition={setCurrentPosition}
        getLevel={getLevel}
      />
    </>
  );
}

export default App;
