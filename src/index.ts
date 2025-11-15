import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { userRoute } from "./routes/users";

console.log("PORT DATA",process.env.PORT);
console.log("PORT DATA BUN",Bun.env.PORT);

const port = Number(Bun.env.PORT || process.env.PORT || 3000);

const app = new Elysia()

app.use(staticPlugin({
  assets: "public",   // โฟลเดอร์ไฟล์ static
  prefix: '',        // เส้นทางที่ให้เปิดไฟล์
}))

app.get("/", () => Bun.file("public/index.html"))
app.use(userRoute);

app.listen(port);
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
