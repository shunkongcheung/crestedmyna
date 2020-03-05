import app from "./server";

const PORT = parseInt(process.env.PORT || "8081");

app.listen(PORT, () => {
  console.log(`running at localhost:${PORT}`);
});
