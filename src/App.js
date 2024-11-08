import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/login";
import Register from "./pages/register/register" ;


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="hotel-manage-ui.onrender.com/" element={<Home/>}/>
        <Route path="hotel-manage-ui.onrender.com/hotels" element={<List/>}/>
        <Route path="hotel-manage-ui.onrender.com/hotels/:id" element={<Hotel/>}/>
        <Route path="hotel-manage-ui.onrender.com/login" element={<Login/>}/>
        <Route path="hotel-manage-ui.onrender.com/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
