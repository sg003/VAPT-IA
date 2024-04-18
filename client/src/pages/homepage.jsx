import React from 'react';
import { Link } from 'react-router-dom';
import './Common.css';

const Homepage = () => {
  return (
    <div>
      <header>
        <h1>K.J. Somaiya College of Engineering</h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ display: 'inline', marginRight: '10px' }}><a href="/fakepage" style={{ textDecoration: 'none', color: '#11195c' }}>Courses</a></li>
            <li style={{ display: 'inline', marginRight: '10px' }}><a href="/faculty" style={{ textDecoration: 'none', color: '#11195c' }}>Faculty</a></li>
            <li style={{ display: 'inline', marginRight: '10px' }}><a href="/admissions" style={{ textDecoration: 'none', color: '#11195c' }}>Admissions</a></li>
            <li style={{ display: 'inline', marginRight: '10px' }}><a href="/events" style={{ textDecoration: 'none', color: '#11195c' }}>Events</a></li>          </ul>
      </header>
      <main>
        <section className="container">
          <h2>Welcome to the KJSCE Portal!</h2>
          <p>Explore our courses, learn about our faculty, and stay updated on admissions and events.</p>
        </section><br/><hr style={{ borderBottom: '1px solid black' }} /><br/>
        <section>
          <h2>Featured Courses</h2>
          <div className="card-container">
            <div className="card">
              <h3>Course Title 1</h3>
              <p>Description of the course</p>
              <a href="#">Learn More</a>
            </div>
            <div className="card">
            <h3>Course Title 2</h3>
              <p>Description of the course</p>
              <a href="#">Learn More</a>
            </div>
          </div>
        </section><br/><hr style={{ borderBottom: '1px solid black' }} /><br/>
        <section>
          <h2>Upcoming Events</h2>
          <p>Currently no upcoming events</p><br/>
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} KJSCE. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
