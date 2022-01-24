import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppsyncConstruct } from './AppsyncConstruct';
import { DynamoDBConstruct } from './DynamoDBConstruct';
import { AspectController } from '../editable_src/aspects/AspectController';
import { aws_lambda as lambda } from 'aws-cdk-lib';

interface EnvProps {
  prod?: string;
}

export class Step27APanacloudCliDdbStack extends Stack {
  constructor(scope: Construct, id: string, props?: EnvProps) {
    super(scope, id);

    const step27APanacloudCliDdb_table: DynamoDBConstruct =
      new DynamoDBConstruct(this, 'step27APanacloudCliDdbDynamoDBConstruct', {
        prod: props?.prod,
      });
    const step27APanacloudCliDdb_lambdaLayer: lambda.LayerVersion =
      new lambda.LayerVersion(this, 'step27APanacloudCliDdbLambdaLayer', {
        code: lambda.Code.fromAsset('editable_src/lambdaLayer'),
      });
    const step27APanacloudCliDdb_mock_lambdaLayer: lambda.LayerVersion =
      new lambda.LayerVersion(this, 'step27APanacloudCliDdbMockLambdaLayer', {
        code: lambda.Code.fromAsset('mock_lambda_layer'),
      });
    const step27APanacloudCliDdb_lambdaFn_getTodos: lambda.Function =
      new lambda.Function(this, 'step27APanacloudCliDdbLambdagetTodos', {
        functionName: props?.prod
          ? props?.prod + '-step27APanacloudCliDdbLambdagetTodos'
          : 'step27APanacloudCliDdbLambdagetTodos',
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset('mock_lambda/getTodos'),
        layers: [step27APanacloudCliDdb_mock_lambdaLayer],

        environment: {
          TableName: step27APanacloudCliDdb_table.table.tableName,
        },
      });
    const step27APanacloudCliDdb_lambdaFn_addTodo: lambda.Function =
      new lambda.Function(this, 'step27APanacloudCliDdbLambdaaddTodo', {
        functionName: props?.prod
          ? props?.prod + '-step27APanacloudCliDdbLambdaaddTodo'
          : 'step27APanacloudCliDdbLambdaaddTodo',
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset('mock_lambda/addTodo'),
        layers: [step27APanacloudCliDdb_mock_lambdaLayer],

        environment: {
          TableName: step27APanacloudCliDdb_table.table.tableName,
        },
      });
    const step27APanacloudCliDdb_lambdaFn_deleteTodo: lambda.Function =
      new lambda.Function(this, 'step27APanacloudCliDdbLambdadeleteTodo', {
        functionName: props?.prod
          ? props?.prod + '-step27APanacloudCliDdbLambdadeleteTodo'
          : 'step27APanacloudCliDdbLambdadeleteTodo',
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset('mock_lambda/deleteTodo'),
        layers: [step27APanacloudCliDdb_mock_lambdaLayer],

        environment: {
          TableName: step27APanacloudCliDdb_table.table.tableName,
        },
      });
    step27APanacloudCliDdb_table.table.grantFullAccess(
      step27APanacloudCliDdb_lambdaFn_getTodos
    );
    step27APanacloudCliDdb_table.table.grantFullAccess(
      step27APanacloudCliDdb_lambdaFn_addTodo
    );
    step27APanacloudCliDdb_table.table.grantFullAccess(
      step27APanacloudCliDdb_lambdaFn_deleteTodo
    );

    const step27APanacloudCliDdb: AppsyncConstruct = new AppsyncConstruct(
      this,
      'step27APanacloudCliDdbAppsyncConstruct',
      {
        step27APanacloudCliDdb_lambdaFn_getTodosArn:
          step27APanacloudCliDdb_lambdaFn_getTodos.functionArn,
        step27APanacloudCliDdb_lambdaFn_addTodoArn:
          step27APanacloudCliDdb_lambdaFn_addTodo.functionArn,
        step27APanacloudCliDdb_lambdaFn_deleteTodoArn:
          step27APanacloudCliDdb_lambdaFn_deleteTodo.functionArn,
        prod: props?.prod,
      }
    );
    new AspectController(this, props?.prod);
  }
}
