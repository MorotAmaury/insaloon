import './app.scss'
import { Route, Routes } from 'react-router-dom';

import Nav from '../1-nav/nav.component'

function App() {

  return (
    <Routes>
    <Route path='/' element={<Nav/>}>
    </Route>
 </Routes>

  );
}

export default App;
