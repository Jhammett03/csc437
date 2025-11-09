import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function getMongoURI(dbname: string) {
  let connection_string = `mongodb://localhost:27017/${dbname}`;
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;

  if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
    connection_string = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`;
  }
  return connection_string;
}

export function connect(dbname: string) {
  mongoose.connect(getMongoURI(dbname)).catch((error) => {
    console.error("MongoDB connection error:", error);
  });
}
