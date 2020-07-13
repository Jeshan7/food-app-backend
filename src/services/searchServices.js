const mongoose = require("mongoose");
const es = require("../config/elasticsearch");

// Input name and location
exports.query_suggestions = async (query) => {
  try {
    // console.log(query);
    const { body } = await es.search({
      index: "restaurants",
      body: {
        _source: ["restaurant_id", "name", "locations", "cost_for_two"],
        suggest: {
          suggest_data: {
            text: query.name,
            completion: {
              field: "search_name",
            },
          },
        },
      },
    });
    // console.log(body.suggest.suggest_data[0].options);
    const result = body.suggest.suggest_data[0].options
      .map((doc) => {
        if (doc._source.locations.includes(query.location)) {
          return {
            restaurant_id: doc._source.restaurant_id,
            name: doc._source.name,
          };
        } else {
          return undefined;
        }
      })
      .filter((data) => {
        return data !== undefined;
      });

    return result;
  } catch (error) {
    console.log(error.meta.body);
    throw new Error(error.message);
  }
};

exports.query_search = async (data) => {
  try {
    const { body } = await es.search({
      index: "restaurants",
      body: {
        _source: [
          "restaurant_id",
          "name",
          "locations",
          "ratings",
          "cost_for_two",
          "description",
        ],
        query: {
          bool: {
            must: {
              match_phrase_prefix: {
                name: {
                  query: data.name,
                  // slop: 2,
                },
              },
            },
            filter: {
              term: {
                locations: data.location,
              },
            },
          },
        },
      },
    });
    const result = body.hits.hits.map((doc) => {
      return doc._source;
    });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.query_filter = async (query) => {
  console.log(query);
  try {
    const { body } = await es.search({
      index: "restaurants",
      body: {
        _source: ["restaurant_id", "name", "ratings", "cost_for_two"],
        query: {
          bool: {
            must: {
              range: {
                ratings: {
                  gte: query.ratings ? query.ratings : 1,
                },
              },
              range: {
                cost_for_two: {
                  lte: query.cost ? query.cost : 500,
                },
              },
            },
          },
        },
      },
    });
    const result = body.hits.hits.map((doc) => {
      return doc._source;
    });
    return result;
    // console.log("sas", body.hits.hits);
  } catch (error) {
    throw new Error(error.message);
  }
};
