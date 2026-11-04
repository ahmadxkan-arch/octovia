// Octovia - BSCS course data (Session 2023-27 and onward)
// University of Science and Technology, Bannu
// Course format: { code, title, credits, lab, prereq, topics }
// "lab" is the lab credit (null if no lab). "prereq" is null if none.

const semesters = [
  {
    number: 1,
    courses: [
      { code: "GE-111", title: "Functional English", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Vocabulary and grammar", "Reading and listening skills", "Effective communication", "Public speaking and presentations", "Professional writing"] },
      { code: "GE-112", title: "Natural Science (Applied Physics)", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Scientific method", "Matter and atomic structure", "Energy and laws of motion", "Cells and living things", "Pollution and global warming"] },
      { code: "GE-113", title: "Quantitative Reasoning-I", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Numerical literacy", "Sets, relations and functions", "Linear and quadratic equations", "Basic statistics", "Basic probability"] },
      { code: "GE-114", title: "Islamic Studies/Ethics", credits: "2(2-0)", lab: null, prereq: null,
        topics: ["Introduction to Islam", "Sirah of the Holy Prophet (PBUH)", "Islamic history and civilization", "Islamic jurisprudence", "Islam and the modern world"] },
      { code: "GE-115", title: "Applications of Information and Communication Technologies", credits: "2(2-0)", lab: "1(0-3)", prereq: null,
        topics: ["ICT components and scope", "Productivity tools (MS Office, Google Workspace)", "ICT in education and health", "Digital citizenship", "Ethics and plagiarism"] },
      { code: "CC-116", title: "Programming Fundamentals", credits: "3(3-0)", lab: "1(0-3)", prereq: null,
        topics: ["C programming basics", "Selection and loops", "Arrays and functions", "Pointers", "Structures and files"] },
      { code: "NC-117", title: "Mathematics-I (Non-Credit, for Pre-Medical)", credits: "Non-credit", lab: null, prereq: null,
        topics: ["Complex numbers", "Matrices and determinants", "Vectors", "Permutation, combination and probability", "Functions and graphs"] }
    ]
  },
  {
    number: 2,
    courses: [
      { code: "GE-121", title: "Expository Writing", credits: "3(3-0)", lab: null, prereq: "Functional English",
        topics: ["Writing process", "Essay structure", "Types of expository writing", "Citation and referencing", "Avoiding plagiarism"] },
      { code: "GE-122", title: "Quantitative Reasoning-II", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Logic and logical reasoning", "Truth tables and fallacies", "Mathematical modelling", "Regression and correlation", "Hypothesis testing"] },
      { code: "GE-123", title: "Ideology and Constitution of Pakistan", credits: "2(2-0)", lab: null, prereq: null,
        topics: ["Ideology of Pakistan", "Two-Nation Theory", "Constitution of Pakistan 1973", "Fundamental rights", "Constitutional amendments"] },
      { code: "MS-124", title: "Multivariable Calculus", credits: "3(3-0)", lab: null, prereq: "Calculus and Analytical Geometry",
        topics: ["Infinite series", "Vectors", "Limits and continuity", "Partial derivatives", "Multiple integrals"] },
      { code: "CC-125", title: "Object Oriented Programming", credits: "3(3-0)", lab: "1(0-3)", prereq: "Programming Fundamentals",
        topics: ["Classes and objects", "Constructors and destructors", "Operator overloading", "Inheritance", "Polymorphism"] },
      { code: "CC-126", title: "Digital Logic Design", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Number systems and binary codes", "Boolean algebra and logic gates", "K-map simplification", "Combinational circuits", "Flip-flops and sequential logic"] },
      { code: "NC-127", title: "Mathematics-II (Non-Credit, for Pre-Medical)", credits: "Non-credit", lab: null, prereq: null,
        topics: ["Functions and limits", "Differentiation", "Integration", "Differential equations", "Numerical methods"] }
    ]
  },
  {
    number: 3,
    courses: [
      { code: "GE-231", title: "Entrepreneurship", credits: "2(2-0)", lab: null, prereq: null,
        topics: ["Entrepreneurial process", "Opportunity recognition", "Marketing and sales", "Financial literacy", "Registering an enterprise in Pakistan"] },
      { code: "CC-232", title: "Data Base Systems", credits: "2(2-0)", lab: "1(0-3)", prereq: null,
        topics: ["Database development process", "ERD and relational model", "Normalization (1NF-3NF)", "Relational algebra", "SQL, stored procedures and triggers"] },
      { code: "GE-233", title: "Introduction to Management", credits: "2(2-0)", lab: null, prereq: null,
        topics: ["Financial management", "Working capital", "Cash and accounts receivable", "Risk and return (CAPM)", "Capital budgeting"] },
      { code: "GE-234", title: "Civics and Community Engagement", credits: "2(2-0)", lab: null, prereq: null,
        topics: ["Civics and citizenship", "State, government and civil society", "Rights and responsibilities", "Community engagement", "Diversity and social justice"] },
      { code: "MS-235", title: "Linear Algebra", credits: "3(3-0)", lab: null, prereq: "Calculus and Analytical Geometry",
        topics: ["Vector spaces", "Matrices and determinants", "Gaussian elimination", "Eigenvalues and eigenvectors", "Singular value decomposition"] },
      { code: "MS-236", title: "Statistics and Probability", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Central tendency and dispersion", "Counting techniques", "Bayes theorem", "Probability distributions", "Regression and correlation"] },
      { code: "MS-237", title: "Technical and Business Writing", credits: "3(3-0)", lab: null, prereq: "Functional English",
        topics: ["Technical writing process", "Business letter and memo", "Resume (CV)", "Report writing", "Interviews and meetings"] }
    ]
  },
  {
    number: 4,
    courses: [
      { code: "GE-241", title: "Arts and Humanities (Professional Practices)", credits: "2(2-0)", lab: null, prereq: null,
        topics: ["Professional ethics", "Ethical hacking", "Software law and cyber law", "Intellectual property", "Social responsibilities"] },
      { code: "CC-242", title: "Data Structures", credits: "3(3-0)", lab: "1(0-3)", prereq: "Object Oriented Programming",
        topics: ["Stacks and queues", "Linked lists", "Sorting algorithms", "Trees and heaps", "Graphs and hashing"] },
      { code: "CC-243", title: "Computer Organization and Assembly Language", credits: "2(2-0)", lab: "1(0-3)", prereq: null,
        topics: ["Data representation", "Intel 8088 architecture", "Addressing modes", "Jumps and bit manipulation", "Subroutines"] },
      { code: "DE-244", title: "Web Technologies", credits: "2(2-0)", lab: "1(0-3)", prereq: null,
        topics: ["Web basics", "HTML tags, links and images", "Tables and frames", "Style sheets (CSS)", "Forms and JavaScript"] },
      { code: "CC-245", title: "Operating Systems", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Process management", "Scheduling algorithms", "Deadlock", "Memory and virtual memory", "File system management"] },
      { code: "DC-246", title: "Theory of Automata", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Regular expressions", "NFA and DFA", "Grammars and derivations", "Parsing and ambiguity", "Push down automata"] }
    ]
  },
  {
    number: 5,
    courses: [
      { code: "CC-351", title: "Software Engineering", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Software process models", "Project management concepts", "Requirements analysis", "Design concepts and methods", "Software testing methods"] },
      { code: "DC-352", title: "Compiler Construction", credits: "3(3-0)", lab: null, prereq: "Theory of Automata",
        topics: ["Phases of a compiler", "Lexical analysis", "Syntax analysis", "Semantic analysis", "Intermediate code generation"] },
      { code: "CC-353", title: "Analysis of Algorithms", credits: "3(3-0)", lab: null, prereq: "Data Structures",
        topics: ["Asymptotic notations", "Recurrence relations", "Divide and conquer, greedy", "Dynamic programming", "Graph algorithms and complexity classes"] },
      { code: "DE-354", title: "Mobile Application Development-I", credits: "2(2-0)", lab: "1(0-3)", prereq: null,
        topics: ["Android Studio setup", "User interfaces and activities", "Activity lifecycle and storage", "Databases (SQLite, Firebase)", "Services, notifications and Play Store"] },
      { code: "DC-355", title: "Advance Database Management System", credits: "2(2-0)", lab: "1(0-3)", prereq: "Database Systems",
        topics: ["Advanced data models", "Transactions and concurrency", "Query processing and optimization", "Distributed databases", "MongoDB and NoSQL"] },
      { code: "ES-356", title: "Fundamentals of Economics", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Demand and supply", "Markets and competition", "National income", "Inflation", "International trade"] }
    ]
  },
  {
    number: 6,
    courses: [
      { code: "DE-361", title: "Advance Programming (Visual Programming)", credits: "2(2-0)", lab: "1(0-3)", prereq: "Object Oriented Programming",
        topics: ["Visual Studio and C# basics", "OOP with C#", "Exception handling", "Windows Forms GUI", "ADO.NET database access"] },
      { code: "CC-362", title: "Information Security", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Confidentiality, integrity, availability", "Authentication and protection models", "Encryption and digital signatures", "Policy and access control", "Privacy and risk assessment"] },
      { code: "DC-363", title: "Parallel and Distributed Computing", credits: "3(3-0)", lab: null, prereq: "Operating Systems",
        topics: ["Cloud, grid and cluster computing", "Concurrency control", "GPU programming", "MPI and OpenMP", "Load balancing and scalability"] },
      { code: "DE-364", title: "Data Science", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Data science process", "Python and R for data", "Data cleaning", "Exploratory data analysis", "Machine learning basics"] },
      { code: "CC-365", title: "Computer Networks", credits: "2(2-0)", lab: "1(0-3)", prereq: null,
        topics: ["OSI and TCP/IP models", "Data link layer and Ethernet", "IP and routing", "TCP, UDP and congestion control", "Application layer and network security"] }
    ]
  },
  {
    number: 7,
    courses: [
      { code: "CC-471", title: "Artificial Intelligence", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Branches of AI", "Knowledge representation", "Expert systems and search", "Natural language processing", "Robotics, computer vision and Prolog"] },
      { code: "DC-472", title: "Human Computer Interaction", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Human factors and perception", "Input and output devices", "Interaction frameworks", "Usability principles", "Evaluation techniques"] },
      { code: "DE-473", title: "Software Testing and Quality Assurance", credits: "2(2-0)", lab: "1(0-3)", prereq: null,
        topics: ["Verification and validation", "Functional and control flow testing", "Data flow testing", "Testing object-oriented software", "Test automation and reliability"] },
      { code: "DE-474", title: "Modelling and Simulation", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Systems and models", "Manual simulation examples", "Discrete event simulation", "Random number generators", "Parallel and distributed simulation"] },
      { code: "CC-475", title: "Final Year Project - I", credits: "3(0-9)", lab: null, prereq: null,
        topics: ["Project work (marks are combined with FYP-II)"] }
    ]
  },
  {
    number: 8,
    courses: [
      { code: "DC-481", title: "Computer Architecture", credits: "3(3-0)", lab: null, prereq: "Computer Organization and Assembly Language",
        topics: ["Computer evolution and performance", "Memory system and cache", "Instruction sets and addressing modes", "RISC vs CISC, pipelining", "Multicore and parallel architectures"] },
      { code: "DE-482", title: "Machine Learning", credits: "3(3-0)", lab: null, prereq: null,
        topics: ["Types of machine learning", "Data pre-processing", "Supervised and unsupervised learning", "Evaluation metrics", "Introduction to deep learning"] },
      { code: "DE-483", title: "Cyber Security", credits: "2(2-0)", lab: "1(0-3)", prereq: "Information Security",
        topics: ["Cyber threat landscape", "Malware and social engineering", "Web and network security", "Mobile and software security", "Digital forensics"] },
      { code: "CC-484", title: "Final Year Project - II", credits: "3(0-9)", lab: null, prereq: "Final Year Project - I",
        topics: ["Project work and final evaluation"] }
    ]
  }
];

// Support for both Browser window global and module exports
if (typeof window !== "undefined") {
  window.octoviaSemesters = semesters;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { semesters };
}

