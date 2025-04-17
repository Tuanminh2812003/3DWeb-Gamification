// src/context/TimeContext.js
import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

const TimeContext = createContext();

export const useTimeContext = () => useContext(TimeContext);

export const TimeProvider = ({ children }) => {
  const [elapsedTime, setElapsedTime] = useState(0); // Thời gian trôi qua
  const [gameStartTime, setGameStartTime] = useState(Date.now()); // Thời gian bắt đầu trò chơi
  const timerRef = useRef(null);

  // Tạo bộ đếm thời gian
  useEffect(() => {
    const incrementTime = () => {
      setElapsedTime(Date.now() - gameStartTime); // Tính toán thời gian đã trôi qua
    };

    // Đặt bộ đếm mỗi giây
    timerRef.current = setInterval(incrementTime, 1000);

    return () => {
      clearInterval(timerRef.current); // Dọn dẹp bộ đếm khi component bị unmount hoặc thay đổi
    };
  }, [gameStartTime]);

  // Cung cấp giá trị và hàm cho các component khác
  return (
    <TimeContext.Provider value={{ elapsedTime, setGameStartTime }}>
      {children}
    </TimeContext.Provider>
  );
};
