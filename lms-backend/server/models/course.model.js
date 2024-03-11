import {model , Schema} from "mongoose";

const courseSchema =new Schema({
    tite:{
        type:String,
        require:[true, 'Title is required'],
        minLength:[8, 'Title must be atleast 8 charactes'],
        maxLength:[59, 'Title should be less then 60 characters'],
        trim: true,


    },
    description:{
        type: String,
        require:[true, 'Descriptionis required'],
        minLength:[8, 'Description must be atleast 8 charactes'],
        maxLength:[200, 'Description should be less then 200 characters'],
        

    },

    category:{
        type: String,
        require:[true,'Category is required']

    },

    thumbnail:{
        public_id:{
            type: String,
            require:true,

        },
        secure_url:{
            type: String,
            require:true,

        }

    },

    lectures:[
        {
            tite: String,
            description: String,
            lecture:{
                public_id:{
                    type: String,
                    require:true,


                },
                secure_url:{
                    type: String,
                    require:true,

                }
            }   
        }
    ],
    numberOfLecture:{
        type:Number,
        delfult:0,
    },
    createBy:{
        type: String,
        require:true
    }


}, {
    timestamps:true
})


const Course = model('Course', courseSchema);


export default Course;