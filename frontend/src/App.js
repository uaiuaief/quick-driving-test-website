import { Navbar } from "./Components/Navbar"
import { CTA } from "./Components/CTA"
import { Tutorial } from "./Components/Tutorial"
import { Pricing } from "./Components/Pricing"
import FAQ from "./Components/FAQ"
import ContactUs from "./Components/ContactUs"
import Footer from "./Components/Footer"

function App() {
  return (
    <>
        <Navbar />
        <CTA />
        <Tutorial />
        <Pricing />
        <FAQ />
        <ContactUs />
        <Footer />

        {/* <div style={{'height': '600px', 'backgroundColor': '#333'}}></div> */}
    </>
  );
}

export default App;
