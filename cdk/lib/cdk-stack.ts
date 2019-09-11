import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import path = require('path');

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, 'pathing-lambda', {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'find-path.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../lambda')),
});
  }
}
