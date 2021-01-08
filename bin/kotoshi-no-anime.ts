#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { KotoshiNoAnimeStack } from '../lib/kotoshi-no-anime-stack';

const app = new cdk.App();
new KotoshiNoAnimeStack(app, 'KotoshiNoAnimeStack');
