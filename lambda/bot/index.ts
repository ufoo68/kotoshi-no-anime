import axios from 'axios';
import * as Line from '@line/bot-sdk';
import * as Types from '@line/bot-sdk/lib/types';
import * as Lambda from 'aws-lambda';

interface AnimeData {
  id: string
  title: string
};

const channelAccessToken = process.env.ACCESS_TOKEN!;
const channelSecret = process.env.CHANNEL_SECRET!;

const config: Line.ClientConfig = {
  channelAccessToken,
  channelSecret,
};

const client = new Line.Client(config);

const getAnimeDatas = async (): Promise<AnimeData[]> => {
  const res = await axios.get('http://api.moemoe.tokyo/anime/v1/master/2021');
  return res.data;
}

const eventHandler = async (event: Types.MessageEvent): Promise<any> => {
  if (event.type !== 'message' || event.message.type !== 'text' || !event.source.userId) {
    return null;
  }
  const animeDatas = await getAnimeDatas();
  return client.replyMessage(event.replyToken, animeDatas.map(animeData => ({ type: 'text', text: animeData.title })));
};

export const handler = async (proxyEevent: Lambda.APIGatewayEvent) => {
  const body: Line.WebhookRequestBody = JSON.parse(proxyEevent.body!)
  await Promise
    .all(body.events.map(async event => eventHandler(event as Types.MessageEvent)))
    .catch(err => {
      console.error(err.Message);
      return {
        statusCode: 500,
        body: 'Error'
      };
    });
  return {
    statusCode: 200,
    body: 'OK'
  };
};