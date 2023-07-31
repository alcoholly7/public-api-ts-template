#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PublicApiTsTemplateStack } from '../lib/public-api-ts-template-stack';

export const stackName = "PublicAPITSTemplateStack"
export const functionName = "PublicAPITSTemplateFunction"

const app = new cdk.App();
new PublicApiTsTemplateStack(app, stackName, {
    functionName: functionName,
});