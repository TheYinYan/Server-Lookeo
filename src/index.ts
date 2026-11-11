import { log } from "console";
import { app } from "./app.js";
import { env } from "./config/env.js";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Servidor corriendo en http://localhost:${PORT}/api/users`);

  console.log(`Entorno: ${env.NODE_ENV}`);
});
