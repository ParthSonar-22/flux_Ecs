// data/events.js
// All event data. isPast is computed at runtime — no need to edit when events expire.

export const events = [
  {
    id: 'algorithms-auction',
    slug: 'algorithms-auction',
    title: "Algorithm's Auction",
    posterLine: 'Every move is a strategy. Every bid is a gamble.',
    shortLine: 'Think. Bid. Solve. Win.',
    status: 'upcoming',
    startDate: new Date('2026-11-02T13:00:00+05:30'),
    endDate: new Date('2026-11-03T15:30:00+05:30'),
    venue: '2nd Floor, VESIT',
    time: '1:00 pm – 3:30 pm',
    poster: '/posters/algorithms-auction.jpg',
    timelineImage: '/posters/algorithm-timeline.jpg',
    presentedBy: 'Department of Electronics and Computer Science × FluxECS',
    registerUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSfp5CY1X37Z6CC40Q5R4YRrEb1Rcd4Z9ux6VyNmWGDVnvh5RA/viewform?usp=dialog',
    intro:
      "Ready for a challenge that's more than just coding? Whether you're a beginner or a problem-solving enthusiast, Algorithm's Auction is specially curated for ECS students across all years. Get ready for 2 days of logic, strategy, competitive bidding and exciting challenges.",
    day1: {
      label: 'Day 1: Learn the Logic',
      date: '2nd November 2026',
      items: [
        'Searching and Sorting Fundamentals',
        'Greedy Algorithms & Decision Making',
        'Divide and Conquer Approaches',
        'Graph Traversal (BFS & DFS)',
        'Interactive Logic Mini-Challenges',
      ],
    },
    day2: {
      label: 'Day 2: Bid. Solve. Win.',
      date: '3rd November 2026',
      items: [
        'Strategic Virtual Coin Bidding',
        'Team Problem Solving Battles',
        'Steal Deal Bidding Windows',
        'Bonus Boss Challenge',
        'Live Leaderboard, Penalties & Rewards',
      ],
    },
    biddingRules: [
      {
        title: 'Virtual Coin Purse',
        badge: 'Rule 01',
        description:
          'Every registered team receives a fixed purse of virtual auction coins at the beginning of Day 2. Coins are used to bid on problem statements of varying point weights.',
      },
      {
        title: 'Open & Blind Bidding Tiers',
        badge: 'Rule 02',
        description:
          'Problems are categorized into Bronze (100 pts), Silver (250 pts), and Gold (500 pts). Teams place bids to lock down problems. The highest bidder secures the problem.',
      },
      {
        title: 'The Steal Deal Window',
        badge: 'Rule 03',
        description:
          'If a team fails to pass test cases on their acquired problem within the designated timer, the problem is unlocked for live steal bids at a discounted coin price.',
      },
      {
        title: 'Net Scoring Formula',
        badge: 'Rule 04',
        description:
          'Final ranking = (Points from passed test cases) - (Total coins spent on auctions). Conservative bidding paired with accurate coding yields the championship score.',
      },
    ],
    syllabus: [
      {
        topic: 'Searching & Sorting',
        desc: 'Binary search variations, rotated arrays, custom comparator sort logic, and two-pointer search patterns.',
      },
      {
        topic: 'Greedy Algorithms',
        desc: 'Activity selection, interval merging, coin change optimal selection, and greedy decision trees.',
      },
      {
        topic: 'Divide & Conquer',
        desc: 'Recursive breakdown, merge sort paradigms, binary exponentiation, and peak element discovery.',
      },
      {
        topic: 'Graphs & Breadth/Depth Search',
        desc: 'Adjacency representations, BFS queue traversal, DFS recursion, and connected component counting.',
      },
    ],
    faqs: [
      {
        question: 'Do I need prior competitive coding experience?',
        answer:
          'Not at all! Day 1 is specifically designed as "Learn the Logic", where senior mentors walk through algorithm patterns with interactive mini-challenges so everyone is prepared for the Day 2 auction.',
      },
      {
        question: 'Can First-Year (FE) ECS students take part?',
        answer:
          'Yes, absolutely! Algorithm\'s Auction is open to FE, SE, TE, and BE students of the Department of Electronics & Computer Science. Beginner-friendly problems and mentor support are provided.',
      },
      {
        question: 'What is the team size and composition?',
        answer:
          'You can register individually (solo) or as a team of up to 3 students. Solo participants can also be paired with peers during the Day 1 team formation mixer.',
      },
      {
        question: 'What do I need to bring?',
        answer:
          'Bring your laptop with an IDE or compiler installed for your preferred language (C++, Python, Java, or C), a charger, and your college ID card.',
      },
      {
        question: 'Will all participants receive certificates?',
        answer:
          'Yes. All registered attendees who complete both days will receive an official Certificate of Participation from the Department of Electronics & Computer Science × FLUX-ECS.',
      },
    ],
    whatsInItForYou: [
      'Explore algorithms and sharpen your problem-solving skills.',
      'Build skills useful for future placements and technical rounds.',
      'Make strategic bids and compete with your department peers.',
      'Challenge yourself, have fun, and aim for the top of the leaderboard.',
      'Earn an official Certificate of Participation from VESIT ECS.',
    ],
    note: 'No need to be an expert. Just bring your curiosity and competitive spirit.',
    posterTagline:
      'Bid smart, play hard, and win big! Participate in Algorithm\'s Auction for exciting challenges and amazing prizes!',
    closing: 'Think before you bid. Solve before you spend.',
    contacts: [
      { name: 'Harsh Patange', role: 'President', phone: '+91 84548 41288' },
      { name: 'Riya Pailwan', role: 'Hardware Head', phone: '+91 81694 56269' },
      { name: 'Aayan Shaikh', role: 'Technical Head', phone: '+91 98674 66475' },
      { name: 'Paarth Patil', role: 'Sr. Technical Officer', phone: '+91 97024 13348' },
    ],
  },
  {
    id: 'iota-archives',
    slug: 'iota-archives',
    title: 'IoTA Archives',
    shortLine: 'Induction Exhibition 2026',
    status: 'past',
    startDate: new Date('2026-09-07T10:00:00+05:30'),
    endDate: new Date('2026-09-07T17:00:00+05:30'),
    venue: 'Labs 201, 203 and 215, VESIT',
    time: 'Morning – Afternoon',
    poster: '/photos/lab201/lab201.png',
    cover: '/photos/lab201/lab201.png',
    intro:
      'IoTA Archives was an exhibition organised by the ECS department at VESIT as part of the induction programme for newly admitted FE students. It gave the new batch a chance to see projects made by their seniors.',
    labs: [
      {
        id: 'lab201',
        label: 'Lab 201',
        focus: 'Hardware and Electronics',
        description:
          'Lab 201 was the hardware wing of the exhibition. Senior students set up live demonstrations of remote-controlled cars, obstacle-avoiding robotic chassis with ultrasonic sensors, FPGA and VLSI demonstration kits, and custom sensor rigs. First-year students gathered around the workbenches, asking questions and getting their first hands-on look at embedded systems in action.',
        projects: [
          'Obstacle-avoiding robot with HC-SR04 ultrasonic sensor and L298N motor driver',
          'Remote-controlled car with custom RF transmitter-receiver pair',
          'FPGA demo board running a simple LED pattern synthesised in VHDL',
          'Custom sensor rig reading temperature, humidity, and light levels over I²C',
        ],
        photo: '/photos/lab201/lab201-1.jpg',
        thumb: '/photos/lab201/lab201.png',
      },
      {
        id: 'lab203',
        label: 'Lab 203',
        focus: 'Software Projects',
        description:
          'Lab 203 hosted software-focused presentations. Seniors walked freshmen through AI and ML projects, including a real-time computer vision classifier running on a laptop webcam. Full-stack student portals, algorithmic simulations, and software application architectures were presented on the lab monitors. The room was buzzing with questions about how to get started with Python, React, and version control.',
        projects: [
          'Real-time object detection using a pre-trained YOLO model',
          'A full-stack student attendance portal built with React and Node.js',
          'A sorting algorithm visualiser showing bubble, merge, and quicksort in real time',
          'A simple REST API deployed on a cloud platform, demonstrated live',
        ],
        photo: '/photos/lab203/lab203-1.jpg',
        thumb: '/photos/lab203/lab203.png',
      },
      {
        id: 'lab215',
        label: 'Lab 215',
        focus: 'Software Projects and Interaction',
        description:
          'Lab 215 focused on interactive demonstrations and longer conversations between seniors and freshers. Students sat down one-on-one with seniors to talk about career paths, competitive programming, open-source contributions, and what to expect from the ECS curriculum. Several seniors walked through their own GitHub profiles and showed how they built their portfolios over three years.',
        projects: [
          'Live walkthrough of a competitive programming profile on Codeforces and LeetCode',
          'Open-source contribution demo — forking a repo, making a change, and submitting a pull request',
          'Career talk: how to balance academics, clubs, and internships',
          'Q&A session with the FLUX-ECS Council on upcoming workshops and events',
        ],
        photo: '/photos/lab215/lab215-1.jpg',
        thumb: '/photos/lab215/lab215.png',
      },
    ],
    credits: [
      'Yogesh Pandit Sir, Council In-charge',
      'Harsh, President',
      'Participating project teams and volunteers',
    ],
    gallery: [
      { src: '/photos/lab201/lab201-1.jpg', label: 'Lab 201' },
      { src: '/photos/lab203/lab203-1.jpg', label: 'Lab 203' },
      { src: '/photos/lab215/lab215-1.jpg', label: 'Lab 215' },
    ],
  },
  {
    id: 'senior-hardware-exhibit',
    slug: 'senior-hardware-exhibit',
    title: 'Senior Hardware & Robotics Showcase',
    shortLine: 'RF Telemetry & VHDL Logic Synthesis',
    status: 'past',
    startDate: new Date('2026-08-22T11:00:00+05:30'),
    endDate: new Date('2026-08-22T16:00:00+05:30'),
    venue: 'Lab 201, VESIT',
    time: '11:00 am – 4:00 pm',
    poster: '/photos/lab201/lab201-1.jpg',
    cover: '/photos/lab201/lab201-1.jpg',
    intro:
      'Senior ECS students opened Lab 201 to demonstrate custom 433MHz RF transceivers, VHDL state-machine synthesis on FPGA boards, and autonomous obstacle-navigating robotic chassis for second and third-year students.',
    projects: [
      'Custom RF transmitter-receiver modules tested with frequency analyzer',
      'Dual H-bridge chassis control using PWM speed modulation',
      'FPGA LED and 7-segment countdown counter synthesis in Vivado',
      'Power supply and bench multimeter calibration for student projects',
    ],
    credits: [
      'Yogesh Pandit Sir, Council In-charge',
      'Riya Pailwan, Hardware Head',
      'Senior project teams & ECS lab technicians',
    ],
  },
]

