// data/posts.js
// Blog posts. Full text is stored here so it renders without a CMS.

import { COUNCIL_NAME } from './site'

export const posts = [
  {
    id: 'iota-archives',
    slug: 'iota-archives',
    title: 'IoTA Archives',
    subtitle: 'Induction Exhibition 2026',
    date: '7th September 2026',
    location: 'Labs 201, 203 and 215, VESIT',
    category: 'Event Write-up',
    // Cover: chassis-holder photo from Lab 201 — good quality action shot
    coverPhoto: '/photos/iota-robotics-chassis-presentation.jpg',
    coverAspect: 'aspect-[1024/628]',
    gallery: [
      {
        src: '/photos/iota-lab201-group.jpg',
        label: 'Lab 201 — Seniors in the Tinkerers\u2019 Lab during the exhibition',
        aspect: 'aspect-[4/3]',
      },
      {
        src: '/photos/iota-lab201-robot-demo.jpg',
        label: 'Lab 201 — FE students watching a robot car demonstration',
        aspect: 'aspect-[4/3]',
      },
      {
        src: '/photos/iota-robotics-chassis-presentation.jpg',
        label: 'Lab 201 — Senior demonstrating a hardware project to FE students',
        aspect: 'aspect-[4/3]',
      },
      {
        src: '/photos/iota-electrical-lab-discussion.png',
        label: 'Lab 215 — Seniors explaining projects to FE students',
        aspect: 'aspect-[4/3]',
      },
    ],
    intro: `IoTA Archives was an exhibition organised by the Electronics and Computer Science (ECS) Department at VESIT as a part of the induction programme for the newly admitted FE students. The exhibition gave the new batch an opportunity to see projects made by their seniors and get an early idea of the different areas they could explore in ECS.\n\nStudents were invited to volunteer and showcase their projects, from which a selected set was chosen for the exhibition. The Tinkerer's Council was allotted Labs 201, 203 and 215 by our Council In-charge, Yogesh Pandit Sir. Preparations started roughly a week before the event, with the project teams working on their demonstrations and the council coordinating the arrangements. Under the guidance of our newly elected President, Harsh, the council members and volunteers worked with the teams to get the exhibition ready.\n\nThe three labs had projects from different areas of ECS. Lab 201 mainly featured hardware and electronics projects, while Labs 203 and 215 had more software-based projects. The exhibits included AI and machine learning projects, FPGA and VLSI work, software applications, remote controlled cars, an obstacle avoiding car and other student projects.`,
    sections: [
      {
        id: 'lab201',
        heading: 'Lab 201 — Hardware and Electronics',
        photo: '/photos/iota-lab201-robot-floor.jpg',
        photoLabel: 'Lab 201 · FE students watching a robot car demonstration',
        aspect: 'aspect-[1024/570]',
        body: `The FE students were brought in batches and guided through the three labs as they completed each set of projects. The council and volunteers coordinated the movement between the rooms so that the groups could get a chance to see all the exhibits.`,
        projects: [
          'Hardware and electronics project demonstrations',
          'Remote controlled car showcase',
          'Obstacle avoiding car demonstration',
          'Other student hardware projects',
        ],
      },
      {
        id: 'lab203',
        heading: 'Lab 203 — Software Projects',
        photo: '/photos/iota-lab201-crowd.jpg',
        photoLabel: 'Lab 203 · FE students engaging with software project demonstrations',
        aspect: 'aspect-[1024/577]',
        body: `The project demonstrations led to a good amount of interaction between the FE students and their seniors. While some students started asking questions immediately, others took some time to become comfortable. The project teams were patient in explaining their work and answering questions about the projects, the technologies used and how they had been developed.\n\nA number of FE students also approached the council members with questions about the ECS department and college life. Many were interested in knowing what they could start learning from their first year and how they could eventually work on projects themselves. As some projects attracted larger groups, the arrangements were adjusted accordingly, including moving one project team to another table in Lab 203 to make more space for the students.`,
        projects: [
          'AI and machine learning project demonstrations',
          'FPGA and VLSI work',
          'Software application projects',
          'Senior-to-FE interaction and Q&A sessions',
        ],
      },
      {
        id: 'lab215',
        heading: 'Lab 215 — Software Projects and Interaction',
        photo: '/photos/iota-electrical-lab-discussion.png',
        photoLabel: 'Lab 215 · Seniors explaining projects to FE students',
        aspect: 'aspect-[1024/579]',
        body: `The enthusiasm of the FE students increased as they moved through the exhibition. It was encouraging to see students who were initially hesitant become more involved and start asking questions about the projects and their own opportunities in ECS. By the end of the exhibition, the interactions had given many of them a clearer idea of what their seniors were working on and where they could begin themselves.\n\nFor the Tinkerer's Council, the exhibition was also an opportunity to work with project teams from different batches and coordinate an event across three labs. The support of the participating teams and volunteers helped the exhibition run smoothly throughout the day.\n\nOverall, IoTA Archives gave the new FE batch an early look at the technical work happening in ECS and allowed them to interact directly with their seniors. The interest shown by the students in learning and starting projects early was especially encouraging, and we hope the exhibition gave them a sense of belonging and a good starting point for their journey in the department.`,
        projects: [
          'Software project demonstrations and walkthroughs',
          'Interaction between FE students and senior project teams',
          'Q&A on ECS department, college life and getting started',
          'Cross-batch collaboration and mentorship',
        ],
      },
    ],
  },
]
