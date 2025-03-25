import React, { useState ,useEffect} from "react";

function App() {
  const gridSize = 3;
  const [order, setOrder] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if(count===9){
      setTimeout(handleFinalChange, 500);
    }
  }, [count])
  
  const [cellColors, setCellColors] = useState(
    Array(gridSize).fill().map(() => Array(gridSize).fill("bg-blue-300"))
  );

  const handleFinalChange = () => {
    order.forEach(({ row, col }, index) => {
      setTimeout(() => changeColor(row, col, "bg-orange-500"), index * 300);
    });
  };

  const changeColor = (row, col, color) => {
    setCellColors((prevColors) => {
      const newColors = prevColors.map((r) => [...r]);
      newColors[row][col] = color;
      return newColors;
    });
  };

  const handleClick = (row, col) => {
    if (cellColors[row][col] !== "bg-blue-300") return; 

    changeColor(row, col, "bg-green-500");

    setOrder((prevOrder) => [...prevOrder, { row, col }]);
    setCount(count+1);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-500">
      <div className="bg-amber-200 w-fit rounded-2xl p-1 border-2 border-black">
        {cellColors.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((color, colIndex) => (
              <div
                key={colIndex}
                className={`p-2 border-2 border-black ${color} rounded-xl m-1 w-20 h-20 flex justify-center items-center text-3xl font-bold`}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {rowIndex * gridSize + colIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;