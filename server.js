import express from 'express';
import ytdl from 'ytdl-core';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(join(__dirname, 'dist')));

app.post('/api/download-mp3', async (req, res) => {
  const { youtubeUrl } = req.body;

  try {
    const info = await ytdl.getInfo(youtubeUrl);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
    res.setHeader('Content-Type', 'audio/mpeg');

    ytdl(youtubeUrl, { filter: 'audioonly', format: 'mp3' }).pipe(res);
  } catch (error) {
    console.error('Error processing download:', error);
    res.status(500).send('Error downloading MP3');
  }
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});