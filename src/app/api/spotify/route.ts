import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const apiKey = process.env.LASTFM_API_KEY;
    const username = process.env.LASTFM_USERNAME;

    if (!apiKey || !username) {
      return NextResponse.json({ isPlaying: false });
    }

    // Fetch 2 tracks: when actively playing, Last.fm puts the live track at [0]
    // (with @attr.nowplaying='true') AND the last scrobbled at [1].
    // With limit=1, the live track can displace the actual last scrobble.
    const LASTFM_ENDPOINT = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=2`;

    const response = await fetch(LASTFM_ENDPOINT, { cache: 'no-store' });
    const data = await response.json();

    if (!data.recenttracks || !data.recenttracks.track || data.recenttracks.track.length === 0) {
      return NextResponse.json({ isPlaying: false });
    }

    const tracks: any[] = Array.isArray(data.recenttracks.track)
      ? data.recenttracks.track
      : [data.recenttracks.track];

    // First track is nowplaying (if active); use it for isPlaying state.
    const firstTrack = tracks[0];
    const isPlaying = firstTrack['@attr']?.nowplaying === 'true';

    // For display: if actively playing use [0], otherwise skip nowplaying entries
    // and take the first completed scrobble so we always show the real last played.
    const track = isPlaying
      ? firstTrack
      : tracks.find((t: any) => !t['@attr']?.nowplaying) ?? firstTrack;

    const title = track.name;
    const artist = track.artist['#text'];
    const album = track.album['#text'];
    
    // Last.fm returns an array of images. Size 'extralarge' is usually index 3.
    const albumImageUrl = track.image[3]['#text'] || track.image[2]['#text'] || track.image[1]['#text'] || '';
    const songUrl = track.url;

    return NextResponse.json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    return NextResponse.json({ isPlaying: false }, { status: 200 });
  }
}
