import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from "./routes/home/home.component";
import Authentication from './routes/authentication/authentication.component';


const Shop = () => {
  return <h1>I be shopping</h1>
}

const App = () => {
  
  return(
    <Routes > {/* Within routes we want to put all of our routes */}
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/> {/* we set a route, then when our path is the defined path variable, we render that element */}
        <Route path='shop' element={<Shop/>}/>
        <Route path='auth' element={<Authentication/>}/>
      </Route>
      
    </Routes>
  ) 
};

export default App;
