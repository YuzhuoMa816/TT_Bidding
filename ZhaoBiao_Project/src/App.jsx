import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [randomExpert, setRandomExpert] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const fetchRandomExpert = () => {
    fetch('http://localhost:8080/')
      .then(res => res.json())
      .then(data => setRandomExpert(data))
      .catch(err => console.log(err));
  };

  const startRandomUpdates = () => {
    setShowTable(true);

    // 每100毫秒获取一个随机专家，共3秒，即100 * 30 = 3000毫秒 = 3秒
    const intervalId = setInterval(() => {
      fetchRandomExpert();
    }, 100);

    // 3秒后停止更新
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000);
  };

  const handleRandomButtonClick = () => {
    // 重置专家信息和状态
    setRandomExpert(null);
    setShowTable(false);

    // 开始更新
    startRandomUpdates();
  };

  useEffect(() => {
    // 页面加载时获取一次数据
    fetchRandomExpert();
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
    <button className="random-button" onClick={handleRandomButtonClick}>随机抽取</button>
    </div>
    </div>
  );
}

export default App;
