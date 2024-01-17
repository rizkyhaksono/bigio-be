import express from "express";
import cors from "cors";
import routes from "./app/routes/routes.js";

const app = express();
const port = process.env.PORT || 5010;

const corsOptions = {
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/", function (req, res) {
  res.send("Go to /api/{endpoint}");
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
