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
    location: "Labs 201, 203 and Tinkerers' Lab, VESIT",
    category: 'Event Write-up',
    coverPhoto: '/photos/iota-robot-floor-test.jpg',
    coverAspect: 'aspect-[1024/574]',
    gallery: [
      {
        src: '/photos/iota-robot-floor-test.jpg',
        label: 'Embedded Systems Lab — Autonomous Robot Floor Run',
        aspect: 'aspect-[1024/574]',
      },
      {
        src: '/photos/iota-robotics-chassis-presentation.jpg',
        label: "Tinkerers' Lab — Ultrasonic Sensor Chassis Demo",
        aspect: 'aspect-[1024/628]',
      },
      {
        src: '/photos/iota-electrical-lab-discussion.png',
        label: 'Basic Electrical & Electronics Lab — Senior-Fresher Q&A',
        aspect: 'aspect-[1024/579]',
      },
      {
        src: '/photos/iota-tinkerers-lab-cohort.jpg',
        label: "Tinkerers' Lab — FLUX-ECS Student Organizing Team",
        aspect: 'aspect-[1024/581]',
      },
    ],
    intro: `An exhibition conducted by the ECS department as part of the First Year (FE) induction programme. Seniors demonstrated projects to welcome freshmen and showcase the technical landscape of the branch. Organised by the ${COUNCIL_NAME} under President Harsh Patange.`,
    sections: [
      {
        id: 'lab201',
        heading: 'Embedded Systems Lab — Hardware & Live Robotics Demo',
        photo: '/photos/iota-robot-floor-test.jpg',
        photoLabel: 'Embedded Systems Lab · Floor testing of the obstacle-avoiding chassis',
        aspect: 'aspect-[1024/574]',
        body: `Senior students set up live demonstrations of remote-controlled cars, obstacle-avoiding robotic chassis with ultrasonic sensors, and custom sensor rigs. First-year students gathered on the lab floor to watch the robot car navigate obstacles in real time, asking questions and experiencing their first hands-on look at embedded systems in action.`,
        projects: [
          'Obstacle-avoiding robot with HC-SR04 ultrasonic sensor and L298N motor driver',
          'Remote-controlled car with custom RF transmitter-receiver pair',
          'FPGA demo board running a simple LED pattern synthesised in VHDL',
          'Custom sensor rig reading temperature, humidity, and light levels over I²C',
        ],
      },
      {
        id: 'lab203',
        heading: 'Basic Electrical & Electronics Lab — Circuitry & Software Presentations',
        photo: '/photos/iota-electrical-lab-discussion.png',
        photoLabel: 'Basic Electrical Lab · Senior-fresher technical discussion on bench setup',
        aspect: 'aspect-[1024/579]',
        body: `Lab 203 hosted hands-on demonstrations and technical discussions around the electrical test benches and computer monitors. Seniors walked freshmen through circuitry, project architectures, AI computer vision classifiers running live on webcam feeds, and web application architectures. The room was buzzing with questions about how to get started with Python, React, and version control.`,
        projects: [
          'Bench test equipment walkthrough & circuit debugging',
          'Real-time object detection using a pre-trained YOLO model',
          'A full-stack student attendance portal built with React and Node.js',
          'A sorting algorithm visualiser showing bubble, merge, and quicksort in real time',
        ],
      },
      {
        id: 'lab215',
        heading: "Tinkerers' Lab — Hardware Showcase & Mentorship Circle",
        photo: '/photos/iota-robotics-chassis-presentation.jpg',
        photoLabel: "Tinkerers' Lab · Live demonstration of the ultrasonic obstacle-avoiding chassis",
        aspect: 'aspect-[1024/628]',
        body: `In the Tinkerers' Lab, seniors held live demonstrations of student-built hardware chassis and engaged in extended mentorship sessions with freshmen. Students sat down one-on-one with seniors to talk about career paths, competitive programming, open-source contributions, and what to expect from the ECS curriculum. Several seniors walked through their own GitHub profiles and showed how they built their portfolios over three years.`,
        projects: [
          'Live walkthrough of chassis components, ultrasonic sensors, and motor controllers',
          'Live walkthrough of a competitive programming profile on Codeforces and LeetCode',
          'Open-source contribution demo — forking a repo, making a change, and submitting a pull request',
          `Q&A session with the ${COUNCIL_NAME} on upcoming workshops and events`,
        ],
      },
    ],
  },
]
