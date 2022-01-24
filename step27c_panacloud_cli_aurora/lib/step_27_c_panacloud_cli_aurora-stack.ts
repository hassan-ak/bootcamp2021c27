import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AppsyncConstruct } from "./AppsyncConstruct";
import { AuroraDBConstruct } from "./AuroraDBConstruct";
import { AspectController } from "../editable_src/aspects/AspectController";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_ec2 as ec2 } from "aws-cdk-lib";

interface EnvProps {
  prod?: string;
}

export class Step27CPanacloudCliAuroraStack extends Stack {
  constructor(scope: Construct, id: string, props?: EnvProps) {
    super(scope, id);

    const step27CPanacloudCliAurora_auroradb: AuroraDBConstruct =
      new AuroraDBConstruct(this, "AuroraDBConstruct", { prod: props?.prod });
    const step27CPanacloudCliAurora_lambdaLayer: lambda.LayerVersion =
      new lambda.LayerVersion(this, "step27CPanacloudCliAuroraLambdaLayer", {
        code: lambda.Code.fromAsset("editable_src/lambdaLayer"),
      });
    const step27CPanacloudCliAurora_mock_lambdaLayer: lambda.LayerVersion =
      new lambda.LayerVersion(
        this,
        "step27CPanacloudCliAuroraMockLambdaLayer",
        {
          code: lambda.Code.fromAsset("mock_lambda_layer"),
        }
      );
    const step27CPanacloudCliAurora_lambdaFn_getTodos: lambda.Function =
      new lambda.Function(this, "step27CPanacloudCliAuroraLambdagetTodos", {
        functionName: props?.prod
          ? props?.prod + "-step27CPanacloudCliAuroraLambdagetTodos"
          : "step27CPanacloudCliAuroraLambdagetTodos",
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("mock_lambda/getTodos"),
        layers: [step27CPanacloudCliAurora_mock_lambdaLayer],
        role: step27CPanacloudCliAurora_auroradb.serviceRole,
        vpc: step27CPanacloudCliAurora_auroradb.vpcRef,

        environment: {
          SECRET_ARN: step27CPanacloudCliAurora_auroradb.SECRET_ARN,
          CLUSTER_ARN: step27CPanacloudCliAurora_auroradb.CLUSTER_ARN,
          DB_NAME: step27CPanacloudCliAurora_auroradb.DB_NAME,
        },
      });
    step27CPanacloudCliAurora_auroradb.db_cluster.grantDataApiAccess(
      step27CPanacloudCliAurora_lambdaFn_getTodos
    );

    const step27CPanacloudCliAurora_lambdaFn_addTodo: lambda.Function =
      new lambda.Function(this, "step27CPanacloudCliAuroraLambdaaddTodo", {
        functionName: props?.prod
          ? props?.prod + "-step27CPanacloudCliAuroraLambdaaddTodo"
          : "step27CPanacloudCliAuroraLambdaaddTodo",
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("mock_lambda/addTodo"),
        layers: [step27CPanacloudCliAurora_mock_lambdaLayer],
        role: step27CPanacloudCliAurora_auroradb.serviceRole,
        vpc: step27CPanacloudCliAurora_auroradb.vpcRef,

        environment: {
          SECRET_ARN: step27CPanacloudCliAurora_auroradb.SECRET_ARN,
          CLUSTER_ARN: step27CPanacloudCliAurora_auroradb.CLUSTER_ARN,
          DB_NAME: step27CPanacloudCliAurora_auroradb.DB_NAME,
        },
      });
    step27CPanacloudCliAurora_auroradb.db_cluster.grantDataApiAccess(
      step27CPanacloudCliAurora_lambdaFn_addTodo
    );

    const step27CPanacloudCliAurora_lambdaFn_deleteTodo: lambda.Function =
      new lambda.Function(this, "step27CPanacloudCliAuroraLambdadeleteTodo", {
        functionName: props?.prod
          ? props?.prod + "-step27CPanacloudCliAuroraLambdadeleteTodo"
          : "step27CPanacloudCliAuroraLambdadeleteTodo",
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("mock_lambda/deleteTodo"),
        layers: [step27CPanacloudCliAurora_mock_lambdaLayer],
        role: step27CPanacloudCliAurora_auroradb.serviceRole,
        vpc: step27CPanacloudCliAurora_auroradb.vpcRef,

        environment: {
          SECRET_ARN: step27CPanacloudCliAurora_auroradb.SECRET_ARN,
          CLUSTER_ARN: step27CPanacloudCliAurora_auroradb.CLUSTER_ARN,
          DB_NAME: step27CPanacloudCliAurora_auroradb.DB_NAME,
        },
      });
    step27CPanacloudCliAurora_auroradb.db_cluster.grantDataApiAccess(
      step27CPanacloudCliAurora_lambdaFn_deleteTodo
    );

    const step27CPanacloudCliAurora: AppsyncConstruct = new AppsyncConstruct(
      this,
      "step27CPanacloudCliAuroraAppsyncConstruct",
      {
        step27CPanacloudCliAurora_lambdaFn_getTodosArn:
          step27CPanacloudCliAurora_lambdaFn_getTodos.functionArn,
        step27CPanacloudCliAurora_lambdaFn_addTodoArn:
          step27CPanacloudCliAurora_lambdaFn_addTodo.functionArn,
        step27CPanacloudCliAurora_lambdaFn_deleteTodoArn:
          step27CPanacloudCliAurora_lambdaFn_deleteTodo.functionArn,
        prod: props?.prod,
      }
    );
    new AspectController(this, props?.prod);
  }
}
