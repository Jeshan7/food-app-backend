exports.createStream = (model) => {
  model.createMapping((err, mapping) => {
    console.log("Mapping crested");
  });

  const stream = model.synchronize();
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
};
