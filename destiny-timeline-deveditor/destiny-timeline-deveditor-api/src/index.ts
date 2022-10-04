import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import fs from "fs/promises";
import cors from "cors";
import bodyParser from "body-parser";

class HttpException extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

dotenv.config();

const app = express();
const port = process.env.PORT;
const dataPath = "../../src/data/";

const jsonParser = bodyParser.json();

app.use(cors());

app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(
        `📨 [destiny-timeline-deveditor-api]: ${req.hostname} > ${req.method} ${req.originalUrl}`
    );
    next();
});

app.get("/timelines", (_req: Request, res: Response, next: NextFunction) => {
    fs.readFile(dataPath + "timelineData.json", { encoding: "utf8" })
        .then((data) => {
            console.log(`✔️ [destiny-timeline-deveditor-api]: Success`);
            res.status(200).send(data);
        })
        .catch((error) => {
            next(new HttpException(500, JSON.stringify(error)));
        });
});

app.post(
    "/timelines",
    jsonParser,
    (req: Request, res: Response, next: NextFunction) => {
        fs.writeFile(dataPath + "timelineData.json", JSON.stringify(req.body))
            .then(() => {
                console.log(`✔️ [destiny-timeline-deveditor-api]: Success`);
                res.status(200).send();
            })
            .catch((error) => {
                next(new HttpException(500, JSON.stringify(error)));
            });
    }
);

app.use((error: Error, _req: Request, res: Response) => {
    if (error) {
        const httpError = error as HttpException;
        const message = httpError.message || "Something went wrong";
        const status = httpError.status || 500;

        console.log(
            `🛑 [destiny-timeline-deveditor-api]: Error: ${status} ${message}`
        );

        res.status(status).send({
            status,
            message,
        });
    }
});

app.listen(port, () => {
    console.log(
        `⚡ [destiny-timeline-deveditor-api]: Server is running at https://localhost:${port}`
    );
});
