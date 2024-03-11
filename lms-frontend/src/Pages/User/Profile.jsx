import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../assets/Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";





function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userData = useSelector((state) => state?.auth?.data);
  async function handleCancellation(){
    await dispatch(cancelIdleCallback());
    await dispatch(getUserData());
    toast.success("Cancellation complited!")
    navigate("/");

  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10  flex-col gap-4 rounded-lg p-4 text-white  w-96 shadow-[0_0_10px_black]">
        
          <img
            src={userData?.avatar?.secure_url}
            
            className="w-40 h-40 m-auto rounded-full border border-black "
          /> 
            


          <h3 className="text-xl m-8 font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2 mx-10">
            <p> Email:</p>
            <p>{userData?.email}</p>

            <p> Role:</p>
            <p>{userData?.role}</p>

            <p> Subscription:</p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Link 
            to="/changepassword" 
            className="my-3  text-lg text-center w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm">
                <button>Change password</button>
            </Link>
            <Link 
            to="/user/editprofile" 
            className="my-3  text-lg text-center w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm">
                <button>Edit profile</button>
            </Link>

          </div>
          
          {userData?.subscription?.status ==="active" &&(
            <button  onClick ={handleCancellation} className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300">
                Cancel Subsription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
