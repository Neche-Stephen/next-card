'use server';
/**
 * @fileOverview This file defines a Genkit flow to assess the current demand for student accommodations
 * and automatically apply relevant discounts to selected accommodations.
 *
 * - assessDemandAndApplyDiscount - A function that initiates the demand assessment and discount application process.
 * - AssessDemandAndApplyDiscountInput - The input type for the assessDemandAndApplyDiscount function, including accommodation details.
 * - AssessDemandAndApplyDiscountOutput - The return type for the assessDemandAndApplyDiscount function, indicating potential discounts and reasons.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessDemandAndApplyDiscountInputSchema = z.object({
  accommodationType: z.string().describe('The type of accommodation (e.g., single room, shared apartment).'),
  basePrice: z.number().describe('The original price of the accommodation.'),
  occupancyRate: z.number().min(0).max(1).describe('The current occupancy rate of the accommodation (0 to 1).'),
  serviceList: z.array(z.string()).describe('List of available services (WiFi, laundry, cleaning, etc.)'),
});
export type AssessDemandAndApplyDiscountInput = z.infer<typeof AssessDemandAndApplyDiscountInputSchema>;

const AssessDemandAndApplyDiscountOutputSchema = z.object({
  discountPercentage: z.number().min(0).max(1).describe('The discount percentage to apply (0 to 1).'),
  discountReason: z.string().describe('The reason for the discount, based on demand assessment.'),
});
export type AssessDemandAndApplyDiscountOutput = z.infer<typeof AssessDemandAndApplyDiscountOutputSchema>;

export async function assessDemandAndApplyDiscount(
  input: AssessDemandAndApplyDiscountInput
): Promise<AssessDemandAndApplyDiscountOutput> {
  return assessDemandAndApplyDiscountFlow(input);
}

const assessDemandAndApplyDiscountPrompt = ai.definePrompt({
  name: 'assessDemandAndApplyDiscountPrompt',
  input: {schema: AssessDemandAndApplyDiscountInputSchema},
  output: {schema: AssessDemandAndApplyDiscountOutputSchema},
  prompt: `Based on the accommodation details, assess the current demand and suggest a discount if applicable.

Accommodation Type: {{{accommodationType}}}
Base Price: {{{basePrice}}}
Occupancy Rate: {{{occupancyRate}}}
Services: {{#each serviceList}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Consider these factors when determining the discount:
- Low occupancy rate indicates lower demand.
- Certain accommodation types might be more or less popular.
- Available services can influence demand.

Output a discount percentage between 0 and 1 (0 for no discount, 1 for a 100% discount) and a brief reason for the discount.

Ensure that the discountPercentage and discountReason are properly formatted and easy to parse.
`,
});

const assessDemandAndApplyDiscountFlow = ai.defineFlow(
  {
    name: 'assessDemandAndApplyDiscountFlow',
    inputSchema: AssessDemandAndApplyDiscountInputSchema,
    outputSchema: AssessDemandAndApplyDiscountOutputSchema,
  },
  async input => {
    const {output} = await assessDemandAndApplyDiscountPrompt(input);
    return output!;
  }
);
