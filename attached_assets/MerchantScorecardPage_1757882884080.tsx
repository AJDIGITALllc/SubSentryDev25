import React from 'react';
import { Scorecard } from './Scorecard';

// In Next.js, fetch JSON at build time (getStaticProps) or on the server
// Here we just import demo JSON for illustration:
import data from '../scorecards/netflix.scorecard.json';

export default function MerchantScorecardPage() {
  // @ts-ignore - demo import path
  return <Scorecard data={data as any} />;
}
