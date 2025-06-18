import ModelViewer from './components/ModelViewer';
import './App.css';
import Apply from './components/Apply/apply';
import Links from './components/links/links';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About/about';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <ModelViewer />
              <div className='logo'>Technotsav Logo</div>
              {<p className='pw' style={{ position: "absolute", bottom: 0, left: 0, marginLeft: "20px" }}>Made with <span style={{ fontSize: "1rem" }}>❤️</span> by Technotsav Web Team</p >}
              <Apply />
              <Links facebook={""} github={""} />
            </>
          } />
          <Route path="/about" element={
            <>
              <div className='logo'>Technotsav Logo</div>
              {<p className='pw' style={{ position: "absolute", bottom: 0, left: 0, marginLeft: "20px" }}>Made with <span style={{ fontSize: "1rem" }}>❤️</span> by Technotsav Web Team</p >}
              <Apply />
              <About />
              <Links facebook={""} github={""} />

            </>
          } />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
