import mongoose from 'mongoose';


mongoose.set('strictQuery', false);                   

const connectionToDB = async () =>{
    try {
        const {connection} = await mongoose.connect(
            process.env.MONGO_URI || `mongodb+srv//awanish:awanish@awanish.bzyqmey.mongodb.net/`
        );
    
        if(connection) {
            console.log(`Connect to MongoDB: ${connection.host}`);
        }
    } catch (e) { 
        console.log(e)
        process.exit(1)
        
    }
    
} 

export default connectionToDB