import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as ssm from '@aws-cdk/aws-ssm';

export class KotoshiNoAnimeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const channelAccessToken = ssm.StringParameter.fromStringParameterAttributes(this, 'channel-access-token', {
      parameterName: 'kotoshinoanime-channel-access-token',
    }).stringValue;

    const channelSecret = ssm.StringParameter.fromStringParameterAttributes(this, 'channel-secret', {
      parameterName: 'kotoshinoanime-channel-secret',
    }).stringValue;

    const bot = new lambda.DockerImageFunction(this, 'bot', {
      code: lambda.DockerImageCode.fromImageAsset('./lambda/bot'),
      environment: {
        CHANNEL_ACCESS_TOKEN: channelAccessToken,
        CHANNEL_SECRET: channelSecret,
      },
    });

    const api = new apigateway.RestApi(this, 'api');
    api.root.addMethod('POST', new apigateway.LambdaIntegration(bot));
  }
}
