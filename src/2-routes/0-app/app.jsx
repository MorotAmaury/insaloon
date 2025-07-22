import './app.scss'
import { Route, Routes } from 'react-router-dom';

import Nav from '../1-nav/nav.component'
import Home from '../2-home/home.component';
import Admin from '../5-admin/admin.component.jsx';
import PageDefis from '../3-defis/pageDefis.component.jsx';
import ClassementPage from '../4-classement/classementPage.component.jsx';
import SubmissionPage from '../4-SubPage/submissionPage.component.jsx';
import DetailFamillePage from '../4-classement/DetailFamillePage.jsx';
import AdminLogin from '../5-admin/adminLogin.component.jsx';
import AdminPage from '../5-admin/adminPage.component.jsx';
import Evenements from '../6-event/evenement.component.jsx';
function App() {

if (!import.meta.env.VITE_TEST_URL) {
  console.warn("⚠️ VITE_TEST_URL n'est pas défini !");
}
console.log(import.meta.env.VITE_TEST_URL);  
  return (
    <Routes>
    <Route path='/' element={<Nav/>}>
    <Route index element={<Home/>}/>
    <Route path='defis' element={<PageDefis/>}/>
    <Route path="/admin-login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/evenement" element={<Evenements />} />
    <Route path='classement' element={<ClassementPage/>}/>
    <Route path='submission' element={<SubmissionPage/>}/>
    <Route path="/famille/:nom" element={<DetailFamillePage />} />
    </Route>
 </Routes>

  );
}

export default App;
