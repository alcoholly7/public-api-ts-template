import {
    LambdaIntegration,
    MethodLoggingLevel,
    RestApi,
    EndpointType,
} from "aws-cdk-lib/aws-apigateway"
import { PolicyStatement } from "aws-cdk-lib/aws-iam"
import * as lambda from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { SecurityGroup, Subnet, Vpc } from "aws-cdk-lib/aws-ec2"

import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"

interface LambdaApiStackProps extends StackProps {
    functionName: string
}

export class PublicApiTsTemplateStack extends Stack {
    private restApi: RestApi
    private lambdaFunction: NodejsFunction

    constructor(scope: Construct, id: string, props: LambdaApiStackProps) {
        super(scope, id, props)


        this.restApi = new RestApi(this, this.stackName + "RestApi", {
            deployOptions: {
                stageName: "beta",
                metricsEnabled: true,
                loggingLevel: MethodLoggingLevel.INFO,
                dataTraceEnabled: true,
            },
            endpointTypes: [EndpointType.REGIONAL],
        })

        const lambdaPolicy = new PolicyStatement()

        const vpc = Vpc.fromVpcAttributes(this, "ExistingVpc", {
            vpcId: "vpc-xxx",
            availabilityZones: ["ap-southeast-2a"],
        })
        const securityGroup = SecurityGroup.fromSecurityGroupId(
            this,
            "FunctionSecurityGroup",
            "sg-xxx"
        )
        const subnets = [
            "subnet-xxx"
        ].map((subnetId) => Subnet.fromSubnetId(this, subnetId, subnetId))

        this.lambdaFunction = new NodejsFunction(this, props.functionName, {
            runtime: lambda.Runtime.NODEJS_18_X,
            functionName: props.functionName,
            handler: "handler",
            entry: "src/handler.ts",
            initialPolicy: [lambdaPolicy],
            vpc: vpc,
            vpcSubnets: { subnets },
            securityGroups: [securityGroup],
        })

        this.restApi.root.addMethod("GET", new LambdaIntegration(this.lambdaFunction, {}))
    }
}
