import Router from "express";
import { getUser, signIn, signOut, signUp } from "./controllers/user/user";

export const apiRoutes = Router();

// region - user
apiRoutes.get("/user", getUser);
apiRoutes.post("/sign-up", signUp);
apiRoutes.post("/sign-in", signIn);
apiRoutes.patch("/sign-out", signOut);
