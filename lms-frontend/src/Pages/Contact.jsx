import { useState } from "react";
import HomeLayout from "../assets/Layouts/HomeLayout";
import {toast} from "react-hot-toast";
import {isEmail} from "../assets/Helpers/regexMatcher";
import axiosInstance from "../assets/Helpers/axiosInstance";

function Contact() {

    const [userInput, setUserInput] = useState({
        name:"",
        email:"",
        message:"",
    })

    function handalInputChange(e){

        const {name , value} = e.target;
       
        setUserInput({
            ...userInput,
            [name]:value
        })

    }
    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("All fields are mandatory");
            return 
        }

        if(!isEmail(userInput.email)){
            toast.error("Invaid email")
            return
        }
        try {
            const response = axiosInstance.post("./contact",{userInput});
            toast.promise(response,{
                loading:"Submitting your message...",
                success:"Form submittion successfully",
                error:"Failed to submit the form"
            });

            const contactResponse = await response;
            if(contactResponse?.data?.success){
                setUserInput({
                    name:"",
                    email:"",
                    message:""
                })
            }
            
        } catch (err) {
            toast.error("operation failed...")
        
        }

    }

    return (
        <HomeLayout>
           
            <div className="flex items-center justify-center h-[100vh]">
        
                <form
                    novalidate=""
                    onSubmit={onFormSubmit}
                
                
                className=" flex flex-col  items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-80">
                    <h1 className="text-3xl font-semibold">
                        Contact Form
                    </h1>

                    <div className="flex flex-col w-full gap-1">
                        <lable htmlFor="name" className="text-xl font-semibold">
                            Name
                        </lable>
                        
                        <input 
                        className="bg-transparent border px-2 py-1 rounded-sm"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        onChange={handalInputChange}
                       

                        
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">  
                        <lable htmlFor="email" className="text-xl font-semibold">
                            Email
                        </lable>
                        <input 
                        className="bg-transparent border px-2 py-1 rounded-sm"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={handalInputChange}
                    

                        
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <lable htmlFor="message" className="text-xl font-semibold">
                            Message
                        </lable>
                        <textarea 
                        className="bg-transparent border px-2 py-1 rounded-sm"
                        id="message"
                        name="message"
                        placeholder="Enter your details"
                        onChange={handalInputChange}

                        
                        ></textarea>
                    </div>
                    <button type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"> 
                         Submit
                    </button>

                </form>
            </div>

        </HomeLayout>
    )

}



export default Contact;