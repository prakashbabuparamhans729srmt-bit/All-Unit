'use server';
/**
 * @fileOverview A flow for answering questions.
 *
 * - answerQuestion - A function that takes a question and returns an answer.
 * - AnswerQuestionInput - The input type for the answerQuestion function.
 * - AnswerQuestionOutput - The return type for the answerQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionInputSchema = z.object({
  question: z.string().describe('The question to answer.'),
});
export type AnswerQuestionInput = z.infer<typeof AnswerQuestionInputSchema>;

const AnswerQuestionOutputSchema = z.object({
  answer: z.string().describe("A comprehensive, well-structured answer to the user's question. Use markdown for formatting if needed (e.g., lists, bold text)."),
  sources: z.array(z.object({
    title: z.string().describe('The title of the source web page.'),
    url: z.string().url().describe('The full URL of the source web page.'),
  })).describe('A list of credible web sources used to formulate the answer. Provide at least 3-5 sources.'),
  relatedQuestions: z.array(z.string()).describe('A list of 3-4 relevant follow-up questions a user might ask.'),
});
export type AnswerQuestionOutput = z.infer<typeof AnswerQuestionOutputSchema>;

export async function answerQuestion(input: AnswerQuestionInput): Promise<AnswerQuestionOutput> {
  return answerQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionPrompt',
  input: {schema: AnswerQuestionInputSchema},
  output: {schema: AnswerQuestionOutputSchema},
  prompt: `You are an expert AI search assistant, similar to Perplexity. Your goal is to provide a comprehensive, accurate, and well-sourced answer to the user's question.

Here is the user's question:
"{{{question}}}"

Please perform the following steps:
1.  Provide a direct and thorough answer to the question. Structure the answer clearly, using markdown for formatting like lists, bold text, or headings if it improves readability.
2.  Identify and list at least 3-5 credible web sources that support your answer. For each source, provide its title and full URL.
3.  Suggest 3-4 relevant follow-up questions that the user might be interested in exploring next.

Return the entire response in the required JSON format. Do not add any extra commentary before or after the JSON output.`,
});

const answerQuestionFlow = ai.defineFlow(
  {
    name: 'answerQuestionFlow',
    inputSchema: AnswerQuestionInputSchema,
    outputSchema: AnswerQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
