import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { loadStripe } from "@stripe/stripe-js";


window.isEmpty = (obj) => {
  if (obj === null) return true;

  return (Object.entries(obj).length === 0)
}

window.smoothScroll = (element_id) => {
  if (window.location.pathname !== '/') return;
  try {
    if (element_id === "") {
      element_id = "CTA"
    }

    document.getElementById(element_id).scrollIntoView({ behavior: 'smooth', block: 'start' })
  } catch (TypeError) {
    console.log(window.location.pathname);
    console.log(element_id);
  }
}

window.getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie != '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

window.getUser = async () => {
  let res = await fetch("/api/get-user/", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = await res.json();
  
  return data.user;
}

window.fetchUserProfile = async () => {
  let res = await fetch("/api/user-profile/", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  if (res.status === 401){

    return null;
  }

  let data = await res.json();

  return data;
}

// window.stripePromise = loadStripe("pk_test_51J2l6tB7wZYk7wVwRyHPLYOqKIqSrwmJzlnxZDrQgIWMwkuahlMZKhus4mNAUJT4ZwiZ6hCrJNsIIMzBZGlcVLtj00nCUlq5eI")
window.stripePromise = loadStripe("pk_live_isCL9o6X1nZrSNYng1bhR4uG")
// window.fetchUserProfile();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
