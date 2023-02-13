import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ShellStep } from "@aws-cdk/pipelines";
import { AutomationDemoStage } from './automation-demo-stage';

export class AutomationDemoPipelineStack extends Stack {


  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

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
