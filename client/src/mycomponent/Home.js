import React from "react";
import { NavLink } from "react-router-dom";
// import { themeContext } from '../Context';
// import { useContext } from 'react';

function Home() {
  // const theme = useContext(themeContext);
  // const darkMode = theme.state.darkMode;
  return (
    <>
      <section id="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center" data-aos="fade-up">
              <div>
                <h1>Save money,<br />without thinking<br />about it.</h1>
                <h2>Manage your daily expense and income</h2>
                <NavLink to="/dashboard" className="btn-get-started scrollto">Get Started</NavLink>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left">
              {/* <img src="assets/img/hero-img.png" className="img-fluid animated" alt="" /> */}
              <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_JltT5PDsjU.json"
                className="img-fluid animated"
                background="transparent" speed="1"
                loop controls autoplay></lottie-player>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;