import { aws_appsync as appsync, CfnOutput } from "aws-cdk-lib";
import { aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";
interface AppsyncProps {
    step27APanacloudCliDdb_lambdaFn_getTodosArn: string
    step27APanacloudCliDdb_lambdaFn_addTodoArn: string
    step27APanacloudCliDdb_lambdaFn_deleteTodoArn: string
    prod?: string
}

export class  AppsyncConstruct extends Construct {
    public  api_url: string;
    public  api_key: string;
     
    constructor(scope: Construct, id: string, props?: AppsyncProps) {
        super(scope, id);
    

     const step27APanacloudCliDdb_appsync
    : appsync.CfnGraphQLApi
     = 
    new appsync.CfnGraphQLApi(this, props?.prod ? props?.prod+"step27APanacloudCliDdb" : "step27APanacloudCliDdb", {
          authenticationType:'API_KEY',
          name: props?.prod ? props?.prod+"step27APanacloudCliDdb" : "step27APanacloudCliDdb",
        })
    ;

     const step27APanacloudCliDdb_schema
    : appsync.CfnGraphQLSchema
     = 
    new appsync.CfnGraphQLSchema(this, props?.prod ? props?.prod+"step27APanacloudCliDdbSchema" : "step27APanacloudCliDdbSchema",{
            apiId: step27APanacloudCliDdb_appsync.attrApiId,
            definition:`scalar AWSDate
scalar AWSTime
scalar AWSDateTime
scalar AWSTimestamp
scalar AWSEmail
scalar AWSJSON
scalar AWSURL
scalar AWSPhone
scalar AWSIPAddress

type Todo {
  id: ID!
  title: String!
}

input TodoInput {
  id: ID!
  title: String!
}

type Query {
  getTodos: [Todo]
}

type Mutation {
  addTodo(todo: TodoInput): Todo
  deleteTodo(todoId: String): String
}

# @microService(name:"todo")
`
          })
    ;

     const step27APanacloudCliDdb_apiKey
    : appsync.CfnApiKey
     = 
    new appsync.CfnApiKey(this,"apiKey",{
              apiId:step27APanacloudCliDdb_appsync.attrApiId
          })
    ;

     const step27APanacloudCliDdb_serviceRole
    : iam.Role
     = 
    new iam.Role(this,'appsyncServiceRole',{
                    assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
                   });
    ;

    step27APanacloudCliDdb_serviceRole.addToPolicy(new iam.PolicyStatement({
                resources: ['*'],
                actions: ['lambda:InvokeFunction'],
              }));

     const ds_step27APanacloudCliDdb_addTodo
    : appsync.CfnDataSource
     = 
    new appsync.CfnDataSource(this, props?.prod ? props?.prod+"step27APanacloudCliDdbdataSourceGraphqladdTodo" : "step27APanacloudCliDdbdataSourceGraphqladdTodo",{
          name: props?.prod ? props?.prod+"step27APanacloudCliDdb_dataSource_addTodo" : "step27APanacloudCliDdb_dataSource_addTodo",
          apiId: step27APanacloudCliDdb_appsync.attrApiId,
          type:"AWS_LAMBDA",
          lambdaConfig: {lambdaFunctionArn:props!.step27APanacloudCliDdb_lambdaFn_addTodoArn},
          serviceRoleArn:step27APanacloudCliDdb_serviceRole.roleArn
         })
    ;

     const ds_step27APanacloudCliDdb_deleteTodo
    : appsync.CfnDataSource
     = 
    new appsync.CfnDataSource(this, props?.prod ? props?.prod+"step27APanacloudCliDdbdataSourceGraphqldeleteTodo" : "step27APanacloudCliDdbdataSourceGraphqldeleteTodo",{
          name: props?.prod ? props?.prod+"step27APanacloudCliDdb_dataSource_deleteTodo" : "step27APanacloudCliDdb_dataSource_deleteTodo",
          apiId: step27APanacloudCliDdb_appsync.attrApiId,
          type:"AWS_LAMBDA",
          lambdaConfig: {lambdaFunctionArn:props!.step27APanacloudCliDdb_lambdaFn_deleteTodoArn},
          serviceRoleArn:step27APanacloudCliDdb_serviceRole.roleArn
         })
    ;

     const ds_step27APanacloudCliDdb_getTodos
    : appsync.CfnDataSource
     = 
    new appsync.CfnDataSource(this, props?.prod ? props?.prod+"step27APanacloudCliDdbdataSourceGraphqlgetTodos" : "step27APanacloudCliDdbdataSourceGraphqlgetTodos",{
          name: props?.prod ? props?.prod+"step27APanacloudCliDdb_dataSource_getTodos" : "step27APanacloudCliDdb_dataSource_getTodos",
          apiId: step27APanacloudCliDdb_appsync.attrApiId,
          type:"AWS_LAMBDA",
          lambdaConfig: {lambdaFunctionArn:props!.step27APanacloudCliDdb_lambdaFn_getTodosArn},
          serviceRoleArn:step27APanacloudCliDdb_serviceRole.roleArn
         })
    ;


     const getTodos_resolver
    : appsync.CfnResolver
     = 
    new appsync.CfnResolver(this,'getTodos_resolver',{
            apiId: step27APanacloudCliDdb_appsync.attrApiId,
            typeName: "Query",
            fieldName: "getTodos",
            dataSourceName: ds_step27APanacloudCliDdb_getTodos.name,
        })
    ;

    getTodos_resolver.node.addDependency(step27APanacloudCliDdb_schema);
    getTodos_resolver.node.addDependency(ds_step27APanacloudCliDdb_getTodos);

     const addTodo_resolver
    : appsync.CfnResolver
     = 
    new appsync.CfnResolver(this,'addTodo_resolver',{
            apiId: step27APanacloudCliDdb_appsync.attrApiId,
            typeName: "Mutation",
            fieldName: "addTodo",
            dataSourceName: ds_step27APanacloudCliDdb_addTodo.name,
        })
    ;

    addTodo_resolver.node.addDependency(step27APanacloudCliDdb_schema);
    addTodo_resolver.node.addDependency(ds_step27APanacloudCliDdb_addTodo);

     const deleteTodo_resolver
    : appsync.CfnResolver
     = 
    new appsync.CfnResolver(this,'deleteTodo_resolver',{
            apiId: step27APanacloudCliDdb_appsync.attrApiId,
            typeName: "Mutation",
            fieldName: "deleteTodo",
            dataSourceName: ds_step27APanacloudCliDdb_deleteTodo.name,
        })
    ;

    deleteTodo_resolver.node.addDependency(step27APanacloudCliDdb_schema);
    deleteTodo_resolver.node.addDependency(ds_step27APanacloudCliDdb_deleteTodo);


    this.api_url = step27APanacloudCliDdb_appsync.attrGraphQlUrl;
    this.api_key = step27APanacloudCliDdb_apiKey.attrApiKey;
    new CfnOutput(this, props?.prod?props.prod+"APIGraphQlURL":"APIGraphQlURL", {
    value: step27APanacloudCliDdb_appsync.attrGraphQlUrl,
    description: 'The URL of the GraphQl API',
    exportName: props?.prod?props.prod+'graphQlAPIURL':'graphQlAPIURL',

  });
    new CfnOutput(this, props?.prod?props.prod+"GraphQLAPIKey":"GraphQLAPIKey", {
    value: step27APanacloudCliDdb_apiKey.attrApiKey || '',
    description: 'The API Key of the GraphQl API',
    exportName: props?.prod?props.prod+'graphQlAPIKey':'graphQlAPIKey',
  });
    }
}
