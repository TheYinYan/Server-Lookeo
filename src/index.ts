import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/db.js";

const PORT = env.PORT;

async function startServer() {
  try {
    await prisma.$connect();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Servidor corriendo en http://localhost:${PORT}/api/users`);

      console.log(`Entorno: ${env.NODE_ENV}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Error al iniciar el servidor");
    }
  }
}

startServer().catch((error) => {
  console.error("Error inesperado:", error);
});
