import { Elysia } from "elysia";

const userRoute = new Elysia({ prefix: "/user" });

userRoute.get("/", () => "user list");
userRoute.get("/:id", ({ params }) => `user ${params.id}`)
userRoute.post("/", ({ body }) => body);

export { userRoute };