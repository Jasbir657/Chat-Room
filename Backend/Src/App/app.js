import express from "express";
import router from "../Routes/routes.js";
import cors from "cors";

const app = express();

export const corsOptions = {
    origin: (origin, callback) => {
        const isAllowed =
            !origin ||
            origin === "https://chatroom-dusky-nine.vercel.app" ||
            /^https:\/\/chatroom(?:-[a-z0-9-]+)?-jasbir657\.vercel\.app$/.test(origin);

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

export default app;