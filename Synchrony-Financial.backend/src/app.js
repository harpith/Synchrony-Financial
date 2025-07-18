import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import documentRoutes from "./routes/document.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"));

app.use(cookieParser());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use("/api/document", documentRoutes);
app.use("/api/chat", chatRoutes);


export { app };