import { createApp } from "./app.js";
import { seedDemoUsers } from "./services/seedService.js";

const PORT = Number(process.env.PORT) || 4000;

await seedDemoUsers();

const app = createApp();
app.listen(PORT, () => {
  console.log(`API http://localhost:${PORT}`);
});
