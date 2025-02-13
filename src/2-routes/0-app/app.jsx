import './app.scss'
import { Route, Routes } from 'react-router-dom';

import Nav from '../1-nav/nav.component'
import Blog from '../2-blog/blog.component';
import Faq from '../11-faq/faq.component';
import Authentication from '../6-authentication/authentication.component'
import Home from '../2-home/home.component';
function App() {

  return (
    <Routes>
    <Route path='/' element={<Nav/>}>
      <Route index element={<Home/>} />
      <Route index element={<Blog/>}/>
      <Route path='faq' element={<Faq/>}/>  
      <Route path='authentication' element={<Authentication/>} />
    </Route>
 </Routes>

  );
}

export default App;
