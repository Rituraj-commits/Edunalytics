const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017";
const dbName = "srms";

mongoose.connect(`${mongoURL}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log(`Connected to the database: ${dbName}`);
  await checkDatabase();
});

const checkDatabase = async () => {
  try {
    const databaseExists = await mongoose.connection.db
      .listCollections({ name: "admin" })
      .toArray();

    if (databaseExists.length > 0) {
      console.log(`Database '${dbName}' already exists.`);
    } else {
      await mongoose.connection.db.createCollection("admin");
      await mongoose.connection.db.createCollection("student");
      console.log(`Database '${dbName}' created.`);
    }
  } catch (err) {
    console.error(err);
    alert("Error");
  }
};
