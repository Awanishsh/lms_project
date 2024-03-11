import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import CoursesList from './Pages/Course/CoursesList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import Checkout from './Pages/Payment/Checkout'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import CheckouFailure from './Pages/Payment/CheckoutFailure'
import DiplayLecture from './Pages/Dashboard/DisplayLecture'
import Addlecture from './Pages/Dashboard/AddLecture'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'




function App() {


  return ( 
    <Routes>
      <Route path='/' element={<HomePage/>} ></Route>
      <Route path='/about' element={<AboutUs/>} ></Route>
      <Route path='/courses' element={<CoursesList/>} ></Route>
      <Route path='/contact' element={<Contact/>} ></Route>
      <Route path='/denied' element={<Denied/>} ></Route>
      <Route path='/course/description' element={<CourseDescription/>} ></Route>


      <Route path='/Signup' element={<Signup/>} ></Route>
      <Route path='/Login' element={<Login/>} ></Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/> }> 
      <Route path='/course/create' element={<CreateCourse/>} ></Route> 
      <Route path='/course/addlecure' element={<Addlecture/>} ></Route> 
      <Route path='/admin/dashboard' element={<AdminDashboard/>} ></Route> 

      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]}/> }> 
      <Route path='/user/profile' element={<Profile/>}/>
      <Route path='/user/editprofile' element={<EditProfile/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/checkout/success' element={<CheckoutSuccess/>}/>
      <Route path='/checkout/fail' element={< CheckouFailure/>}/>
      <Route path='/course/displaylecture' element={<DiplayLecture/>}/>

      </Route>

      <Route path='*' element={<NotFound/>} ></Route>
    
    </Routes>
  )
}

export default App
