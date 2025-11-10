import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function getMongoURI(dbname: string) {
  // Check for MongoDB Atlas credentials
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;
  if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
    return `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`;
  }

  // Fallback to localhost
  return `mongodb://localhost:27017/${dbname}`;
}

export function connect(dbname: string) {
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;
  console.log("MongoDB env check:", {
    hasUser: !!MONGO_USER,
    hasPwd: !!MONGO_PWD,
    hasCluster: !!MONGO_CLUSTER,
    cluster: MONGO_CLUSTER,
  });

  const uri = getMongoURI(dbname);
  console.log(
    `Connecting to MongoDB... (${
      uri.includes("@")
        ? "Atlas"
        : uri.includes("localhost")
        ? "localhost"
        : "custom"
    })`
  );

  mongoose.connect(uri).catch((error) => {
    console.error("MongoDB connection error:", error.message);
    console.error(
      "Please ensure MongoDB is running or configure MONGO_USER, MONGO_PWD, and MONGO_CLUSTER environment variables"
    );
  });

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
}
