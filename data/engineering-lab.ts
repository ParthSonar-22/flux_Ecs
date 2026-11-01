export const labConfig = {
  model: '/engineering-lab/flux-lab-car.glb',
  poster: '/engineering-lab/engineering-lab-poster.webp',
  modelSource: 'https://opengameart.org/content/low-poly-formula-1-car',
  modelAuthor: 'DREAM_SEARCH_REPEAT',
  license: 'https://creativecommons.org/publicdomain/zero/1.0/',
}
export const subsystems = [
  {
    id: 'sensors',
    world: [2.1, 0.46, 0.52] as [number, number, number],
    number: '01',
    name: 'Sensors',
    object: 'Hotspot_Sensors',
    title: 'READ THE PHYSICAL WORLD.',
    description:
      'A sensor turns a physical measurement into an electrical signal. Sampling, filtering and calibration turn that signal into useful information.',
    signal: 'Physical input → signal conditioning → sampled data',
    hardware: 'Sensors, connectors and signal conditioning.',
    software: 'Sampling routines, filtering and calibration logic.',
    question: 'How would you distinguish a real change from electrical noise?',
    position: { left: 61.91, top: 63.75 },
  },
  {
    id: 'telemetry',
    world: [-0.15, 1.3, 0] as [number, number, number],
    number: '02',
    name: 'Telemetry',
    object: 'Hotspot_Telemetry',
    title: 'MAKE THE SYSTEM VISIBLE.',
    description:
      'Telemetry carries measurements from a machine to the people observing it. A useful data stream needs timestamps, clear units and a way to handle missing messages.',
    signal: 'Measured data → communication link → monitoring',
    hardware: 'Communication interfaces and a data acquisition unit.',
    software: 'Message formats, timestamps and visualization.',
    question:
      'What should the interface show when a measurement stops arriving?',
    position: { left: 48.81, top: 36.37 },
  },
  {
    id: 'aerodynamics',
    world: [2.75, 0.25, 0] as [number, number, number],
    number: '03',
    name: 'Aerodynamics',
    object: 'Hotspot_Aerodynamics',
    title: 'DESIGN FOR THE AIR AROUND IT.',
    description:
      'The shape of a body changes how air moves around it. Wings and surfaces are a starting point for exploring drag, loading and the trade-offs between them.',
    signal: 'Geometry → airflow → physical response',
    hardware: 'Wings, body surfaces and physical test models.',
    software: 'CAD, simulation and comparison of design changes.',
    question:
      'How would you compare two designs using the same test conditions?',
    position: { left: 71.83, top: 68.16 },
  },
  {
    id: 'control',
    world: [0.7, 0.73, 0] as [number, number, number],
    number: '04',
    name: 'Control systems',
    object: 'Hotspot_Control',
    title: 'CLOSE THE FEEDBACK LOOP.',
    description:
      'A controller compares what a system is doing with what it should do. Its outputs change the system, and fresh measurements tell it what happened next.',
    signal: 'Measure → compare → act → measure again',
    hardware: 'A controller, input sensors and output drivers.',
    software: 'Control logic, limits and fault handling.',
    question:
      'What should the controller do when an input is outside its valid range?',
    position: { left: 55.56, top: 49.9 },
  },
  {
    id: 'power',
    world: [-1.2, 0.53, 0.6] as [number, number, number],
    number: '05',
    name: 'Power systems',
    object: 'Hotspot_Power',
    title: 'DELIVER POWER WITH CARE.',
    description:
      'A power system supplies each part of a machine at the voltage and current it needs. Distribution, protection and monitoring matter as much as the source itself.',
    signal: 'Source → protection → distribution → loads',
    hardware: 'Regulation, wiring and protection devices.',
    software: 'Monitoring, operating limits and fault reporting.',
    question:
      'How would you keep a noisy load from disturbing a sensitive sensor?',
    position: { left: 34.98, top: 46.02 },
  },
] as const
export type SubsystemId = (typeof subsystems)[number]['id']
