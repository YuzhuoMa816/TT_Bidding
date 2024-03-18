// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [randomExpert, setRandomExpert] = useState(null);
//   const [showTable, setShowTable] = useState(false);
//   const [filterType, setFilterType] = useState("");
//   const [experts, setExperts] = useState([]); 

//   const fetchExperts = () => {
//     fetch("http://localhost:8080/expert")
//       .then(res => res.json())
//       .then(data => setExperts(data))
//       .catch(err => console.log(err));
//   };

//   const fetchRandomExpert = () => {
//     const filteredExperts = filterType
//       ? experts.filter(expert => expert.expertMajor.includes(filterType))
//       : experts;
//     const randomIndex = Math.floor(Math.random() * filteredExperts.length);
//     setRandomExpert(filteredExperts[randomIndex]);
//   };

//   const startRandomUpdates = () => {
//     setShowTable(true);
//     const intervalId = setInterval(() => {
//       fetchRandomExpert();
//     }, 100);
//     setTimeout(() => {
//       clearInterval(intervalId);
//     }, 1000);
//   };

//   const handleRandomButtonClick = () => {
//     setRandomExpert(null);
//     setShowTable(false);
//     startRandomUpdates();
//   };

//   useEffect(() => {
//     fetchExperts();
//   }, []); 

//   useEffect(() => {
//     if (showTable) {
//       const intervalId = setInterval(() => {
//         fetchRandomExpert();
//       }, 100);
//       setTimeout(() => {
//         clearInterval(intervalId);
//         setRandomExpert(prevExpert => prevExpert);
//       }, 3000);
//     }
//   }, [showTable, filterType, experts]); 

//   const handleFilterChange = e => {
//     setFilterType(e.target.value);
//   };

//   return (
//     <div className="whole-container">
//       <div className="filter-container">
//         <label htmlFor="filter">筛选类型:</label>
//         <select id="filter" value={filterType} onChange={handleFilterChange}>
//           <option value="">全部</option>
//           <option value="经济类">经济类</option>
//           <option value="技术类">技术类</option>
//         </select>
//       </div>
//       <div className="left-container">
//         {showTable && randomExpert && (
//           <div className="big-screen">
//             <div className="big-number"> {randomExpert.expertName} </div>
//             <div className="expert-info">
//               <p className="text">电话: {randomExpert.expertPhone}</p>
//               <p className="text">专业: {randomExpert.expertMajor}</p>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="right-container">
//         <button className="random-button" onClick={handleRandomButtonClick}>
//           随机抽取
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import "./App.css";

const expertList = [
  { expertName: "李洪武", expertPhone: "13066628515", expertMajor: "技术类" },
  { expertName: "付秀敏", expertPhone: "15902402039", expertMajor: "技术类" },
  { expertName: "纪尚廷", expertPhone: "13940089755", expertMajor: "技术类" },
  { expertName: "吴罡", expertPhone: "13104165205", expertMajor: "技术类" },
  { expertName: "陆亮", expertPhone: "13079246888", expertMajor: "技术类" },
];

function App() {
  const [randomExpert, setRandomExpert] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterType, setFilterType] = useState("");
  const [isDrawing, setIsDrawing] = useState(false); 

  const fetchRandomExpert = () => {
    if (currentIndex < expertList.length) {
      setRandomExpert(expertList[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    } else {
      setRandomExpert(null);
      setCurrentIndex(0);
    }
  };

  const startRandomUpdates = () => {
    setShowTable(true);
    setIsDrawing(true); 
    setTimeout(() => {
      fetchRandomExpert();
      setIsDrawing(false); 
    }, 3000);
  };

  const handleRandomButtonClick = () => {
    setRandomExpert(null);
    setShowTable(false);
    startRandomUpdates();
  };

  useEffect(() => {
    if (showTable) {
      const intervalId = setInterval(() => {
        fetchRandomExpert();
      }, 100);
      setTimeout(() => {
        clearInterval(intervalId);
      }, 1000);
    }
  }, [showTable]);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">辽宁弘利项目管理有限公司专家抽取</h1>
        <div className="filter-container">
          <label htmlFor="filter">筛选类型:</label>
          <select id="filter" value={filterType} onChange={handleFilterChange}>
            <option value="">全部</option>
            <option value="经济类">经济类</option>
            <option value="技术类">技术类</option>
          </select>
        </div>
        <div className="left-container">
          {showTable && (
            <div className="big-screen">
              {isDrawing ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <div className="big-number">抽取中...</div>
                </div>
              ) : randomExpert ? (
                <React.Fragment>
                  <div className="big-number animate__animated animate__zoomIn">
                    {randomExpert.expertName}
                  </div>
                  <div className="expert-info animate__animated animate__fadeIn">
                    <p className="text">电话: {randomExpert.expertPhone}</p>
                    <p className="text">专业: {randomExpert.expertMajor}</p>
                  </div>
                </React.Fragment>
              ) : (
                <div className="big-number">等待抽取</div>
              )}
            </div>
          )}
        </div>
        <div className="right-container">
          <button
            className="random-button animate__animated animate__pulse animate__infinite"
            onClick={handleRandomButtonClick}
          >
            随机抽取
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;