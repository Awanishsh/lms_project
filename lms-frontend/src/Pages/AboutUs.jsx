
import CarouselSlide from "../Components/CarouselSlide"
import { celebrities } from "../Constants/CelebrityData";
import HomeLayout from "../assets/Layouts/HomeLayout";

import AboutUsimage from "../assets/Images/AboutUsimage.jpg"



function AboutUs() {


  

    return (
        <HomeLayout>
           
            <div className=" pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2  space-y-10">
                        <h1 className=" text-5xl text-yellow-500 font-semibold ">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Eveniet enim, esse aut doloribus dolorum ea nobis mollitia dolorem corrupti, temporibus, fuga asperiores!
                            Cumque amet natus quo perspiciatis voluptatibus repudiandae ipsum?
                        </p>

                    </section>
                    <div className="w-[90vh] filex mt-0">
                        <img
                            id="test1"
                            alt="about main image"
                            style={{
                                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"
                            }}
                            className="drop-shadow-2xl"
                            src={AboutUsimage}

                        />
                    </div>
                </div>

                <div className="carousel w-full  h-[90vh] flex rounded-lg" >   
                {celebrities && celebrities.map(celebrity => (<CarouselSlide
                                                             {...celebrity} 
                                                             key={celebrity.slideNumber} 
                                                             totalSlides = {celebrities.length}
                                                             />))}   
                                      
                    
                
            </div>

       
        </div>
       
        </HomeLayout >
    ) 

}

export default AboutUs;