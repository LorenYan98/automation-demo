import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, Step } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

export class AutomationDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'CCPipeline', {
      pipelineName: 'TCCPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('LorenYan98/automation-demo', 'main'), //Remember to change 
        installCommands: ['npm i -g npm@latest'],
        commands: ['npm ci', 
                   'npm run build', 
                   'npx cdk synth']
      })
    });
  }
}
