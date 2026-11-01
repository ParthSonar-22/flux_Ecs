/**
 * Radio Audio Channel Configuration
 * 
 * Licensing Notice:
 * In accordance with broadcast licensing requirements for public web deployment,
 * commercial copyrighted soundtracks must not be redistributed.
 * This player utilizes a royalty-free engineering ambient transmission,
 * or an authorized audio stream URL configured via NEXT_PUBLIC_RADIO_URL.
 */
export const radioTrack = {
  title: 'Flux Pit Transmission',
  artist: 'FluxECS Engineering Audio · Ambient Synthesizer',
  src: process.env.NEXT_PUBLIC_RADIO_URL || '/media/ambient-pit.wav',
}
