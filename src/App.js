import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store'; // Import your Redux store
import Cart from './Cart';
import PizzaList from './PizzaList'; // Replace with the correct path
import Header from './Header';
import Success from './Success'; // Import the Success component

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<PizzaList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/success" element={<Success />} /> {/* New route */}
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;