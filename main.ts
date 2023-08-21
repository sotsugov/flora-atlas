import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import data from "./data.json" assert { type: "json" };

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "PROPERTY OF GENETECH CORP";
  })
  .get("/api", (context) => {
    context.response.body = data;
  })
  .get("/api/:name", (context) => {
    if (context?.params?.name) {
      const found = data.find(
        (item) => item.name.toLowerCase() === context.params.name.toLowerCase(),
      );
      if (found) {
        context.response.body = found;
      } else {
        context.response.body = 'No data found.';
      }
    }
  });

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
