#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AutomationDemoStack } from '../lib/automation-demo-stack';

const app = new cdk.App();
new AutomationDemoStack(app, 'AutomationDemoStack', {
  env: { 
    account: "466040009172", 
    region: "us-west-2",
    
  },
});