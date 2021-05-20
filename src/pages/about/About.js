import React from 'react';
import './About.css';
const About = () => {
  return (
    <div className="about-container">
      <section className="hr-element">
        <h1 className="about-title">Our Mission</h1>
      </section>

      <section className="about-us-pic-container">
        <img
          className="about-us-picture"
          src="https://images.unsplash.com/photo-1476733636740-24c58e0e7432?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80"
        />
      </section>
      <section className="about-us-paragraph">
        At Kreamin Studio we try give the best and premium user experience in a
        buy and sell platform. We believe that there are better ways to set a
        buy and sell session that is private and safe. We are excited to provide
        such service to our customers to ensure safety and experience.
      </section>
      <section className="developers">
        <h2>Developers</h2>
        <article className="developers-flex-box">
          <div className="sungmin">
            <h4>Sungmin Jin</h4>
            <div>
              <p>In charge of the backend portion of the website</p>
            </div>
          </div>
          <div className="gyeongmin">
            <h4>Gyeong-Min Lee</h4>
          </div>
        </article>
      </section>
    </div>
  );
};

export default About;
