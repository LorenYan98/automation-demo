import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { AutomationDemoStack } from './automation-demo-stack';

/**
 * Deployable unit of web service app
 */
export class AutomationDemoStage extends Stage {
  public readonly urlOutput: CfnOutput;
  
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new AutomationDemoStack(this, 'WebService');
    
    // Expose CdkpipelinesDemoStack's output one level higher
    this.urlOutput = service.urlOutput;
  }
}