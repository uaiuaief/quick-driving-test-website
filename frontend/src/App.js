import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import IndexPage from "./Components/Pages/IndexPage"
import LoginPage from "./Components/Pages/LoginPage"
import NewPasswordPage from './Components/Pages/NewPasswordPage';
import PasswordResetPage from './Components/Pages/PasswordResetPage';
import PasswordResetSuccessPage from './Components/Pages/PasswordResetSuccessPage';
import PasswordResetEmailSentPage from './Components/Pages/PasswordResetEmailSentPage';
import SignupPage from './Components/Pages/SignupPage';
import ProfilePage from './Components/Pages/ProfilePage';
import PageNotFound from './Components/Pages/PageNotFound';
import Stripe from 'stripe';
// import { loadStripe } from "@stripe/stripe-js";


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
        <Route path="/password-reset-email-sent" exact component={PasswordResetEmailSentPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/account" exact component={ProfilePage} />
        <Route path="/" component={PageNotFound} />


      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
