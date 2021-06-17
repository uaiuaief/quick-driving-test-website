import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import IndexPage from "./Components/Pages/IndexPage"
import LoginPage from "./Components/Pages/LoginPage"
import NewPasswordPage from './Components/Pages/NewPasswordPage';
import PasswordResetPage from './Components/Pages/PasswordResetPage';
import PasswordResetSuccessPage from './Components/Pages/PasswordResetSuccessPage';
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
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/account" exact component={ProfilePage} />

        <Route path="/checkout" exact render={() => {
          return (
            <>
              <br/>
              <br/>
              <br/>
              <br/>
              <button
                onClick={async (e) => {
                  const ENDPOINT = "/api/create-checkout-session/"

                    let res = await fetch(ENDPOINT, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': window.getCookie('csrftoken')
                        }
                    })

                    let session = await res.json();
                    
                    const stripe = await window.stripePromise
                    
                    const result = await stripe.redirectToCheckout({
                      sessionId: session.id
                    })

                    if (result.error){
                      alert('error')
                    }
                }}
              >checkout</button>
            </>
          )
        }} />
        <Route path="/" component={PageNotFound} />


      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
