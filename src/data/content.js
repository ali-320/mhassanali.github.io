export const projects = [
  {
    id: 'quantum-ml',
    title: 'Quantum Machine Learning',
    category: 'QUANTUM & ML',
    description: [
      'Designed a system introducing controlled noise as an amplifier in NISQ hardware.',
      'Implemented a Variational Quantum Circuit (VQC) to predict molecular properties using the HOMO-LUMO gap.',
      'Ran simulations using PennyLane and benchmarked results against classical ML models.'
    ],
    stack: ['PennyLane', 'Python', 'QML', 'NumPy'],
    repo: 'https://github.com/ali-320',
    deployment: null,
    color: '#8A9CA6'
  },
  {
    id: 'tax-lens',
    title: 'Tax Lens',
    category: 'WEB & PUBLIC DATA',
    description: [
      'Built a platform to estimate tax collection from user-submitted tax slips.',
      'Added features for evaluating government projects and budget transparency.',
      'Powered by Supabase and deployed publicly.'
    ],
    stack: ['React', 'Supabase', 'Node.js'],
    repo: 'https://github.com/ali-320',
    deployment: 'https://tax-lens-gamma.vercel.app/',
    color: '#B8860B'
  },
  {
    id: 'remote-ecg',
    title: 'Remote ECG Monitor',
    category: 'EMBEDDED SYSTEMS',
    description: [
      'Developed a real-time ECG monitoring system using ESP32.',
      'Streams biosignal data for remote health tracking.',
      'Demonstrates embedded hardware + IoT integration.'
    ],
    stack: ['ESP32', 'C/C++', 'IoT'],
    repo: 'https://github.com/ali-320/Embedded_Systems-Remote_Health_Monitoring_System',
    deployment: null,
    color: '#9C2A2A'
  },
  {
    id: 'searchwright',
    title: 'SearchWright',
    category: 'INFORMATION RETRIEVAL',
    description: [
      'Built a terminal-based search engine for 190,000+ articles.',
      'Implemented lexicon, forward index, and inverted index.',
      'Optimized for fast Boolean and ranked retrieval.'
    ],
    stack: ['Python', 'Data Structures', 'CLI'],
    repo: 'https://github.com/ali-320',
    deployment: null,
    color: '#D4CFC7'
  },
  {
    id: 'patient-management',
    title: 'Patient Management System',
    category: 'MACHINE LEARNING',
    description: [
      'Built a doctor portal to add patients, manage records, and analyze results.',
      'Implemented three ML models to detect medical anomalies in patient data.',
      'Aimed at improving regional healthcare accessibility.'
    ],
    stack: ['Python', 'Flask', 'Scikit-learn', 'SQL'],
    repo: 'https://github.com/ali-320/DBMS_HealthManagementSystem',
    deployment: null,
    color: '#4A90D9'
  },
  {
    id: 'software-testing-ospos',
    title: 'Software Testing — OSPOS',
    category: 'QA & TESTING',
    description: [
      'Performed comprehensive testing on the open-source OSPOS platform.',
      'Used k6 and Locust for load and performance testing.',
      'Automated UI with Selenium and APIs with Postman and PyTest.'
    ],
    stack: ['k6', 'Locust', 'PyTest', 'Selenium', 'Postman'],
    repo: 'https://github.com/ali-320',
    deployment: null,
    color: '#6BBF5A'
  },
  {
    id: 'frontend-prototyping',
    title: 'Frontend Prototyping',
    category: 'UI/UX DESIGN',
    description: [
      'Created low-fidelity and high-fidelity prototypes using Figma and Stitch.',
      'Conducted usability testing via the Maze platform.',
      'Focused on user-centered design and iterative feedback.'
    ],
    stack: ['Figma', 'Stitch', 'Maze'],
    repo: 'https://github.com/ali-320',
    deployment: null,
    color: '#C778DD'
  }
]

export const skills = [
  {
    category: 'Programming',
    items: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'Linux']
  },
  {
    category: 'Specializations',
    items: ['Machine Learning', 'Deep Learning', 'Quantum ML', 'Game Development', 'Embedded Systems', 'Formal Methods', 'Software Testing']
  },
  {
    category: 'Tools & Frameworks',
    items: ['PennyLane', 'k6', 'Locust', 'PyTest', 'Selenium', 'Postman', 'Figma', 'NuSMV', 'HOL4', 'Proteus', 'Cisco Packet Tracer', 'AutoCAD', 'Wireshark', 'Docker', 'ELK Stack', 'Supabase', 'Unity']
  },
  {
    category: 'Soft Skills',
    items: ['Problem Solving', 'Leadership', 'Critical Thinking', 'Communication']
  }
]

export const education = [
  {
    institution: 'NUST, Islamabad',
    degree: 'Bachelor of Software Engineering',
    period: '2023 – 2027',
    detail: 'CGPA 3.02 · Completed 6th Semester'
  },
  {
    institution: 'Punjab College, Sheikhupura',
    degree: 'FSc Pre-Engineering',
    period: '2021 – 2023',
    detail: 'Marks 987/1100'
  },
  {
    institution: 'PASC, Farooqabad',
    degree: 'Matriculation (Science)',
    period: '2019 – 2021',
    detail: 'Marks 1100/1100'
  }
]

export const contact = {
  phone: '+92 322-9053561',
  emails: ['mhali.bese23seecs@seecs.edu.pk', 'ha0407351@gmail.com'],
  github: 'https://github.com/ali-320'
}
