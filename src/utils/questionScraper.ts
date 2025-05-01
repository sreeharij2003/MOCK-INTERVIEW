
// This file would ideally contain actual web scraping logic
// However, for demonstration and ethical purposes, we'll simulate scraping
// by providing predefined questions for each category

import { TechnicalCategory } from "@/data/technicalQuestions";

// Simulated database of questions
const questionDatabase = {
  "dbms": [
    "What is ACID in database transactions?",
    "Explain normalization and its different forms.",
    "What is the difference between a primary key and a foreign key?",
    "Explain the concept of indexing in DBMS.",
    "What is a deadlock in DBMS and how can it be prevented?",
    "Describe the difference between OLAP and OLTP systems.",
    "What are the different types of joins in SQL?",
    "Explain the CAP theorem in distributed database systems.",
    "What is denormalization and when would you use it?",
    "Describe the ACID properties with examples."
  ],
  "os": [
    "What is a process and how is it different from a thread?",
    "Explain the concept of virtual memory in operating systems.",
    "What is a deadlock and what are the conditions for a deadlock to occur?",
    "Describe the different CPU scheduling algorithms.",
    "What is paging and segmentation in memory management?",
    "Explain the producer-consumer problem and its solutions.",
    "What are semaphores and mutexes?",
    "Describe the different types of process scheduling.",
    "What is thrashing in operating systems?",
    "Explain the concept of a file system in OS."
  ],
  "data-structures": [
    "Explain the time complexity of common operations in arrays, linked lists, and hash tables.",
    "What is a binary search tree and how does it differ from a balanced tree?",
    "Explain the concept of dynamic programming with an example.",
    "What is the difference between BFS and DFS traversal algorithms?",
    "Describe how a hash table works and how collisions are resolved.",
    "What is the time complexity of quicksort, and in what scenarios might it perform poorly?",
    "Explain the concept of a heap data structure and its applications.",
    "What is a graph data structure and what are its common representations?",
    "Describe the concept of a trie and its applications.",
    "What is the difference between a stack and a queue?"
  ],
  "computer-networks": [
    "Explain the OSI model and its layers.",
    "What is TCP/IP and how does it differ from the OSI model?",
    "Describe the three-way handshake in TCP connection establishment.",
    "What is the difference between HTTP and HTTPS?",
    "Explain the concept of subnetting in IP networks.",
    "What is DNS and how does it work?",
    "Describe the difference between a router and a switch.",
    "What is NAT (Network Address Translation) and why is it used?",
    "Explain the concept of CIDR (Classless Inter-Domain Routing).",
    "What is a firewall and what are its types?"
  ]
};

// HR questions database
const hrQuestions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Why do you want to work for this company?",
  "Where do you see yourself in 5 years?",
  "Describe a challenging situation and how you handled it.",
  "Why should we hire you?",
  "What is your greatest professional achievement?",
  "How do you handle stress and pressure?",
  "Describe your leadership style.",
  "Do you have any questions for us?"
];

// Simulated web scraping function
export const scrapeQuestions = async (category: TechnicalCategory): Promise<string[]> => {
  console.log(`Simulating scraping questions for ${category}...`);
  
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return questions based on category
  return questionDatabase[category] || [];
};

// Function to get HR questions
export const getHRQuestions = async (): Promise<string[]> => {
  console.log("Fetching HR questions...");
  
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return hrQuestions;
};

// Function to get random questions from a specific category
export const getRandomQuestions = (category: TechnicalCategory, count: number = 5): string[] => {
  const questions = questionDatabase[category] || [];
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to store user answers and provide feedback
export interface AnswerFeedback {
  strengths: string[];
  improvements: string[];
  overallScore: number; // 1-10
}

export const generateFeedback = (question: string, answer: string): AnswerFeedback => {
  // This would ideally use NLP or AI to analyze answers
  // For demonstration, we'll return simulated feedback
  
  const hasKeywords = answer.length > 50;
  const isWellStructured = answer.length > 100;
  const isComprehensive = answer.length > 200;
  
  const strengths = [];
  const improvements = [];
  
  if (hasKeywords) strengths.push("Good use of relevant terminology");
  else improvements.push("Try incorporating more domain-specific terms");
  
  if (isWellStructured) strengths.push("Well-structured answer");
  else improvements.push("Work on structuring your answer with clear points");
  
  if (isComprehensive) strengths.push("Comprehensive coverage of the topic");
  else improvements.push("Consider expanding your answer with more details");
  
  // Calculate a simple score based on answer characteristics
  let score = 5; // Base score
  if (hasKeywords) score += 1;
  if (isWellStructured) score += 2;
  if (isComprehensive) score += 2;
  
  return {
    strengths: strengths.length ? strengths : ["You attempted the question"],
    improvements: improvements.length ? improvements : ["Keep practicing!"],
    overallScore: score
  };
};
