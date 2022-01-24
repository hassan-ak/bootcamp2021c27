import { Tags } from "aws-cdk-lib";
import { aws_neptune as neptune } from "aws-cdk-lib";
import { aws_ec2 as ec2 } from "aws-cdk-lib";
import { Construct } from "constructs";
interface NeptuneProps {
  prod?: string;
}

export class VpcNeptuneConstruct extends Construct {
  public VPCRef: ec2.Vpc;
  public SGRef: ec2.SecurityGroup;
  public neptuneReaderEndpoint: string;

  constructor(scope: Construct, id: string, props?: NeptuneProps) {
    super(scope, id);

    const step27BPanacloudCliNeptune_vpc = new ec2.Vpc(
      this,
      "step27BPanacloudCliNeptuneVpc",
      {
        subnetConfiguration: [
          {
            cidrMask: 24,
            name: "Ingress",
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          },
        ],
      }
    );
    const step27BPanacloudCliNeptune_sg = new ec2.SecurityGroup(
      this,
      "step27BPanacloudCliNeptuneSecurityGroup",
      {
        vpc: step27BPanacloudCliNeptune_vpc,
        allowAllOutbound: true,
        description: "step27BPanacloudCliNeptune security group",
        securityGroupName: props?.prod
          ? props?.prod + "-step27BPanacloudCliNeptuneSecurityGroup"
          : "step27BPanacloudCliNeptuneSecurityGroup",
      }
    );

    Tags.of(step27BPanacloudCliNeptune_sg).add(
      "Name",
      "step27BPanacloudCliNeptuneSecurityGroup"
    );

    step27BPanacloudCliNeptune_sg.node.addDependency(
      step27BPanacloudCliNeptune_vpc
    );

    step27BPanacloudCliNeptune_sg.addIngressRule(
      step27BPanacloudCliNeptune_sg,
      ec2.Port.tcp(8182),
      "step27BPanacloudCliNeptuneRule"
    );

    const step27BPanacloudCliNeptune_neptuneSubnet =
      new neptune.CfnDBSubnetGroup(
        this,
        "step 27 b panacloud cli neptune-neptune-subnet-group",
        {
          dbSubnetGroupDescription: "step 27 b panacloud cli neptune Subnet",
          subnetIds: step27BPanacloudCliNeptune_vpc.selectSubnets({
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          }).subnetIds,
          dbSubnetGroupName: props?.prod
            ? props?.prod +
              "-step 27 b panacloud cli neptune-neptune-subnet-group"
            : "step 27 b panacloud cli neptune-neptune-subnet-group",
        }
      );
    step27BPanacloudCliNeptune_neptuneSubnet.node.addDependency(
      step27BPanacloudCliNeptune_vpc
    );
    step27BPanacloudCliNeptune_neptuneSubnet.node.addDependency(
      step27BPanacloudCliNeptune_sg
    );
    const step27BPanacloudCliNeptune_neptuneCluster = new neptune.CfnDBCluster(
      this,
      "step27BPanacloudCliNeptuneCluster",
      {
        dbSubnetGroupName:
          step27BPanacloudCliNeptune_neptuneSubnet.dbSubnetGroupName,
        dbClusterIdentifier: props?.prod
          ? props?.prod + "-step27BPanacloudCliNeptuneCluster"
          : "step27BPanacloudCliNeptuneCluster",
        vpcSecurityGroupIds: [step27BPanacloudCliNeptune_sg.securityGroupId],
      }
    );
    step27BPanacloudCliNeptune_neptuneCluster.addDependsOn(
      step27BPanacloudCliNeptune_neptuneSubnet
    );

    step27BPanacloudCliNeptune_neptuneCluster.node.addDependency(
      step27BPanacloudCliNeptune_vpc
    );

    const step27BPanacloudCliNeptune_neptuneInstance =
      new neptune.CfnDBInstance(this, "step27BPanacloudCliNeptuneinstance", {
        dbInstanceClass: "db.t3.medium",
        dbClusterIdentifier:
          step27BPanacloudCliNeptune_neptuneCluster.dbClusterIdentifier,
        availabilityZone: step27BPanacloudCliNeptune_vpc.availabilityZones[0],
      });
    step27BPanacloudCliNeptune_neptuneInstance.addDependsOn(
      step27BPanacloudCliNeptune_neptuneCluster
    );

    step27BPanacloudCliNeptune_neptuneInstance.node.addDependency(
      step27BPanacloudCliNeptune_vpc
    );
    step27BPanacloudCliNeptune_neptuneInstance.node.addDependency(
      step27BPanacloudCliNeptune_neptuneSubnet
    );

    this.VPCRef = step27BPanacloudCliNeptune_vpc;
    this.SGRef = step27BPanacloudCliNeptune_sg;
    this.neptuneReaderEndpoint =
      step27BPanacloudCliNeptune_neptuneCluster.attrReadEndpoint;
  }
}
