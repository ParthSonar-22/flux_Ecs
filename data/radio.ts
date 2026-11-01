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
  title: 'Lose My Mind (feat. Doja Cat)',
  artist: 'Don Toliver · F1® The Movie',
  src: process.env.NEXT_PUBLIC_RADIO_URL || '/media/f1-soundtrack.mp3',
}
