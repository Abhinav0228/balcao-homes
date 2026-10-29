/** The itinerary from first visit to keys, for a typical restored house. */
export const PROCESS: { when: string; steps: { what: string; time: string }[] }[] = [
  { when: 'The first weekend', steps: [
    { what: 'Visit three or four houses with us', time: 'Saturday' },
    { what: 'Walk the one you like with our surveyor', time: 'Sunday' },
  ] },
  { when: 'The first month', steps: [
    { what: 'Read the title file and the survey', time: '1 week' },
    { what: 'Agree the price and the restoration plan', time: '1 week' },
    { what: 'Sign the agreement and pay 10%', time: '1 day' },
  ] },
  { when: 'The months after', steps: [
    { what: 'Roof, timber and tiles', time: '2 months' },
    { what: 'Laterite, lime and shell windows', time: '3 months' },
    { what: 'Wiring, water and bathrooms', time: '2 months' },
    { what: 'Your walk-through and the sale deed', time: '1 week' },
  ] },
];
export const PROCESS_RESULT = { what: 'Your keys and the photo file', time: '9 months' };