export const clubPillars = [
  {
    number: '01',
    title: 'Competitive Coding & Auctions',
    lab: 'Dept. 2nd Floor',
    summary:
      'From algorithmic screening rounds to live coin bidding in Algorithm\'s Auction — combining DSA problem solving with fast game theory and peer strategy.',
    tags: ['Algorithms', 'Logic Rounds', 'Bidding Strategy'],
  },
  {
    number: '02',
    title: 'Hardware & Embedded Labs',
    lab: 'Lab 201',
    summary:
      'Hands-on bench work with ESP32, Arduino, ultrasonic sensors, motor drivers, and FPGA kits. Translating schematics and breadboards into physical hardware.',
    tags: ['ESP32', 'Sensors', 'VLSI & FPGA', 'Robotics'],
  },
  {
    number: '03',
    title: 'Software & Applied AI',
    lab: 'Lab 203',
    summary:
      'Real-time computer vision classifiers, full-stack student portals, API services, and open-source hackathons built by and for ECS students.',
    tags: ['React', 'Python & Vision', 'REST APIs', 'Cloud'],
  },
  {
    number: '04',
    title: 'Mentorship & Placement Circles',
    lab: 'Lab 215',
    summary:
      'Senior-to-junior guidance sessions covering LeetCode problem patterns, GitHub portfolios, technical mock interviews, and balancing coursework.',
    tags: ['DSA Prep', 'Mock Interviews', 'Career Q&A'],
  },
]

