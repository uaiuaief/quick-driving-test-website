import { Navbar } from "./Components/Navbar"
import { CTA } from "./Components/CTA"
import { Tutorial } from "./Components/Tutorial"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        <Navbar />
        <CTA />
        <Tutorial />
        <div style={{'height': '600px', 'background-color': '#222'}}></div>
      </body>
    </div>
  );
}

export default App;
