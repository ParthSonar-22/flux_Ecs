// data/posts.js
// Blog posts. Full text is stored here so it renders without a CMS.
// "Tinkerer's Council" in the source markdown has been replaced with COUNCIL_NAME.

import { COUNCIL_NAME } from './site'

export const posts = [
  {
    id: 'iota-archives',
    slug: 'iota-archives',
    title: 'IoTA Archives',
    subtitle: 'Induction Exhibition 2026',
    date: '7th September 2026',
    location: 'Labs 201, 203 and 215, VESIT',
    category: 'EXCLUSIVE FIELD RECORD',
    coverPhoto: '/photos/lab201/lab201-1.jpg',
    gallery: [
      { src: '/photos/lab201/lab201-1.jpg', label: 'Lab 201' },
      { src: '/photos/lab203/lab203-1.jpg', label: 'Lab 203' },
      { src: '/photos/lab215/lab215-1.jpg', label: 'Lab 215' },
    ],
    intro: `An exhibition conducted by the ECS department as part of the First Year (FE) induction programme. Seniors demonstrated projects to welcome freshmen and showcase the technical landscape of the branch. Organised by the ${COUNCIL_NAME} under President Harsh Patange.`,
    sections: [
      {
        id: 'lab201',
        heading: 'Lab 201 — Hardware and Electronics',
        photo: '/photos/lab201/lab201-1.jpg',
        photoLabel: 'Lab 201',
        body: `Lab 201 was the hardware wing of the exhibition. Senior students set up live demonstrations of remote-controlled cars, obstacle-avoiding robotic chassis with ultrasonic sensors, FPGA and VLSI demonstration kits, and custom sensor rigs. First-year students gathered around the workbenches, asking questions and getting their first hands-on look at embedded systems in action.`,
        projects: [
          'Obstacle-avoiding robot with HC-SR04 ultrasonic sensor and L298N motor driver',
          'Remote-controlled car with custom RF transmitter-receiver pair',
          'FPGA demo board running a simple LED pattern synthesised in VHDL',
          'Custom sensor rig reading temperature, humidity, and light levels over I²C',
        ],
      },
      {
        id: 'lab203',
        heading: 'Lab 203 — Software Projects',
        photo: '/photos/lab203/lab203-1.jpg',
        photoLabel: 'Lab 203',
        body: `Lab 203 hosted software-focused presentations. Seniors walked freshmen through AI and ML projects, including a real-time computer vision classifier running on a laptop webcam. Full-stack student portals, algorithmic simulations, and software application architectures were presented on the lab monitors. The room was buzzing with questions about how to get started with Python, React, and version control.`,
        projects: [
          'Real-time object detection using a pre-trained YOLO model',
          'A full-stack student attendance portal built with React and Node.js',
          'A sorting algorithm visualiser showing bubble, merge, and quicksort in real time',
          'A simple REST API deployed on a cloud platform, demonstrated live',
        ],
      },
      {
        id: 'lab215',
        heading: 'Lab 215 — Software Projects and Interaction',
        photo: '/photos/lab215/lab215-1.jpg',
        photoLabel: 'Lab 215',
        body: `Lab 215 focused on interactive demonstrations and longer conversations between seniors and freshers. Students sat down one-on-one with seniors to talk about career paths, competitive programming, open-source contributions, and what to expect from the ECS curriculum. Several seniors walked through their own GitHub profiles and showed how they built their portfolios over three years.`,
        projects: [
          'Live walkthrough of a competitive programming profile on Codeforces and LeetCode',
          'Open-source contribution demo — forking a repo, making a change, and submitting a pull request',
          'Career talk: how to balance academics, clubs, and internships',
          `Q&A session with the ${COUNCIL_NAME} on upcoming workshops and events`,
        ],
      },
    ],
  },
]
