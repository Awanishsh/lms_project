import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, useNavigate} from 'react-router-dom'
import Footer from '../../Components/Footer';
import {useDispatch ,  useSelector} from 'react-redux'
import { logout } from '../../Redux/Slices/AuthSlice';

function HomeLayout({children}){


    const dispatch = useDispatch();
    const navigate = useNavigate();

 // for checking if user is logged In 
    const isLoggedIn = useSelector((state) => state?. auth?.isLoggedIn);


    // for displaying the otion according to role
    
    const role = useSelector((state) => state?.auth?.role);
  
    function changeWidth(){
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }
     function hideDrawer(){
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = '0';
     }
       

     async function handleLogout(e){
        e.preventDefault();

        const res = await dispatch(logout());
        if(res?.payload?.success)

        navigate("/")

     }


    return(
        
        <div className="min-h-[90vh]">
        <div className="drawer absolute left-0 z-50 w-fit">
            <input className="drawer-toggle" id ="my-drawer" type="checkbox" />
            <div className="drawer contant">
                <label htmlFor="my-drawer" className="cursor-pointer relative">

                <FiMenu
                 onClick={changeWidth} 
                 size={"32px"}
                 className='font-bold text-white m-4'
                />

                </label>
                </div>
               
            <div className='drawer-side w-0  '>
                <label htmlFor="my-drawer" className='drawer-overlay'>

                </label>
                <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative ">
                    <li className="w-fit absolute right-2 z-50">
                        <button onClick={hideDrawer}>
                            <AiFillCloseCircle size={24}/>
                        </button>

                    </li>
                    <li>
                        <Link to ="/" >Home</Link>
                    </li>

                    {isLoggedIn && role === 'ADMIN' && (
                        <li>
                            <Link to="/">Admin DashBoard</Link>
                        </li>
                    )}
                    <li>
                        <Link to ="/courses" >All Courses</Link>
                    </li>
                    <li>
                        <Link to ="/contact" >Contact Us</Link>
                    </li>
                     <li>
                        <Link to ="/about" >About Us </Link>
                    </li>
                     {!isLoggedIn && (
                
                       
                        <div className='w-full flex items-center justify-left pt-96'>
                            <button className='bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-5 rounded m-2'>
                                <Link to='/login'>Login</Link>

                            </button>
                            <button className='bg-fuchsia-700 hover:bg-fuchsia-900 text-white font-bold py-2 px-5 rounded m-2'>
                                <Link to='/Signup'>SignUp</Link>

                            </button>
                        </div>
                      
                     )}
                    
                     {isLoggedIn && (
                        
                       
                        <div className='w-full flex items-center justify-left pt-96'>
                    
                            <button className='bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-5 rounded m-2'>
                                <Link to='/user/profile'>Profile</Link>

                            </button>
                            <button className='bg-fuchsia-700 hover:bg-fuchsia-900 text-white font-bold py-2 px-5 rounded m-2'>
                                <Link onClick={handleLogout}>Logout</Link>

                            </button>
                        </div>
                         
                     )}
                    
                </ul>
            </div> 
         </div>
         {children}

         <Footer/>
        </div>
   
    )


}

export default HomeLayout;