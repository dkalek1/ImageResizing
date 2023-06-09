import express, { Express, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";

const app: Express = express();
const __dirname = path.resolve();

dotenv.config({ path: path.join(__dirname, ".env") });

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
  const language = req.headers["accept-language"]?.split(",")[0];
  switch (language) {
    case "ko":
      res.redirect("/ko");
      break;
    default:
      res.redirect("/en");
      break;
  }
});

app.get("/en", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "view/en-US.html"));
});

app.get("/ko", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "view/ko.html"));
});

app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, "view/404.html"));
});

app.use((err, req, res, next) => {
  res.status(500).sendFile(path.join(__dirname, "view/error.html"));
});

app.listen(port, () => {
  console.log(`${port}에서 서버 열림`);
});

// 윈스턴 설치해서 로깅되게 하기
