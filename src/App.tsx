import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Video, Languages, Volume2, Subtitles } from 'lucide-react';
import VideoProcessor from './components/VideoProcessor';
import SubtitleEditor from './components/SubtitleEditor';
import AudioDubber from './components/AudioDubber';

function App() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'upload' | 'process' | 'subtitle' | 'dub'>('upload');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setCurrentStep('process');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  const renderStep = () => {
    switch (currentStep) {
      case 'upload':
        return (
          <div 
            {...getRootProps()} 
            className="w-full max-w-2xl p-12 border-4 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors"
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4 text-center">
              <Upload className="w-16 h-16 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700">
                {isDragActive ? 'Solte o vídeo aqui' : 'Arraste um vídeo ou clique para selecionar'}
              </h3>
              <p className="text-gray-500">Suporta MP4, MOV e AVI</p>
            </div>
          </div>
        );
      case 'process':
        return (
          <VideoProcessor 
            videoFile={videoFile!}
            onProcessingComplete={() => setCurrentStep('subtitle')}
            setProcessing={setProcessing}
          />
        );
      case 'subtitle':
        return (
          <SubtitleEditor
            onComplete={() => setCurrentStep('dub')}
          />
        );
      case 'dub':
        return (
          <AudioDubber />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tradutor de Vídeos para Português
          </h1>
          <p className="text-lg text-gray-600">
            Traduza seus vídeos para português com legendas sincronizadas e dublagem
          </p>
        </header>

        <div className="flex justify-center mb-12">
          <div className="flex space-x-8">
            <StepIndicator 
              icon={<Upload />}
              label="Upload"
              active={currentStep === 'upload'}
              completed={currentStep !== 'upload'}
            />
            <StepIndicator 
              icon={<Video />}
              label="Processamento"
              active={currentStep === 'process'}
              completed={currentStep === 'subtitle' || currentStep === 'dub'}
            />
            <StepIndicator 
              icon={<Subtitles />}
              label="Legendas"
              active={currentStep === 'subtitle'}
              completed={currentStep === 'dub'}
            />
            <StepIndicator 
              icon={<Volume2 />}
              label="Dublagem"
              active={currentStep === 'dub'}
              completed={false}
            />
          </div>
        </div>

        <div className="flex justify-center">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  completed: boolean;
}

function StepIndicator({ icon, label, active, completed }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
          active
            ? 'bg-blue-500 text-white'
            : completed
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-500'
        }`}
      >
        {icon}
      </div>
      <span className={`text-sm ${active ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  );
}

export default App;