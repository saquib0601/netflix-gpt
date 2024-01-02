import OpenAI from 'openai';
import { OPENAI_KEY } from './constants';

const openAi = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export default openAi;