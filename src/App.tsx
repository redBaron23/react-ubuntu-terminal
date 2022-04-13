import { Suspense, useEffect, useState } from "react";
import "./App.css";
import UbuntuTerminal from "./Components/UbuntuTerminal";
import { Helmet } from 'react-helmet';


function App() {
  const [ip, setIp] = useState<string>("");

  useEffect(() => {
    fetch("https://geolocation-db.com/json/")
      .then((res) => res.json())
      .then((data) => setIp(data.IPv4))
      .catch((e) => setIp("manfred"));
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Ubuntu Terminal</title>
      </Helmet>
      <Suspense fallback="Loading...">
        {ip && <UbuntuTerminal username={ip} />}
      </Suspense>
    </div>
  );
}

export default App;