// 4-Stage Algorithm's Auction Pipeline replaces the unconfirmed future events
export const tournamentPipeline = [
  {
    phase: '01',
    stage: 'Registration & Team Formation',
    venue: 'Google Forms / Online',
    schedule: 'Open until 1st Nov 2026',
    description: 'Solo participants and teams of up to 3 students register. Solo attendees paired up on Day 1.',
  },
  {
    phase: '02',
    stage: 'Day 1: Learn the Logic',
    venue: '2nd Floor, VESIT',
    schedule: '2nd Nov 2026 · 1:00 pm',
    description: 'Master searching, greedy, divide & conquer and graph patterns with live mentor-led mini challenges.',
  },
  {
    phase: '03',
    stage: 'Day 2: Live Coin Auction & Bidding',
    venue: '2nd Floor, VESIT',
    schedule: '3rd Nov 2026 · 1:00 pm',
    description: 'Manage virtual coin purses, bid on problem tiers, trigger steal deal windows, and submit test cases.',
  },
  {
    phase: '04',
    stage: 'Evaluation, Leaderboard & Awards',
    venue: '2nd Floor, VESIT',
    schedule: '3rd Nov 2026 · 3:00 pm',
    description: 'Automated test suite evaluation, net coin scoring, trophy presentation, and certificates for all.',
  },
]

/** Returns true if the event's end date is before today */
export function isPast(event) {
  return new Date(event.endDate) < new Date()
}

export function getUpcoming() {
  return events.filter((e) => !isPast(e))
}

export function getPast() {
  return events.filter((e) => isPast(e))
}
