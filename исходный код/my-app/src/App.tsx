import React from "react";
import "./App.css";
import usePortal from "./usePortal";

function App() {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Проверка портала</h1>
        <button onClick={openPortal}>Открыть портал</button>
        
        {isOpen && (
          <Portal>
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999
              }}
              onClick={closePortal}
            >
              <div 
                style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Портал открыт! 🎉</h2>
                <p>Ого, да это Ваш собственный портал!</p>
                <button onClick={closePortal}>Закрыть портал</button>
              </div>
            </div>
          </Portal>
        )}
      </header>
    </div>
  );
}

export default App;