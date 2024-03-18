<<<<<<< Updated upstream
import React, {useEffect, useState} from "react";
=======
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
>>>>>>> Stashed changes
import "./App.css";

const expertList = [
  { expertName: "李洪武", expertPhone: "13066628515", expertMajor: "技术类" },
  { expertName: "付秀敏", expertPhone: "15902402039", expertMajor: "技术类" },
  { expertName: "纪尚廷", expertPhone: "13940089755", expertMajor: "技术类" },
  { expertName: "吴罡", expertPhone: "13104165205", expertMajor: "技术类" },
  { expertName: "陆亮", expertPhone: "13079246888", expertMajor: "技术类" },
];

function App() {
<<<<<<< Updated upstream
    const [randomExpert, setRandomExpert] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [selectedMajor, setSelectedMajor] = useState('');
    const [majorList, setMajorList] = useState([]);
    const [dataFromNewApp, setDataFromNewApp] = useState(null);


    const updateDataFromNewApp = (data) => {
        setDataFromNewApp(data);
    };


    const fetchRandomExpert = (selectedMajor) => {
        const url = `http://localhost:8080/expert/?major=${selectedMajor}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data !== null) {
                    setRandomExpert(data);
                }
            })
            .catch(err => console.log(err));
    };

    const startRandomUpdates = () => {
        setShowTable(true);

        // 每100毫秒获取一个随机专家，共3秒，即100 * 30 = 3000毫秒 = 3秒
        const intervalId = setInterval(() => {
            fetchRandomExpert(selectedMajor);
        }, 100);

        // 3秒后停止更新
        setTimeout(() => {
            clearInterval(intervalId);
            setRandomExpert(prevExpert => prevExpert);

        }, 3000);
    };

    const handleRandomButtonClick = () => {
        // 重置专家信息和状态
        setRandomExpert(null);
        setShowTable(false);

        // 开始更新
        startRandomUpdates();
    };


    const handleMajorChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedMajor(selectedValue);
    };


    useEffect(() => {
        // 获取专业类别列表
        fetch('http://localhost:8080/majors')
            .then(res => res.json())
            .then(data => {
                // 将专业类别列表设置到状态中
                setMajorList(data.majors);
            })
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        // 在showTable为true时定期获取数据
        if (showTable) {
            const intervalId = setInterval(() => {
                fetchRandomExpert();
            }, 100);

            // 3秒后停止更新，并将randomExpert设置为最后一个刷新的专家信息
            setTimeout(() => {
                clearInterval(intervalId);
                setRandomExpert(prevExpert => prevExpert);
            }, 3000);
        }
    }, [showTable]);


    return (
        <div className="whole-container">
            <div className="left-container">
                <h2>抽取结果：</h2>
                {showTable && randomExpert && (
                    <div className="big-screen">
                        <div className="big-number">
                            {randomExpert.expertName}
                        </div>
                        <div className="expert-info">
                            {/* <p>姓名: {randomExpert.expertName}</p> */}
                            <p className="text">电话: {randomExpert.expertPhone}</p>
                            <p className="text">专业: {randomExpert.expertMajor}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="right-container">
                <select value={selectedMajor} onChange={handleMajorChange}>
                    <option value="">随机专业</option>
                    {majorList.map((major, index) => (
                        <option key={index} value={major}>{major}</option>
                    ))}
                </select>

                <button className="random-button" onClick={handleRandomButtonClick}>随机抽取</button>
            </div>
        </div>
    );
=======
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
    <div className="whole-container">
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
              <div className="big-number">抽取中...</div>
            ) : randomExpert ? (
              <>
                <div className="big-number"> {randomExpert.expertName} </div>
                <div className="expert-info">
                  <p className="text">电话: {randomExpert.expertPhone}</p>
                  <p className="text">专业: {randomExpert.expertMajor}</p>
                </div>
              </>
            ) : (
              <div className="big-number">等待抽取</div>
            )}
          </div>
        )}
      </div>
      <div className="right-container">
        <button className="random-button" onClick={handleRandomButtonClick}>
          随机抽取
        </button>
      </div>
    </div>
  );
>>>>>>> Stashed changes
}

export default App;