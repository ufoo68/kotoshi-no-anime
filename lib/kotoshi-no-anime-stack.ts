import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';

export class KotoshiNoAnimeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bot = new lambda.DockerImageFunction(this, 'bot', {
      code: lambda.DockerImageCode.fromImageAsset('./lambda/bot'),
    });

    const api = new apigateway.RestApi(this, 'api');
    api.root.addMethod('POST', new apigateway.LambdaIntegration(bot));
  }
}
