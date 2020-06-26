const User = require("mongoosastic");

User.createMapping((err, mapping) => {
  console.log("Mapping crested");
});

const stream = User.synchronize();
let count = 0;

stream.on("data", () => {
  count++;
});

stream.on("close", () => {
  console.log(`Indexed documents - ${count}`);
});

stream.on("error", () => {
  console.log("ES error");
});
