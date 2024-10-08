import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface UploadFormProps {
  // Props if needed
}

const UploadForm: React.FC<UploadFormProps> = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailedError, setDetailedError] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (youtubeUrl) {
      setLoading(true);
      setError(null);
      setDetailedError(null);
      try {
        console.log('Sending request to download MP3...');
        const response = await fetch('/.netlify/functions/download-mp3', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ youtubeUrl }),
        });

        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response text:', responseText);

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          throw new Error(`Failed to parse response: ${responseText}`);
        }
        console.log('Received data:', data);

        if (!response.ok) {
          throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        if (!data.audioUrl) {
          throw new Error('No audio URL provided');
        }

        // Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = data.audioUrl;
        link.download = `${data.title || 'download'}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setYoutubeUrl('');
      } catch (error) {
        console.error('Error downloading MP3:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        setDetailedError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-300">
          YouTube URL:
        </label>
        <input
          type="text"
          id="youtubeUrl"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
        />
      </div>
      {error && (
        <div className="bg-red-900 text-white p-3 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <p>{error}</p>
        </div>
      )}
      {detailedError && (
        <div className="bg-gray-800 text-white p-3 rounded-md mt-2">
          <p className="font-bold mb-2">Detailed Error Information:</p>
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(detailedError, null, 2)}</pre>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Download MP3'}
      </button>
    </form>
  );
};

export default UploadForm;