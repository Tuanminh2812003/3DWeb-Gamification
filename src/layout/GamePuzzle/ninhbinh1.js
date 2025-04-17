import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isTouchDevice } from '../../utils/isTouchDevice';

const piecesDataDesktop = [
  { id: 1, image: '/Farm/Game/NINH%20BINH/Anh1/1.png', x: -300, y: 0, correctPosition: { x: 0, y: 0 } },
  { id: 2, image: '/Farm/Game/NINH%20BINH/Anh1/2.png', x: -400, y: 0, correctPosition: { x: 100, y: 0 } },
  { id: 3, image: '/Farm/Game/NINH%20BINH/Anh1/3.png', x: -300, y: 100, correctPosition: { x: 200, y: 0 } },
  { id: 4, image: '/Farm/Game/NINH%20BINH/Anh1/4.png', x: -400, y: 100, correctPosition: { x: 0, y: 100 } },
  { id: 5, image: '/Farm/Game/NINH%20BINH/Anh1/5.png', x: -300, y: 200, correctPosition: { x: 100, y: 100 } },
  { id: 6, image: '/Farm/Game/NINH%20BINH/Anh1/6.png', x: -400, y: 200, correctPosition: { x: 200, y: 100 } },
  { id: 7, image: '/Farm/Game/NINH%20BINH/Anh1/7.png', x: -300, y: 300, correctPosition: { x: 0, y: 200 } },
  { id: 8, image: '/Farm/Game/NINH%20BINH/Anh1/8.png', x: -400, y: 300, correctPosition: { x: 100, y: 200 } },
  { id: 9, image: '/Farm/Game/NINH%20BINH/Anh1/9.png', x: -300, y: 400, correctPosition: { x: 200, y: 200 } },
];
const piecesDataTablet = [
  { id: 1, image: '/Farm/Game/NINH%20BINH/Anh1/1.png', x: -110, y: 0, correctPosition: { x: 0, y: 0 } },
  { id: 2, image: '/Farm/Game/NINH%20BINH/Anh1/2.png', x: -190, y: 0, correctPosition: { x: 80, y: 0 } },
  { id: 3, image: '/Farm/Game/NINH%20BINH/Anh1/3.png', x: -110, y: 80, correctPosition: { x: 160, y: 0 } },
  { id: 4, image: '/Farm/Game/NINH%20BINH/Anh1/4.png', x: -190, y: 80, correctPosition: { x: 0, y: 80 } },
  { id: 5, image: '/Farm/Game/NINH%20BINH/Anh1/5.png', x: -110, y: 160, correctPosition: { x: 80, y: 80 } },
  { id: 6, image: '/Farm/Game/NINH%20BINH/Anh1/6.png', x: -190, y: 160, correctPosition: { x: 160, y: 80 } },
  { id: 7, image: '/Farm/Game/NINH%20BINH/Anh1/7.png', x: -110, y: 240, correctPosition: { x: 0, y: 160 } },
  { id: 8, image: '/Farm/Game/NINH%20BINH/Anh1/8.png', x: -190, y: 240, correctPosition: { x: 80, y: 160 } },
  { id: 9, image: '/Farm/Game/NINH%20BINH/Anh1/9.png', x: -110, y: 320, correctPosition: { x: 160, y: 160} },
];
const piecesDataMobile = [
  { id: 1, image: '/Farm/Game/NINH%20BINH/Anh1/1.png', x: -80, y: 0, correctPosition: { x: 0, y: 0 } },
  { id: 2, image: '/Farm/Game/NINH%20BINH/Anh1/2.png', x: -80, y: 50, correctPosition: { x: 50, y: 0 } },
  { id: 3, image: '/Farm/Game/NINH%20BINH/Anh1/3.png', x: -80, y: 100, correctPosition: { x: 100, y: 0 } },
  { id: 4, image: '/Farm/Game/NINH%20BINH/Anh1/4.png', x: -80, y: 150, correctPosition: { x: 0, y: 50 } },
  { id: 5, image: '/Farm/Game/NINH%20BINH/Anh1/5.png', x: 180, y: 0, correctPosition: { x: 50, y: 50 } },
  { id: 6, image: '/Farm/Game/NINH%20BINH/Anh1/6.png', x: 180, y: 50, correctPosition: { x: 100, y: 50 } },
  { id: 7, image: '/Farm/Game/NINH%20BINH/Anh1/7.png', x: 180, y: 100, correctPosition: { x: 0, y: 100 } },
  { id: 8, image: '/Farm/Game/NINH%20BINH/Anh1/8.png', x: 180, y: 150, correctPosition: { x: 50, y: 100 } },
  { id: 9, image: '/Farm/Game/NINH%20BINH/Anh1/9.png', x: 50, y: 150, correctPosition: { x: 100, y: 100 } },
];

