import React, { useState } from 'react';

const BANANA_URL = 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768';
const CHICKEN_URL = 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg';

const IMAGES = {
  BANANA: BANANA_URL,
  CHICKEN: CHICKEN_URL,
};

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function CBGamePage() {
  const types = shuffle([
    ...Array(18).fill('BANANA'),
    ...Array(18).fill('CHICKEN'),
  ]);

  const [board] = useState(types.map((type) => ({
    type,
    url: IMAGES[type],
  })));

  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [selectedType, setSelectedType] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleReveal = (index) => {
    if (gameOver || revealed[index] || selectedType === null) return;

    const tileType = board[index].type;

    if (tileType !== selectedType) {
      alert('GAME OVER');
      setGameOver(true);
      return;
    }

    // Reveal tile
    setRevealed((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const styles = {
    container: {
      maxWidth: '650px',
      margin: '0 auto',
      textAlign: 'center',
      padding: '20px',
      position: 'relative',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gridGap: '5px',
      marginTop: '20px',
    },
    square: {
      width: '100%',
      aspectRatio: '1 / 1',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid #ccc',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
      cursor: 'pointer',
      userSelect: 'none',
    },
    cover: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      transition: 'opacity 0.3s',
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    label: {
      position: 'absolute',
      bottom: '4px',
      left: '4px',
      backgroundColor: 'rgba(255,255,255,0.7)',
      padding: '2px 6px',
      fontSize: '12px',
      fontWeight: '600',
      borderRadius: '3px',
      pointerEvents: 'none',
      color: '#000',
      userSelect: 'none',
    },
    buttonContainer: {
      position: 'relative',
      marginTop: '10px',
      height: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    button: {
      width: '100px',
      height: '40px',
      fontSize: '18px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      color: '#fff',
      userSelect: 'none',
    },
    bananaBtn: {
      backgroundColor: '#FFD800', // bright yellow
      color: '#000',
      opacity: 1,
      transition: 'opacity 0.3s',
    },
    chickenBtn: {
      backgroundColor: '#E63946', // red
      opacity: 1,
      transition: 'opacity 0.3s',
    },
    disabledBtn: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Chicken Banana Game!</h1>

      <div style={styles.buttonContainer}>
        <button
          style={{
            ...styles.button,
            ...styles.bananaBtn,
            ...(selectedType && selectedType !== 'BANANA' ? styles.disabledBtn : {}),
          }}
          onClick={() => !selectedType && setSelectedType('BANANA')}
          disabled={!!selectedType && selectedType !== 'BANANA'}
        >
          BANANA
        </button>

        <button
          style={{
            ...styles.button,
            ...styles.chickenBtn,
            ...(selectedType && selectedType !== 'CHICKEN' ? styles.disabledBtn : {}),
          }}
          onClick={() => !selectedType && setSelectedType('CHICKEN')}
          disabled={!!selectedType && selectedType !== 'CHICKEN'}
        >
          CHICKEN
        </button>
      </div>

      <div style={styles.grid}>
        {board.map(({ url, type }, index) => (
          <div
            key={index}
            style={{
              ...styles.square,
              cursor: gameOver ? 'default' : 'pointer',
            }}
            onClick={() => handleReveal(index)}
          >
            <img src={url} alt={type} style={styles.img} />
            {!revealed[index] && (
              <div style={styles.cover}>{index + 1}</div>
            )}
            {revealed[index] && (
              <div style={styles.label}>{type}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
