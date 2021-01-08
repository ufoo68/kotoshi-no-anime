import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as KotoshiNoAnime from '../lib/kotoshi-no-anime-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new KotoshiNoAnime.KotoshiNoAnimeStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
