const ytdl = require('ytdl-core');

exports.handler = async function (event, context) {
  console.log('Function invoked with event:', JSON.stringify(event, null, 2));

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    console.log('Received OPTIONS request');
    return { statusCode: 200, headers, body: JSON.stringify({ message: 'CORS preflight request successful' }) };
  }

  if (event.httpMethod !== 'POST') {
    console.log('Invalid HTTP method:', event.httpMethod);
    return { statusCode: 405, headers, body: JSON.stringify({ message: 'Method Not Allowed' }) };
  }

  try {
    let youtubeUrl;
    try {
      console.log('Parsing request body...');
      const body = JSON.parse(event.body);
      youtubeUrl = body.youtubeUrl;
      console.log('Parsed YouTube URL:', youtubeUrl);
    } catch (error) {
      console.error('Error parsing request body:', error);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: 'Invalid request body',
          error: error.message,
        }),
      };
    }

    if (!youtubeUrl) {
      console.error('No YouTube URL provided');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: 'YouTube URL is required',
        }),
      };
    }

    console.log('Validating YouTube URL...');
    if (!ytdl.validateURL(youtubeUrl)) {
      console.error('Invalid YouTube URL:', youtubeUrl);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: 'Invalid YouTube URL',
        }),
      };
    }

    console.log('Fetching video info...');
    const info = await ytdl.getInfo(youtubeUrl);
    console.log('Video info retrieved:', info.videoDetails.title);

    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    console.log('Processing formats...');
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    console.log('Available audio formats:', audioFormats.map((f) => f.itag));

    if (audioFormats.length === 0) {
      console.error('No audio formats available');
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          message: 'No audio formats available',
        }),
      };
    }

    const audioFormat = audioFormats[0];
    console.log('Selected audio format:', audioFormat.itag);

    console.log('Returning success response');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Audio URL retrieved successfully',
        audioUrl: audioFormat.url,
        title: title,
      }),
    };
  } catch (error) {
    console.error('Error in handler:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: 'Error processing request',
        error: error.message,
        stack: error.stack,
        ytdlVersion: ytdl.version,
      }),
    };
  }
};

