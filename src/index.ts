import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { userRoute } from "./routes/users";
import { webSocket } from "./routes/WebSocket";

const port = Number(Bun.env.PORT || process.env.PORT || 3000);

const app = new Elysia()

app.use(staticPlugin({
  assets: "public",   // โฟลเดอร์ไฟล์ static
  prefix: '',        // เส้นทางที่ให้เปิดไฟล์
}))

app.get("/", () => Bun.file("public/index.html"))
app.get("/video", () => Bun.file("public/video.html"))
app.get("/tailwind", () => Bun.file("public/tailwind.html"))
app.use(userRoute);
app.use(webSocket);

app.listen(port);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
