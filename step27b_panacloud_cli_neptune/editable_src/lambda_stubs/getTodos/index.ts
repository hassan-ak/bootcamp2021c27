var axios = require("axios");
import * as AWS from "aws-sdk";
import { AppSyncResolverEvent } from "aws-lambda";

exports.handler = async (event: AppSyncResolverEvent<null>) => {
  const url = "https://" + process.env.NEPTUNE_ENDPOINT + ":8182/openCypher";
  const result = getTodos(event.arguments, url);
  return result;
};

async function getTodos(url: string) {
  // Write your buisness logic here

  // Example Schema:

  // type User {
  //   id: ID!
  //   name: String!
  //   age: Int!
  // }

  // input userInput {
  //   name: String!
  //   age: Int!
  // }

  // type Query {
  //   listUsers: [User!]
  // }

  // type Mutation {
  //   createUser(user: userInput!): String
  // }

  // let query = `MATCH (n:user) RETURN n`;
  // try {
  // const fetch = await axios.post(url, `query=${query}`);

  //   const result = JSON.stringify(fetch.data.results);
  //   const data = JSON.parse(result);

  //   let modifiedData = Array();
  //   for (const [i, v] of data.entries()) {
  //     //for each vertex
  //     let obj = {
  //       id: data[i].n["~id"],
  //       ...data[i].n["~properties"],
  //     };

  //     modifiedData.push(obj);
  //   }

  //   return modifiedData;

  // }
  // catch (err) {
  //   console.log("ERROR", err);
  //   return null;
  // }
  // Example Code:
  return [
    { id: "01", title: "Sharline" },
    { id: "01", title: "Jaquenette" },
    { id: "01", title: "Ranee" },
  ];
}
