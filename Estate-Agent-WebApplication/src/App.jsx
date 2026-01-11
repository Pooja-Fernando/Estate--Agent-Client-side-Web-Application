
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavouriteProvider } from './Context/FavouriteContext';

//importing pages
import SearchPage from './pages/searchPage';
import PropertyPage from './pages/PropertyPage';


import './App.css';

function App() {


  return (
    < BrowserRouter>
      <FavouriteProvider>
        <div className="app-container">
          <header className="app-header">
            <h1>
              Estate Client Agent
            </h1>
          </header>
          <Routes>
            <Route path='/' element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyPage />} />
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Routes>
          <footer className="app-footer">
            <p>&copy; 2024 Estate Client App</p>
          </footer >
        </div>

      </FavouriteProvider>

    </BrowserRouter>



  );
}

export default App
