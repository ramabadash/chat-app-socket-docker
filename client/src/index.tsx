import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Redux
import { store } from './app/store';
import { Provider } from 'react-redux';
// Components
import App from './components/App';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';

// Style
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/chat'} element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
