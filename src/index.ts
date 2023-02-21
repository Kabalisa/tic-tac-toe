import { app } from "./app";

const start = async () => {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}....`);
  });
};

start();
