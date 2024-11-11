import React, { useEffect, useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

interface VideoProcessorProps {
  videoFile: File;
  onProcessingComplete: () => void;
  setProcessing: (processing: boolean) => void;
}

const VideoProcessor: React.FC<VideoProcessorProps> = ({
  videoFile,
  onProcessingComplete,
  setProcessing
}) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Iniciando processamento...');

  useEffect(() => {
    const processVideo = async () => {
      setProcessing(true);
      const ffmpeg = createFFmpeg({
        log: true,
        progress: ({ ratio }) => {
          setProgress(Math.round(ratio * 100));
        },
      });

      try {
        await ffmpeg.load();
        setStatus('Extraindo áudio...');
        
        const inputFileName = 'input.mp4';
        const outputAudioName = 'output.mp3';
        
        ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));
        
        await ffmpeg.run(
          '-i', inputFileName,
          '-vn',
          '-acodec', 'libmp3lame',
          '-q:a', '2',
          outputAudioName
        );

        setStatus('Processamento concluído!');
        onProcessingComplete();
      } catch (error) {
        console.error('Erro no processamento:', error);
        setStatus('Erro no processamento do vídeo');
      } finally {
        setProcessing(false);
      }
    };

    processVideo();
  }, [videoFile, onProcessingComplete, setProcessing]);

  return (
    <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{status}</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-gray-600 text-sm">{progress}% concluído</p>
      </div>
    </div>
  );
};

export default VideoProcessor;