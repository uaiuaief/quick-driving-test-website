import { Navbar } from "./Components/Navbar"
import { CTA } from "./Components/CTA"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        <Navbar />
        <CTA />
        <div style={{'height': '600px', 'background-color': '#1f2a3f'}}></div>
      </body>
    </div>
  );
}

export default App;
