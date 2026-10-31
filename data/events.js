// data/events.js
// All event data. isPast is computed at runtime — no need to edit when events expire.

export const events = [
  {
    id: 'algorithms-auction',
    slug: 'algorithms-auction',
    title: "Algorithm's Auction",
    posterLine: 'Every move is a strategy. Every bid is a gamble.',
    shortLine: 'Think. Bid. Solve. Win.',
    status: 'upcoming', // computed at runtime via isPast()
    startDate: new Date('2026-11-02T13:00:00+05:30'),
    endDate: new Date('2026-11-03T15:30:00+05:30'),
    venue: '2nd Floor, VESIT',
    time: '1:00 pm – 3:30 pm',
    poster: '/posters/algorithms-auction.jpg', // TODO: place file in public/posters/
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
