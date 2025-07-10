import './app.scss'
import { Route, Routes } from 'react-router-dom';

import Nav from '../1-nav/nav.component'
import Home from '../2-home/home.component';
import Admin from '../5-admin/admin.component.jsx';
import PageDefis from '../3-defis/pageDefis.component.jsx';
import ClassementPage from '../4-classement/classementPage.component.jsx';
function App() {

  return (
    <Routes>
    <Route path='/' element={<Nav/>}>
    <Route index element={<Home/>}/>
    <Route path='defis' element={<PageDefis/>}/>
    <Route path='admin' element={<Admin/>}/>
    <Route path='classement' element={<ClassementPage/>}/>
    </Route>
 </Routes>

  );
}

export default App;
