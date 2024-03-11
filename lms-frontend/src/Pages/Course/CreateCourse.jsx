import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { creatNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../assets/Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });
  function handelImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }

  function handelUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.description ||
      !userInput.thumbnail
    ) {
      toast.error("All fields are maindatory");
      return;
    }

    const responce = await dispatch(creatNewCourse(userInput));

    if (responce?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      Navigate("/courses");
    }
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
            <Link className="absolute top-8 text-2xl cursor-pointer">
               <AiOutlineArrowLeft/>
            </Link>
        <h1 className="text-center text-2xl font-bold">
            Create New Course
        </h1>

        <main className="grid grid-cols-2 gap-x-10">

            <div className="gap-y-6 ">
                <div>
                    <label htmlFor="image-uploads" className="cursor-pointer">
                        {userInput.previewImage ?(
                            <img
                            className="w-full h-44 m-auto border "
                            src={userInput.previewImage}
                            />
                             
                        ):(
                                <div className="w-full h-44 m-auto flex items-center justify-center border">
                                    <h1 className="font-bold text-lg">
                                        Upload your course thumbnail
                                    </h1>
                                </div>
                        )}

                    </label>
                    <input 
                    className=""
                    type="file"
                    id="image_uploads"
                    accept=".jpg, .jpeg, .png"
                    name="image_uploads"
                    onChange={handelImageUpload}
                     />
                </div>
                <div className="flex flex-col gap-1 ">
                    <label className="text-lg  font-semibold" htmlFor="title">
                        Course title
                    </label>
                    <input 
                    required
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter course title" 
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.title}
                    onChange={handelUserInput}

                     />

                </div>

            </div>
            <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1 ">
                    <label className="text-lg  font-semibold" htmlFor="createdBy">
                        Course instructor
                    </label>
                    <input 
                    required
                    type="text"
                    id="createdBy"
                    name="createdBy"
                    placeholder="Enter course instructor" 
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.createdBy}
                    onChange={handelUserInput}

                     />

                </div>
                <div className="flex flex-col gap-1 ">
                    <label className="text-lg  font-semibold" htmlFor="category">
                        Course category
                    </label>
                    <input 
                    required
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Enter course category" 
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.category}
                    onChange={handelUserInput}

                     />

                </div>
                <div className="flex flex-col gap-1 ">
                    <label className="text-lg  font-semibold" htmlFor="description">
                        Course description
                    </label>
                    <textarea 
                    required
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Enter course description" 
                    className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none  border"
                    value={userInput.description}
                    onChange={handelUserInput}

                     />

                </div>


                
                
                
                

            </div>

        </main>
        <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-2 rounded-sm font-semibold text-lg cursor-pointer">
            Create Course
        </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
