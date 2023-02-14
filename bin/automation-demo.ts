#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { AutomationDemoPipelineStack } from '../lib/automation-demo-pipeline-stack';

const app = new App();
new AutomationDemoPipelineStack(app, 'AutomationDemoPipelineStack', {
  env:{
    account: "466040009172", 
    region: "us-west-2",
  }
});

app.synth();