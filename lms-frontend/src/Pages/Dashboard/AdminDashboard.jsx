import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../assets/Layouts/HomeLayout";
import {
  Chart as chartJs,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStartData } from "../../Redux/Slices/StarSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import {FcSalesPerformance} from "react-icons/fc"
import {GiMoneyStack} from "react-icons/gi"
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

chartJs.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUserCount, subscribedCount } = useSelector((state) => state.state);

  const { allPayment, finalMonth, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Register User", "Entolled User"],
    fontColor: "white",
    datasets: [
      {
        label: "User Details",
        data: [allUserCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderColor: ["yellow", "green"],
      },
      {
        label: "User Details",
        data: [10, 15],
        backgroundColor: ["red", "blue"],
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "sales/Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255, 99, 132)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };
  const myCourses = useSelector((state) => state?.course?.courseData);

  async function onCoursesDelete(id) {
    if (window.confirm("Are you sure you want to delete the couses ? ")) {
    }
    const respose = await dispatch(deleteCourse(id));
    if (respose?.payload ) {
      await dispatch(getAllCourses());
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStartData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrop gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>
        <div className=" grid grid-cols-2 gap-5 m-auto mx-10">
          <div className=" felx flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="w-80 h-80 ">
              <Pie data={userData} />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className=" flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                <div className="felx flex-col items-center ">
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-4xl font-bold">{allUserCount}</h3>
                </div>
                <FaUsers className="text-yellow-500 text-5xl" />
              </div>
            
                <div className=" flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                  <div className="felx flex-col items-center ">
                    <p className="font-semibold">Subscription Users</p>
                    <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                  </div>
                  <FaUsers className="text-green-500 text-5xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                <div className="h-80 w-full relative">
                    <Bar  className=" absolute bottom-0 h-80 w-full " data={salesData}/>


                </div>
                <div className="grid grid-cols-2 gap-5">
                <div className=" flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                  <div className="felx flex-col items-center ">
                    <p className="font-semibold">Subscription Count</p>
                    <h3 className="text-4xl font-bold">{allPayment?.count}</h3>
                  </div>
                  <FcSalesPerformance className="text-green-500 text-5xl" />
                </div>
                <div className=" flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
                  <div className="felx flex-col items-center ">
                    <p className="font-semibold">Total Revenue</p>
                    <h3 className="text-4xl font-bold">{allPayment?.count *499}</h3>
                  </div>
                  <GiMoneyStack className="text-green-500 text-5xl" />
                </div>
                

                </div>

            </div>
          </div>
          <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
              <div className=" flex w-full items-center justify-between">
                <h1 className=" text-center text-3xl font-semibold ">
                    Courses overview
                </h1>
                <button onClick={() =>{
                    navigate("course/create")
                }}
               className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 px-4 font-semibold text-xl cursor-pointer"
                > 

                </button>

              </div>
              <table className="table overflow-x-scroll ">
               <thead>
                <tr>
                    <th>S No</th>
                    <th>Course Title</th>
                    <th>Courses Category</th>
                    <th>Instructor</th>
                    <th>Total Lecture</th>
                    <th>Description</th>
                    <th>Actions</th>

                        
                    
                </tr>
               </thead>
               <tbody>
                {myCourses?.map((course,idx)  =>{
                    return(
                        <tr key={course._id}> 
                        <td>{idx+1}</td>
                        <td>
                            <textarea readOnly value={course.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                        </td>
                        <td>{course?.category}</td>
                        <td>{course?.createdBy}</td>
                        <td>{course?.numbersOfLectures}</td>
                        <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                            <textarea 
                                value = {course?.desription}
                                readOnly
                                className="w-80 h-auto bg-transparent resize-none"
                                
                                
                                >
                                
                            </textarea>
                            </td>
                            <td className="flex items-center gap-4 ">
                                <button
                                className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                onClick={() => navigate("/coues/displaylectures", {state:{...course}})}
                                >
                                    <BsCollectionPlayFill/>

                                </button>
                                <button
                                className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                onClick={() => onCoursesDelete(course?._id)}
                                >
                                    <BsTrash/>

                                </button>

                            </td>
 
                        </tr>
                    )
                })}
               </tbody>
              </table>
          </div>
        </div>
      
    </HomeLayout>
  );
}

export default AdminDashboard;
