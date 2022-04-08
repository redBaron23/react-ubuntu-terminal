import { Suspense, useEffect, useState } from "react";
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
      <Suspense fallback="Loading...">
        {
          ip && <UbuntuTerminal username={ip} />
        }
      </Suspense>
    </div>
  );
}

export default App;
