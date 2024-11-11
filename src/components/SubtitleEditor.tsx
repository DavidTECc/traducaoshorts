import React, { useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface SubtitleEditorProps {
  onComplete: () => void;
}

const SubtitleEditor: React.FC<SubtitleEditorProps> = ({ onComplete }) => {
  const [subtitles, setSubtitles] = useState<Array<{
    start: number;
    end: number;
    text: string;
  }>>([]);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-lg">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Editor de Legendas</h3>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="h-24 bg-gray-200 rounded-lg mb-4">
            {/* WaveSurfer will be initialized here */}
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>00:00</span>
            <span>04:32</span>
          </div>
        </div>

        <div className="space-y-4">
          {subtitles.map((subtitle, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 space-y-2">
                <input
                  type="text"
                  value={`${formatTime(subtitle.start)}`}
                  className="w-24 px-2 py-1 border rounded"
                  readOnly
                />
                <input
                  type="text"
                  value={`${formatTime(subtitle.end)}`}
                  className="w-24 px-2 py-1 border rounded"
                  readOnly
                />
              </div>
              
              <textarea
                value={subtitle.text}
                onChange={(e) => {
                  const newSubtitles = [...subtitles];
                  newSubtitles[index].text = e.target.value;
                  setSubtitles(newSubtitles);
                }}
                className="flex-grow p-2 border rounded resize-none"
                rows={2}
              />
              
              <button
                onClick={() => {
                  const newSubtitles = subtitles.filter((_, i) => i !== index);
                  setSubtitles(newSubtitles);
                }}
                className="p-2 text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => {
              setSubtitles([
                ...subtitles,
                {
                  start: currentTime,
                  end: currentTime + 3,
                  text: '',
                },
              ]);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Adicionar Legenda
          </button>
          
          <button
            onClick={onComplete}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Concluir Edição
          </button>
        </div>
      </div>
    </div>
  );
};

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

export default SubtitleEditor;