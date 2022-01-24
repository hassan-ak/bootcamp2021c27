import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AppsyncConstruct } from "./AppsyncConstruct";
import { VpcNeptuneConstruct } from "./VpcNeptuneConstruct";
import { AspectController } from "../editable_src/aspects/AspectController";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_ec2 as ec2 } from "aws-cdk-lib";

interface EnvProps {
  prod?: string;
}

export class Step27BPanacloudCliNeptuneStack extends Stack {
  constructor(scope: Construct, id: string, props?: EnvProps) {
    super(scope, id);

    const step27BPanacloudCliNeptune_neptunedb: VpcNeptuneConstruct =
      new VpcNeptuneConstruct(
        this,
        "step27BPanacloudCliNeptuneVpcNeptuneConstruct",
        {
          prod: props?.prod,
        }
      );
    const step27BPanacloudCliNeptune_lambdaLayer: lambda.LayerVersion =
      new lambda.LayerVersion(this, "step27BPanacloudCliNeptuneLambdaLayer", {
        code: lambda.Code.fromAsset("editable_src/lambdaLayer"),
      });
    const step27BPanacloudCliNeptune_mock_lambdaLayer: lambda.LayerVersion =
      new lambda.LayerVersion(
        this,
        "step27BPanacloudCliNeptuneMockLambdaLayer",
        {
          code: lambda.Code.fromAsset("mock_lambda_layer"),
        }
      );
    const step27BPanacloudCliNeptune_lambdaFn_getTodos: lambda.Function =
      new lambda.Function(this, "step27BPanacloudCliNeptuneLambdagetTodos", {
        functionName: props?.prod
          ? props?.prod + "-step27BPanacloudCliNeptuneLambdagetTodos"
          : "step27BPanacloudCliNeptuneLambdagetTodos",
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("mock_lambda/getTodos"),
        layers: [step27BPanacloudCliNeptune_mock_lambdaLayer],

        vpc: step27BPanacloudCliNeptune_neptunedb.VPCRef,
        securityGroups: [step27BPanacloudCliNeptune_neptunedb.SGRef],
        environment: {
          NEPTUNE_ENDPOINT:
            step27BPanacloudCliNeptune_neptunedb.neptuneReaderEndpoint,
        },
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      });
    const step27BPanacloudCliNeptune_lambdaFn_addTodo: lambda.Function =
      new lambda.Function(this, "step27BPanacloudCliNeptuneLambdaaddTodo", {
        functionName: props?.prod
          ? props?.prod + "-step27BPanacloudCliNeptuneLambdaaddTodo"
          : "step27BPanacloudCliNeptuneLambdaaddTodo",
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("mock_lambda/addTodo"),
        layers: [step27BPanacloudCliNeptune_mock_lambdaLayer],

        vpc: step27BPanacloudCliNeptune_neptunedb.VPCRef,
        securityGroups: [step27BPanacloudCliNeptune_neptunedb.SGRef],
        environment: {
          NEPTUNE_ENDPOINT:
            step27BPanacloudCliNeptune_neptunedb.neptuneReaderEndpoint,
        },
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      });
    const step27BPanacloudCliNeptune_lambdaFn_deleteTodo: lambda.Function =
      new lambda.Function(this, "step27BPanacloudCliNeptuneLambdadeleteTodo", {
        functionName: props?.prod
          ? props?.prod + "-step27BPanacloudCliNeptuneLambdadeleteTodo"
          : "step27BPanacloudCliNeptuneLambdadeleteTodo",
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("mock_lambda/deleteTodo"),
        layers: [step27BPanacloudCliNeptune_mock_lambdaLayer],

        vpc: step27BPanacloudCliNeptune_neptunedb.VPCRef,
        securityGroups: [step27BPanacloudCliNeptune_neptunedb.SGRef],
        environment: {
          NEPTUNE_ENDPOINT:
            step27BPanacloudCliNeptune_neptunedb.neptuneReaderEndpoint,
        },
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      });
    const step27BPanacloudCliNeptune: AppsyncConstruct = new AppsyncConstruct(
      this,
      "step27BPanacloudCliNeptuneAppsyncConstruct",
      {
        step27BPanacloudCliNeptune_lambdaFn_getTodosArn:
          step27BPanacloudCliNeptune_lambdaFn_getTodos.functionArn,
        step27BPanacloudCliNeptune_lambdaFn_addTodoArn:
          step27BPanacloudCliNeptune_lambdaFn_addTodo.functionArn,
        step27BPanacloudCliNeptune_lambdaFn_deleteTodoArn:
          step27BPanacloudCliNeptune_lambdaFn_deleteTodo.functionArn,
        prod: props?.prod,
      }
    );
    new AspectController(this, props?.prod);
  }
}
