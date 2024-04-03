import React from 'react';
import { Link } from 'react-router-dom';
import './Common.css';

const AdminHomepage = () => {
  return (
    <div>
      <header>
        <h1>K.J. Somaiya College of Engineering (Admin)</h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/courses" style={{ textDecoration: 'none', color: '#11195c' }}>Courses</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/faculty" style={{ textDecoration: 'none', color: '#11195c' }}>Faculty</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/admissions" style={{ textDecoration: 'none', color: '#11195c' }}>Admissions</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/events" style={{ textDecoration: 'none', color: '#11195c' }}>Events</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/admin" style={{ textDecoration: 'none', color: '#11195c' }}>Admin Dashboard</a></li> {/* New admin link */}
        </ul>
      </header>
      <main>
        <section className="container">
          <h2>Welcome to the KJSCE Portal (Admin)!</h2> 
          <p>Manage courses, faculty, admissions, events, and more.</p> 
        </section><br/><hr style={{ borderBottom: '1px solid black' }} /><br/>
        <section>
          <h2>Manage Courses</h2> 
          <p>View, add, edit, or delete courses.</p>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/courses" style={{ textDecoration: 'none', color: '#11195c' }}>Go to Course Management</a></li>
          </ul>
        </section><br/><hr style={{ borderBottom: '1px solid black' }} /><br/>
        <section>
          <h2>Manage Faculty</h2>
          <p>View, add, edit, or delete faculty members.</p>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/faculty" style={{ textDecoration: 'none', color: '#11195c' }}>Go to Faculty Management</a></li>
          </ul>
        </section><br/><hr style={{ borderBottom: '1px solid black' }} /><br/>
        <section>
          <h2>Manage Admissions</h2>
          <p>View, add, edit, or delete admissions.</p>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/admissions" style={{ textDecoration: 'none', color: '#11195c' }}>Go to Admission Management</a></li>
          </ul>
        </section><br/><hr style={{ borderBottom: '1px solid black' }} /><br/>
        <section>
          <h2>Manage Events</h2>
          <p>View, add, edit, or delete events.</p>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/event" style={{ textDecoration: 'none', color: '#11195c' }}>Go to Events Management</a></li>
          </ul>
        </section><br/><hr style={{ borderBottom: '1px solid black' }} /><br/>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} KJSCE. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminHomepage;
