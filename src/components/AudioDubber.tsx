import React, { useState } from 'react';
import { Volume2, Play, Pause, RotateCcw } from 'lucide-react';

const AudioDubber: React.FC = () => {
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-lg">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Geração de Áudio</h3>

        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-medium text-gray-700 mb-3">Configurações de Voz</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Tipo de Voz
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="male">Masculina</option>
                  <option value="female">Feminina</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Velocidade da Fala
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  defaultValue="1"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Tom de Voz
                </label>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  defaultValue="0"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {preview && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-medium text-gray-700 mb-3">Preview</h4>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setPlaying(!playing)}
                  className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  {playing ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <div className="flex-grow">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <span className="text-sm text-gray-600">01:23 / 02:45</span>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => {
                setGenerating(true);
                setTimeout(() => {
                  setGenerating(false);
                  setPreview(true);
                }, 3000);
              }}
              disabled={generating}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${
                generating
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <Volume2 size={20} />
              <span>{generating ? 'Gerando...' : 'Gerar Áudio'}</span>
            </button>

            <button
              onClick={() => {
                setPreview(false);
                setPlaying(false);
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center space-x-2"
            >
              <RotateCcw size={20} />
              <span>Recomeçar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioDubber;