import * as cdk from "aws-cdk-lib";
import { Step27BPanacloudCliNeptuneStack } from "../lib/step_27_b_panacloud_cli_neptune-stack";
const app: cdk.App = new cdk.App();
const deployEnv = process.env.STAGE;
const stack = new Step27BPanacloudCliNeptuneStack(
  app,
  deployEnv
    ? deployEnv + "-Step27BPanacloudCliNeptuneStack"
    : "Step27BPanacloudCliNeptuneStack",
  { prod: deployEnv }
);
