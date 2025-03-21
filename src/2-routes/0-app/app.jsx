import './app.scss'
import { Route, Routes } from 'react-router-dom';

import Nav from '../1-nav/nav.component'
import Home from '../2-home/home.component';
import Authentication from '../6-authentication/authentication.component';
import Defis from '../3-defis/defis.component';
import Classement from '../4-classement/classement.component';
function App() {

  return (
    <Routes>
    <Route path='/' element={<Nav/>}>
    <Route index element={<Home/>}/>
    <Route path='/authentication' element={<Authentication/>}/>
    <Route path='defis' element={<Defis/>}/>
    <Route path='classement' element={<Classement/>}/>
    </Route>
 </Routes>

  );
}

export default App;
