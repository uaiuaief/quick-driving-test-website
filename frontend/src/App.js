import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import IndexPage from "./Components/Pages/IndexPage"
import LoginPage from "./Components/Pages/LoginPage"
import NewPasswordPage from './Components/Pages/NewPasswordPage';
import PasswordResetPage from './Components/Pages/PasswordResetPage';
import PasswordResetSuccessPage from './Components/Pages/PasswordResetSuccessPage';
import SignupPage from './Components/Pages/SignupPage';

window.smoothScroll = (element_id) => {
  if (window.location.pathname !== '/') return;
  try {
    if(element_id === ""){
      element_id = "CTA"
    }
    
    document.getElementById(element_id).scrollIntoView({ behavior: 'smooth', block: 'start' })
  } catch (TypeError) {
    console.log(window.location.pathname);
    console.log(element_id);
  }
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/choose-new-password" exact component={NewPasswordPage} />
        <Route path="/password-reset" exact component={PasswordResetPage} />
        <Route path="/password-reset-success" exact component={PasswordResetSuccessPage} />
        <Route path="/signup" exact component={SignupPage} />

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
