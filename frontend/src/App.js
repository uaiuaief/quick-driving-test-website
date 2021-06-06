import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import IndexPage from "./Components/Pages/IndexPage"
import LoginPage from "./Components/Pages/LoginPage"
import PasswordResetPage from './Components/Pages/PasswordResetPage';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/password-reset" exact component={PasswordResetPage} />

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
