const express = require("express");
const app = express();
const boter = require("./bot");
app.use(express.json({ extended: false }));

app.use("/", boter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {console.log(`Server is running in port ${PORT}`)
});
  