import React, { useEffect, useRef } from 'react';

export default function Homepage() {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.style.padding = '30px 60px';
      buttonRef.current.style.fontSize = '30px';
    }

    if (containerRef.current) {
      containerRef.current.style.height = '100vh';
    }
  }, []);

  const startGame = async () => {
    alert(`✅ Game Start! Make sure your partner is ready.`);
    await new Promise((res) => setTimeout(res, 1000));
    window.location.href = '/CBGame';
  };

  return (
    <div ref={containerRef}>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <button ref={buttonRef} onClick={startGame}>
        Play Game!
      </button>
    </div>
  );
}
