import { createServer } from "http";
import { parse } from "url";
import next from "next";

const dev = false; // Always false for the production server.js
const port = process.env.PORT || 3000;

console.log(`> Starting server in ${process.env.NODE_ENV} mode...`);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        createServer((req, res) => {
            try {
                const parsedUrl = parse(req.url, true);
                handle(req, res, parsedUrl);
            } catch (err) {
                console.error("Error occurred handling", req.url, err);
                res.statusCode = 500;
                res.end("Internal Server Error");
            }
        })
            .listen(port, (err) => {
                if (err) {
                    console.error("Failed to start server:", err);
                    process.exit(1);
                }
                console.log(`> Server listening on port ${port}`);
            });
    })
    .catch((err) => {
        console.error("Next.js app.prepare() failed:", err);
        process.exit(1);
    });
