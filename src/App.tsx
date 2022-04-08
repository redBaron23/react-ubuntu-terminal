import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import UbuntuTerminal from "./Components/UbuntuTerminal";

function App() {
  const [ip, setIp] = useState<string>("");

  useEffect(() => {
    fetch("https://geolocation-db.com/json/")
      .then((res) => res.json())
      .then((data) => setIp(data.IPv4));
  }, []);
  
  return (
    <div className="App">
      <UbuntuTerminal username={ip} />
    </div>
  );
}

export default App;
