import './App.css'
 // Import only the icons you need from lucide-react
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Loading from './Loading'
import PreGameForm from './PreGame'
import Details from './Details'
import Analytics from './Analytics'


function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Loading />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Uncomment and add NotFound component if you want a fallback 404 page */}
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/pre-game" element={<PreGameForm />} />
        <Route path="/details" element={<Details />} />
        <Route path="/activity" element={<Analytics />} />
        {/* <Route path="/user" element={<User />} /> */}


      </Routes>
    </Router>
  )
}

export default App
