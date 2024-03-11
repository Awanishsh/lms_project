import { useNavigate } from "react-router-dom";


function NotFound(){
    const navigate = useNavigate();
return (

    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-red-500 tracking-widest">
            404
        </h1>
        <div className="bg-black text-white px2 text-ls rounde rotate-12 absolute">
            Page not found ...
        </div>

        <button className="mt-5">
            <a className="relative inline-block text-sm font-mediam text-[#FF6A3D] group active:text-yellow-500 focus:ring">
          <span onClick={() => navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border  border-current">
            Go Back
             
          </span>
          </a>
        </button>

    </div>
)

}
 export default NotFound;