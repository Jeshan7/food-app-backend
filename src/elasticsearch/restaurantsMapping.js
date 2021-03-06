const es = require("../config/elasticsearch");

exports.createStream = async () => {
  try {
    const { body } = await es.indices.exists({
      index: "restaurants",
    });
    if (!body) {
      await es.indices.create({
        index: "restaurants",
        body: {
          mappings: {
            dynamic: false,
            properties: {
              restaurant_id: {
                type: "keyword",
              },
              name: {
                type: "text",
              },
              description: {
                type: "text",
              },
              locations: {
                type: "keyword",
              },
              search_name: {
                type: "completion",
              },
              ratings: {
                type: "long",
              },
              cost_for_two: {
                type: "long",
              },
            },
          },
        },
      });
    }
    console.log("Mapping created");
  } catch (err) {
    console.log("Error", err);
  }
};
