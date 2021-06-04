import { Navbar } from "./Components/Navbar"
import { CTA } from "./Components/CTA"
import { Tutorial } from "./Components/Tutorial"
import { Pricing } from "./Components/Pricing"

function App() {
  return (
    <>
        <Navbar />
        <CTA />
        <Tutorial />
        <Pricing />
        <div style={{'height': '600px', 'background-color': '#222'}}></div>
    </>
  );
}

export default App;
