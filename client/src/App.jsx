import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login';
// import Create from './Create'
// import Dashboard from './Dashboard';
// import Forms from './Forms';
// import Beats from './Beats'
// import Finder from './Finder'
// import FormDisplay from './FormDisplay';
// import CreateFormPost from './CreateFormPost';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<Login />} />
      {/* <Route path='/create_account' element={<Create />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route exact path='/forums' element={<Forms />} />
      <Route path='/mybeats' element={<Beats />} />
      <Route path='/beatfind' element={<Finder />} />
      <Route exact path='/forums/:category' element={<FormDisplay />} />
      <Route path="/forums/:category/create" element={<CreateFormPost/>} /> */}
    </Routes>
  )
}

export default App