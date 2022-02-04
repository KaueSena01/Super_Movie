import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Container from "./components/layout/Container"
import Login from "./components/pages/Auth/Login"
import Home from "./components/pages/Home"


import { UserProvider } from "./context/UserContext"
import MovieDetails from "./components/pages/Movies/MovieDetails"
import Register from "./components/pages/Auth/Register"
import Message from "./components/layout/Message"
import Profile from "./components/pages/User/Profile"
import Favorites from "./components/pages/Movies/Favorites"

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
      <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/user" element={<Login/>}/>
            <Route path="/movie/:id" element={<MovieDetails/>}/>
            <Route path="/user/register" element={<Register/>}/>
            <Route path="/user/login" element={<Login/>}/>
            <Route path="/user/profile" element={<Profile/>}/>
            <Route path="/movie/favorites" element={<Favorites/>}/>
          </Routes>
        </Container>
      <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
