// * The Function will shuffle order of elements in the array randomly. The value '0.5' signify the range shift '-0.5 to 0.5'
export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);
