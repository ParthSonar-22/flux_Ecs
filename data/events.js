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
        'Searching and Sorting',
        'Greedy Algorithms',
        'Divide and Conquer',
        'Graph Algorithms',
        'Interactive Mini-Challenges',
      ],
    },
    day2: {
      label: 'Day 2: Bid. Solve. Win.',
      date: '3rd November 2026',
      items: [
        'Strategic Coin Bidding',
        'Team Challenges',
        'Steal Deal Rounds',
        'Bonus Challenge',
        'Points, Penalties and Rewards',
      ],
    },
    whatsInItForYou: [
      'Explore algorithms and sharpen your problem-solving skills.',
      'Build skills useful for future placements.',
      'Make strategic bids and compete with your peers.',
      'Challenge yourself, have fun, and aim for the top.',
      'Earn a Certificate of Participation.',
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
    id: 'hardware-bootcamp',
    slug: 'hardware-bootcamp',
    title: 'Embedded Sensors & Robotics Bootcamp',
    posterLine: 'Hands-on wiring, sensor calibration, and microcontroller buses.',
    shortLine: 'Microcontrollers, Sensor Telemetry & Motor Drivers',
    status: 'upcoming',
    startDate: new Date('2026-12-12T13:30:00+05:30'),
    endDate: new Date('2026-12-12T16:30:00+05:30'),
    venue: 'Lab 201, VESIT',
    time: '1:30 pm – 4:30 pm',
    poster: '/photos/lab201/lab201-1.jpg',
    presentedBy: 'Department of Electronics and Computer Science × FluxECS',
    intro:
      'A practical afternoon workshop in Lab 201 where students wire up ESP32 boards, calibrate ultrasonic and temperature sensors over I²C/SPI, and drive dual DC motors through H-bridge drivers.',
    highlights: [
      'ESP32 pinout, GPIO control and PWM modulation',
      'Interfacing HC-SR04 ultrasonic and DHT-11 sensors',
      'I²C LCD display communication and telemetry debugging',
      'Motor driver circuitry (L298N) for robotics prototypes',
    ],
    contacts: [
      { name: 'Riya Pailwan', role: 'Hardware Head', phone: '+91 81694 56269' },
      { name: 'Atharva Vaidya', role: 'Hardware Officer', phone: '+91 91374 81045' },
    ],
  },
  {
    id: 'winter-hackathon',
    slug: 'winter-hackathon',
    title: 'ECS Winter Project Jam',
    posterLine: 'Build useful student and department solutions in 24 hours.',
    shortLine: '24-Hour Hardware & Software Innovation Sprint',
    status: 'upcoming',
    startDate: new Date('2027-01-16T10:00:00+05:30'),
    endDate: new Date('2027-01-17T14:00:00+05:30'),
    venue: 'Labs 201 & 203, VESIT',
    time: '10:00 am – 2:00 pm (Next Day)',
    poster: '/photos/lab203/lab203-1.jpg',
    presentedBy: 'Department of Electronics and Computer Science × FluxECS',
    intro:
      'A collaborative 2-day hackathon where teams of ECS students build working prototypes tackling smart campus utilities, automated lab inventory tracking, and assistive technology.',
    highlights: [
      'Problem statements provided by faculty and seniors',
      'Hardware component kits provided on-site in Lab 201',
      'Senior mentors available around the clock for architecture reviews',
      'Live project demonstrations and evaluation before department jury',
    ],
    contacts: [
      { name: 'Aayan Shaikh', role: 'Technical Head', phone: '+91 98674 66475' },
      { name: 'Parth Sonar', role: 'Web Master', phone: '+91 90048 29013' },
    ],
  },
  {
    id: 'placement-dsa-circle',
    slug: 'placement-dsa-circle',
    title: 'Placement DSA & Mock Circles',
    posterLine: 'From two-pointers to dynamic programming with placed seniors.',
    shortLine: 'Senior-Guided Coding Patterns & Interview Prep',
    status: 'upcoming',
    startDate: new Date('2027-02-06T14:00:00+05:30'),
    endDate: new Date('2027-02-06T17:00:00+05:30'),
    venue: 'Lab 215, VESIT',
    time: '2:00 pm – 5:00 pm',
    poster: '/photos/lab215/lab215-1.jpg',
    presentedBy: 'Department of Electronics and Computer Science × FluxECS',
    intro:
      'An intensive peer session in Lab 215 where placed final-year seniors break down high-frequency interview patterns, conduct 1-on-1 mock interviews, and review student resumes.',
    highlights: [
      'Patterns breakdown: Sliders, Trees, Graphs & Dynamic Programming',
      '1-on-1 whiteboarding and live problem solving',
      'Resume critique and GitHub portfolio audit',
      'Open Q&A on balancing academics with internship search',
    ],
    contacts: [
      { name: 'Harsh Patange', role: 'President', phone: '+91 84548 41288' },
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

export const termRoadmap = [
  {
    period: 'August 2026',
    status: 'Concluded',
    title: 'Senior VLSI & Hardware Demos',
    venue: 'Lab 201',
    description: 'FPGA state machines, RF transceivers, and motor chassis live bench.',
  },
  {
    period: 'September 2026',
    status: 'Concluded',
    title: 'IoTA Induction Exhibition',
    venue: 'Labs 201, 203 & 215',
    description: 'Multi-lab showcase welcoming newly admitted first-year ECS students.',
  },
  {
    period: 'November 2026',
    status: 'Active Flagship',
    title: "Algorithm's Auction 2.0",
    venue: '2nd Floor, VESIT',
    description: '2-day competitive coding, logic challenges, and strategic auction bidding.',
    isHighlighted: true,
  },
  {
    period: 'December 2026',
    status: 'Upcoming',
    title: 'Embedded Sensors Bootcamp',
    venue: 'Lab 201',
    description: 'Hands-on wiring, I²C bus calibration, and motor control workshop.',
  },
  {
    period: 'January 2027',
    status: 'Upcoming',
    title: 'ECS Winter Project Jam',
    venue: 'Labs 201 & 203',
    description: '24-hour student engineering sprint building campus tools & solutions.',
  },
  {
    period: 'February 2027',
    status: 'Upcoming',
    title: 'Placement DSA & Mock Circles',
    venue: 'Lab 215',
    description: 'Weekly peer mock interviews, LeetCode patterns, and resume reviews.',
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
