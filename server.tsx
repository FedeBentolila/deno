// @deno-types="https://denopkg.com/soremwar/deno_types/react/v16.13.1/react.d.ts"
import React from "https://jspm.dev/react@17.0.2";
// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server";
// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/react-dom.d.ts"
import { createApp } from "https://deno.land/x/servest@v1.3.4/app.ts";

const app = createApp();
let colores: string[] = [];

app.handle("/", async (req) => {
  const url = new URL(req.url, `http://${req.headers.get("host")}`);
  const color = url.searchParams.get("color");
  if (color) {
    colores.push(color);
  }

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
          <h1 style={{ color: "blue" }}>
            Servidor Deno con React y Servest
          </h1>
          <h2 style={{ color: "brown" }}> Colores: </h2>
          <ul>
            {colores.map((color) => (
              <li style={{color:color}}>{color}</li>
            ))}
          </ul>
          <form>
            <label htmlFor="coloragregado">Agregar color:</label>
            <input type="text" id="coloragregado" name="color" />
            <button type="submit">Agregar</button>
          </form>
        </body>
      </html>
    ),
  });
});

app.listen({ port: 8899 });
