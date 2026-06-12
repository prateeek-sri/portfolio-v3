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

    const LASTFM_ENDPOINT = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

    const response = await fetch(LASTFM_ENDPOINT, { cache: 'no-store' });
    const data = await response.json();

    if (!data.recenttracks || !data.recenttracks.track || data.recenttracks.track.length === 0) {
      return NextResponse.json({ isPlaying: false });
    }

    const track = data.recenttracks.track[0];
    
    // Check if the song is actively playing right now
    const isPlaying = track['@attr']?.nowplaying === 'true';
    
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
