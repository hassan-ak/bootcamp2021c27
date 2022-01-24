var axios = require("axios");
import * as AWS from "aws-sdk";
import { AppSyncResolverEvent } from "aws-lambda";
import { MutationDeleteTodoArgs } from "../../customMockLambdaLayer/mockData/types";
const db = require("data-api-client")({
  secretArn: process.env.SECRET_ARN,
  resourceArn: process.env.CLUSTER_ARN,
  database: process.env.DB_NAME,
});
exports.handler = async (
  event: AppSyncResolverEvent<MutationDeleteTodoArgs>
) => {
  const result = await deleteTodo(event.arguments);
  return result;
};

async function deleteTodo(args: MutationDeleteTodoArgs) {
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

  // Example Code:

  // try{
  // const query = `INSERT INTO users (name,age) VALUES(:name,:age)`;
  // await db.query(query, { name:'John', age:20 })
  //return args.user.name
  // }
  // catch (err)  {
  // console.log('ERROR', err)
  // return null
  // }
  return "Sybyl";
}
