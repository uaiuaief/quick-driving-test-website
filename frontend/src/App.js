import { Navbar } from "./Components/Navbar"
import { CTA } from "./Components/CTA"
import { Tutorial } from "./Components/Tutorial"
import { Pricing } from "./Components/Pricing"
import FAQ from "./Components/FAQ"
import ContactUs from "./Components/ContactUs"
import Footer from "./Components/Footer"
import LoginPage from "./Components/LoginPage"


function App() {
  return (
    // <>
    //   <Navbar />
    //   <CTA />
    //   <Tutorial />
    //   <Pricing />
    //   <FAQ />
    //   <ContactUs />
    //   <Footer />

    //   {/* <div style={{'height': '600px', 'backgroundColor': '#333'}}></div> */}
    // </>
    <>
      <Navbar />
      {/* <div style={{'height': '600px', 'backgroundColor': '#fff'}}></div> */}
      <LoginPage/>
      <Footer />

    </>
  );
}

export default App;
