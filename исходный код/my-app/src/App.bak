import logo from "./logo.svg";
import "./App.css";

import usePortal from "./usePortal";

function App() {
  const { openPortal, closePortal, isOpen, Portal } = usePortal({
    closeOnOutsideClick: true,
    closeOnEsc: true,
    isOpen: true,
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={openPortal}>Открыть портал</button>
      {isOpen && (
        <Portal>
          <p>
            Это портал с собственным состоянием.
            <button onClick={closePortal}>Закрой меня!</button>
          </p>
        </Portal>
      )}
    </div>
  );
}

export default App;
