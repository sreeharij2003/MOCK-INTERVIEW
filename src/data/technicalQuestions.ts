
// This file would normally define the technical questions structure
export type TechnicalCategory = "dbms" | "os" | "data-structures" | "computer-networks";

export interface TechnicalQuestion {
  id: string;
  category: TechnicalCategory;
  question: string;
  difficulty: "easy" | "medium" | "hard";
}

export const technicalCategories = [
  { value: 'dbms', label: 'Database Management Systems (DBMS)' },
  { value: 'os', label: 'Operating Systems' },
  { value: 'data-structures', label: 'Data Structures & Algorithms' },
  { value: 'computer-networks', label: 'Computer Networks' }
];

// We'll use the questionScraper utility to get actual questions
import { scrapeQuestions } from "@/utils/questionScraper";

// Function to get random questions with proper types
export const getRandomQuestions = async (
  category: TechnicalCategory, 
  count: number = 5
): Promise<TechnicalQuestion[]> => {
  // Get questions from our scraper
  const questions = await scrapeQuestions(category);
  
  // Shuffle and take requested count
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);
  
  // Transform into TechnicalQuestion objects
  return selected.map((question, index) => ({
    id: `${category}-${index}`,
    category,
    question,
    difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)] as "easy" | "medium" | "hard"
  }));
};
