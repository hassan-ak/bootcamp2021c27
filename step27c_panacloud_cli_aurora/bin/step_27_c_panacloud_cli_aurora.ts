import * as cdk from "aws-cdk-lib";
import { Step27CPanacloudCliAuroraStack } from "../lib/step_27_c_panacloud_cli_aurora-stack";
const app: cdk.App = new cdk.App();
const deployEnv = process.env.STAGE;
const stack = new Step27CPanacloudCliAuroraStack(
  app,
  deployEnv
    ? deployEnv + "-Step27CPanacloudCliAuroraStack"
    : "Step27CPanacloudCliAuroraStack",
  { prod: deployEnv }
);
