var axios = require("axios");
import * as AWS from "aws-sdk";
import { AppSyncResolverEvent } from "aws-lambda";
import { MutationAddTodoArgs } from "../../customMockLambdaLayer/mockData/types";

exports.handler = async (event: AppSyncResolverEvent<MutationAddTodoArgs>) => {
  const url = "https://" + process.env.NEPTUNE_ENDPOINT + ":8182/openCypher";
  const result = addTodo(event.arguments, url);
  return result;
};

async function addTodo(args: MutationAddTodoArgs, url: string) {
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

  // let query = `CREATE (:user {id: '01', name: '${user.name}', age: ${user.age}})`;
  // try {
  // await axios.post(url, `query=${query}`);
  // return user.name;
  // }

  // catch (err) {
  //   console.log("ERROR", err);
  //   return null;
  // }
  // Example Code:
  return { id: "01", title: "Erin" };
}
