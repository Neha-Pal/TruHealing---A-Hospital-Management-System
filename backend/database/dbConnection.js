import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_CONNECTIONSTRING, {
        dbName: "Applicant"
    }).then(() => {
        console.log("Connected to MongoDB successfully");
    }).catch(err => {
        console.log(`Error occurred while connecting to database: ${err}`);
    });
}
