import * as cdk from "aws-cdk-lib" 
import { Step27APanacloudCliDdbStack } from "../lib/step_27_a_panacloud_cli_ddb-stack";
 const app
: cdk.App
 = 
new cdk.App()
;
 const deployEnv
 = 
process.env.STAGE
;
 const stack
 = 
new Step27APanacloudCliDdbStack(app, deployEnv ? deployEnv + "-Step27APanacloudCliDdbStack" : "Step27APanacloudCliDdbStack", {prod: deployEnv});
;
