import { Navbar } from "./Components/Navbar"
import { CTA } from "./Components/CTA"
import { Tutorial } from "./Components/Tutorial"
import { Pricing } from "./Components/Pricing"
import FAQ from "./Components/FAQ"

function App() {
  return (
    <>
        <Navbar />
        <CTA />
        <Tutorial />
        <Pricing />
        <FAQ />

        <div style={{'height': '600px', 'backgroundColor': '#fff'}}></div>
    </>
  );
}

export default App;