const PuzzlePiece = ({ id, image, x, y }) => {

  const[size, setsize]= useState(100);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PIECE',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    const updateDevice = () => {
      if (window.innerWidth < 920) {
        setsize(50);
      } else if (window.innerWidth < 1200) {
        setsize(80);
      } else {
        setsize(100);
      }
    };

    updateDevice(); // Chạy ngay khi component mount
    window.addEventListener('resize', updateDevice);

    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  return (
    <div
      ref={drag}
      className={`puzzle-piece piece-${id}`} // 🔥 Thêm class dựa vào id
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        position: 'absolute',
        top: y,
        left: x,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        touchAction: 'none', // 👈 Thêm dòng này
      }}
    />
  );
};

const PuzzleBoard = ({ pieces, setPieces, setIsComplete }) => {

  const[size, setsize]= useState(80);
  useEffect(() => {
    const updateDevice = () => {
      if (window.innerWidth < 920) {
        setsize(50);
      } else if (window.innerWidth < 1200) {
        setsize(80);
      } else {
        setsize(100);
      }
    };

    updateDevice(); // Chạy ngay khi component mount
    window.addEventListener('resize', updateDevice);

    return () => window.removeEventListener('resize', updateDevice);
  }, []);
  
  const dropHandler = useCallback((item, monitor) => {
    const clientOffset = monitor.getClientOffset();

      if (clientOffset) {
        const boardRect = document.getElementById('puzzle-board').getBoundingClientRect();
        const cellSize = size;
        const offsetX = clientOffset.x - boardRect.left;
        const offsetY = clientOffset.y - boardRect.top;

        const col = Math.floor(offsetX / cellSize) * cellSize;
        const row = Math.floor(offsetY / cellSize) * cellSize;

        setPieces((prevPieces) => {
          return prevPieces.map((piece) => {
            if (piece.id === item.id) {
              if (col === piece.correctPosition.x && row === piece.correctPosition.y) {
                return { ...piece, x: col, y: row, isCorrect: true };
              } else {
                return { ...piece, isCorrect: false };
              }
            }
            return piece;
          });
        });
      }
  }, [size, setPieces]
  );

  // 🔥 useDrop được gọi với `dropHandler` từ `useCallback`
  const [, drop] = useDrop({
    accept: 'PIECE',
    drop: dropHandler,
  });

  useEffect(() => {
    const allCorrect = pieces.every((piece) => piece.isCorrect);
    setIsComplete(allCorrect);
  }, [pieces, setIsComplete]);

  const renderGrid = () => {
    const rows = 3;
    const cols = 3;
    const grid = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid.push(
          <div
            key={`${row}-${col}`}
            style={{
              width: size,
              height: size,
              border: '1px solid #ccc',
              position: 'absolute',
              top: row * size,
              left: col * size,
              boxSizing: 'border-box',
            }}
          />
        );
      }
    }
    return grid;
  };

  return (
    <div
      id="puzzle-board"
      ref={drop}
      style={{
        width: size*3,
        height: size*3,
        position: 'relative',
        backgroundColor: '#f5f5f5',
        margin: 'auto',
      }}
    >
      {renderGrid()}
      {pieces.map((piece) => (
        <PuzzlePiece
          key={piece.id}
          id={piece.id}
          image={piece.image}
          x={piece.x}
          y={piece.y}
        />
      ))}
    </div>
  );
};

const PuzzleGame = ({ onComplete }) => {

  const [pieces, setPieces] = useState(
    piecesDataDesktop.map((piece) => ({ ...piece, isCorrect: false }))
  );

  useEffect(() => {
    const updateDevice = () => {
      if (window.innerWidth < 920) {
        setPieces(piecesDataMobile.map((piece) => ({ ...piece, isCorrect: false })));
      } else if (window.innerWidth < 1200) {
        setPieces(piecesDataTablet.map((piece) => ({ ...piece, isCorrect: false })));
      } else {
        setPieces(piecesDataDesktop.map((piece) => ({ ...piece, isCorrect: false })));
      }
    };

    updateDevice(); // Chạy ngay khi component mount
    window.addEventListener('resize', updateDevice);

    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  // const [pieces, setPieces] = useState(
  //   piecesData.map((piece) => ({ ...piece, isCorrect: false }))
  // );

  const [isComplete, setIsComplete] = useState(false);
  const [countdown, setCountdown] = useState(1); // Đếm ngược từ 6 giây

  useEffect(() => {
    if (isComplete) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        onComplete(); // Gọi callback để tắt pop-up sau 6 giây
      }, 100);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isComplete, onComplete]);

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <div style={{ textAlign: 'center', marginTop: '20px', width: '80vw', height: '80vh' }}>
        <h2>Trò chơi ghép hình</h2>
        <div>Kéo các mảnh ghép để tạo hình hoàn chỉnh</div>
        <PuzzleBoard pieces={pieces} setPieces={setPieces} setIsComplete={setIsComplete} />
        {isComplete && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              zIndex: 1000,
            }}
          >
            <h2>Ghép hình thành công</h2>
            <div>Màn hình sẽ quay lại không gian trong vòng {countdown} giây.</div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default PuzzleGame;
