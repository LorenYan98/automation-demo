// import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';

import { AutomationDemoStage } from './automation-demo-stage';
import { Stack, StackProps }from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import {Repository} from "aws-cdk-lib/aws-codecommit";
// import codepipeline = require('aws-cdk-lib/aws-codepipeline')
import { Construct } from "constructs";

export class AutomationDemoPipelineStack extends Stack {


  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repo = Repository
                  .fromRepositoryName(this, "WorkshopRepo", "WorkshopRepo" );

    const pipeline = new CodePipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'MyServicePipeline',

       // How it will be built and synthesized
       synth: new ShellStep('Synth', {
         // Where the source can be found
         input: CodePipelineSource.gitHub('LorenYan98/automation-demo', 'main'),
         installCommands: ['npm i -g npm@latest'],
         // Install dependencies, build and run cdk synth
         commands: [
           'npm ci',
           'npm run build',
           'npx cdk synth'
         ],
       }),
    });

    // This is where we add the application stages
    pipeline.addStage(new AutomationDemoStage(this, 'PreProd', {
      env: { account: '466040009172', region: 'us-west-2' }
    }));
  }
  
}
