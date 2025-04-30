
// This would ideally be populated from a database or API
// In a production app, these would be fetched from your backend after web scraping

export type TechnicalCategory = 'dbms' | 'os' | 'data-structures' | 'computer-networks';

export interface TechnicalQuestion {
  id: string;
  category: TechnicalCategory;
  question: string;
  hints?: string[];
  idealAnswer?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const technicalQuestions: TechnicalQuestion[] = [
  // DBMS Questions
  {
    id: 'dbms-1',
    category: 'dbms',
    question: 'What is a database transaction? Explain ACID properties.',
    idealAnswer: 'A transaction is a sequence of operations performed as a single logical unit of work. ACID stands for Atomicity (all or nothing), Consistency (maintains valid state), Isolation (transactions don\'t interfere), and Durability (committed changes are permanent).',
    difficulty: 'medium'
  },
  {
    id: 'dbms-2',
    category: 'dbms',
    question: 'Explain the difference between normalization and denormalization.',
    idealAnswer: 'Normalization organizes data to reduce redundancy and improve data integrity by dividing large tables into smaller ones. Denormalization adds redundancy to improve read performance.',
    difficulty: 'medium'
  },
  {
    id: 'dbms-3',
    category: 'dbms',
    question: 'What is the difference between primary key and unique key?',
    idealAnswer: 'Both enforce uniqueness, but a primary key cannot be NULL while a unique key can have one NULL value. A table can have only one primary key but multiple unique keys.',
    difficulty: 'easy'
  },
  {
    id: 'dbms-4',
    category: 'dbms',
    question: 'Explain indexing and its benefits in databases.',
    idealAnswer: 'Indexing creates data structures that improve the speed of data retrieval operations. Benefits include faster queries, improved sorting and grouping operations, and more efficient joins.',
    difficulty: 'medium'
  },
  {
    id: 'dbms-5',
    category: 'dbms',
    question: 'What is a deadlock in a database? How can it be prevented?',
    idealAnswer: 'A deadlock occurs when two or more transactions wait indefinitely for each other to release locks. Prevention methods include timeout mechanisms, deadlock detection algorithms, and proper transaction isolation levels.',
    difficulty: 'hard'
  },
  {
    id: 'dbms-6',
    category: 'dbms',
    question: 'Explain the concept of a stored procedure.',
    idealAnswer: 'A stored procedure is a prepared SQL code that you can save and reuse. Benefits include improved performance, reduced network traffic, enhanced security through permissions, and code reusability.',
    difficulty: 'medium'
  },

  // Operating Systems Questions
  {
    id: 'os-1',
    category: 'os',
    question: 'What is a process and how is it different from a thread?',
    idealAnswer: 'A process is an instance of a program with its own memory space. A thread is a sequence of execution within a process that shares the process\'s resources. Processes are isolated while threads share memory and resources.',
    difficulty: 'medium'
  },
  {
    id: 'os-2',
    category: 'os',
    question: 'Explain virtual memory in operating systems.',
    idealAnswer: 'Virtual memory is a memory management technique that provides an idealized abstraction of the storage resources available to a program. It uses both RAM and disk space to give programs the impression of having contiguous address space.',
    difficulty: 'medium'
  },
  {
    id: 'os-3',
    category: 'os',
    question: 'What is the difference between preemptive and non-preemptive scheduling?',
    idealAnswer: 'In preemptive scheduling, the CPU can be taken from a process before it finishes execution. In non-preemptive scheduling, once a process starts, it runs until completion or it voluntarily gives up the CPU.',
    difficulty: 'medium'
  },
  {
    id: 'os-4',
    category: 'os',
    question: 'What is a deadlock in operating systems? Explain the four necessary conditions for a deadlock.',
    idealAnswer: 'A deadlock is a situation where processes are waiting for resources held by other waiting processes. The four necessary conditions are: mutual exclusion, hold and wait, no preemption, and circular wait.',
    difficulty: 'hard'
  },
  {
    id: 'os-5',
    category: 'os',
    question: 'What is a page fault and how is it handled?',
    idealAnswer: 'A page fault occurs when a program accesses a memory page that is mapped in the virtual address space, but not loaded in physical memory. The OS suspends the process, loads the required page, updates the page table, and resumes the process.',
    difficulty: 'hard'
  },
  {
    id: 'os-6',
    category: 'os',
    question: 'Explain the concept of thrashing in operating systems.',
    idealAnswer: 'Thrashing occurs when a system spends more time paging (swapping pages between memory and disk) than executing processes. It happens when the working set of a process exceeds the available physical memory, severely degrading system performance.',
    difficulty: 'hard'
  },

  // Data Structures Questions
  {
    id: 'ds-1',
    category: 'data-structures',
    question: 'What is the time complexity of searching, insertion, and deletion in a hash table in average and worst cases?',
    idealAnswer: 'Average case: O(1) for all operations. Worst case (with hash collisions): O(n) for all operations where n is the number of elements.',
    difficulty: 'medium'
  },
  {
    id: 'ds-2',
    category: 'data-structures',
    question: 'Compare arrays and linked lists. When would you use one over the other?',
    idealAnswer: 'Arrays offer constant time access by index and better cache locality, but fixed size and expensive insertions/deletions. Linked lists allow efficient insertions/deletions and dynamic size, but linear time access and higher memory overhead. Use arrays for random access and linked lists for frequent insertions/deletions.',
    difficulty: 'medium'
  },
  {
    id: 'ds-3',
    category: 'data-structures',
    question: 'Explain the difference between a stack and a queue.',
    idealAnswer: 'A stack follows LIFO (Last In, First Out) principle where elements are added and removed from the same end. A queue follows FIFO (First In, First Out) where elements are added at one end and removed from the other.',
    difficulty: 'easy'
  },
  {
    id: 'ds-4',
    category: 'data-structures',
    question: 'What is a binary search tree? What are its advantages?',
    idealAnswer: 'A binary search tree is a tree where each node has at most two children, with all left descendants less than the node and all right descendants greater. Advantages include efficient insertion, deletion, and lookup operations (O(log n) in balanced trees).',
    difficulty: 'medium'
  },
  {
    id: 'ds-5',
    category: 'data-structures',
    question: 'What are graph data structures? Compare BFS and DFS traversal algorithms.',
    idealAnswer: 'Graphs consist of vertices and edges connecting them. BFS (Breadth-First Search) explores all neighbors at the current depth before moving deeper, using a queue. DFS (Depth-First Search) explores as far as possible along each branch before backtracking, using a stack or recursion.',
    difficulty: 'hard'
  },
  {
    id: 'ds-6',
    category: 'data-structures',
    question: 'What is a heap data structure? Explain min-heap and max-heap.',
    idealAnswer: 'A heap is a complete binary tree where each node satisfies the heap property. In a min-heap, each parent node is less than or equal to its children (root is minimum). In a max-heap, each parent is greater than or equal to its children (root is maximum).',
    difficulty: 'medium'
  },

  // Computer Networks Questions
  {
    id: 'cn-1',
    category: 'computer-networks',
    question: 'Explain the OSI model and its layers.',
    idealAnswer: 'The OSI model has 7 layers: Physical (bit transmission), Data Link (frames, MAC), Network (packets, routing), Transport (end-to-end communication, TCP/UDP), Session (session establishment), Presentation (data translation), and Application (user interfaces).',
    difficulty: 'medium'
  },
  {
    id: 'cn-2',
    category: 'computer-networks',
    question: 'What is the difference between TCP and UDP?',
    idealAnswer: 'TCP (Transmission Control Protocol) is connection-oriented, reliable, ordered, and error-checked. UDP (User Datagram Protocol) is connectionless, unreliable (no retransmission), and has less overhead, making it faster for applications where some data loss is acceptable.',
    difficulty: 'medium'
  },
  {
    id: 'cn-3',
    category: 'computer-networks',
    question: 'What happens when you type a URL in a browser and press Enter?',
    idealAnswer: 'The browser checks DNS cache, performs DNS lookup to get IP, establishes TCP connection, sends HTTP/HTTPS request, server processes and responds, browser renders the page, including parsing HTML/CSS, executing JavaScript, etc.',
    difficulty: 'hard'
  },
  {
    id: 'cn-4',
    category: 'computer-networks',
    question: 'What is HTTPS and how does it differ from HTTP?',
    idealAnswer: 'HTTPS is HTTP with encryption using SSL/TLS. It provides authentication of websites, encrypted connection, and data integrity. HTTP transmits data in plaintext, making it vulnerable to eavesdropping and man-in-the-middle attacks.',
    difficulty: 'medium'
  },
  {
    id: 'cn-5',
    category: 'computer-networks',
    question: 'Explain the concept of subnetting.',
    idealAnswer: 'Subnetting divides a network into smaller logical subnetworks by extending the network portion of the IP address into the host portion. It improves security, reduces network congestion, and optimizes IP address allocation.',
    difficulty: 'hard'
  },
  {
    id: 'cn-6',
    category: 'computer-networks',
    question: 'What is ARP (Address Resolution Protocol) and what is its purpose?',
    idealAnswer: 'ARP is a protocol used to map IP network addresses to hardware (MAC) addresses. When a device wants to communicate with another on the local network, it uses ARP to discover the MAC address corresponding to the destination IP address.',
    difficulty: 'medium'
  }
];

// Function to get random questions from a specific category
export const getRandomQuestions = (category: TechnicalCategory, count: number = 5): TechnicalQuestion[] => {
  const categoryQuestions = technicalQuestions.filter(q => q.category === category);
  
  // Shuffle array using Fisher-Yates algorithm
  const shuffled = [...categoryQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return requested number of questions or all if count > available
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Categories for display in UI
export const technicalCategories = [
  { value: 'dbms', label: 'Database Management Systems (DBMS)' },
  { value: 'os', label: 'Operating Systems' },
  { value: 'data-structures', label: 'Data Structures & Algorithms' },
  { value: 'computer-networks', label: 'Computer Networks' }
];
