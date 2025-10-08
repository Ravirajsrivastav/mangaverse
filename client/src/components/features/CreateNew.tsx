import React, { useState } from 'react';
import { ArrowLeft, Upload, Image as ImageIcon, Loader as Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CreateNew: React.FC = () => {
  const { setCurrentView } = useApp();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [storyPrompt, setStoryPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const genres = [
    'Shonen',
    'Shojo', 
    'Isekai',
    'Seinen',
    'Slice of Life',
    'Cyberpunk'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0] ?? null;
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateManga = async () => {
    if (!uploadedImage || !selectedGenre || !storyPrompt.trim()) {
      return;
    }

    setIsGenerating(true);
    setShowResults(false);
    setErrorMessage(null);

    try {
      const form = new FormData();
      // If we have the original File (preferred), send it; otherwise convert dataURL to blob
      if (uploadedFile) {
        form.append('file', uploadedFile);
      } else {
        // convert base64 data URL to blob
        const res = await fetch(uploadedImage);
        const blob = await res.blob();
        form.append('file', new File([blob], 'upload.png', { type: blob.type }));
      }
      form.append('genre', selectedGenre);
      form.append('prompt', storyPrompt);
      form.append('count', '4');

      const apiUrl = import.meta.env.DEV ? 'http://localhost:4000/api/generate-panels' : '/api/generate-panels';

      const resp = await fetch(apiUrl, {
        method: 'POST',
        body: form
      });

      if (!resp.ok) {
        const errBody = await resp.json().catch(() => null);
        throw new Error(errBody?.error || `Server returned ${resp.status}`);
      }

      const json = await resp.json();
      const images: string[] = json.images ?? [];

      setGeneratedImages(images);
      setShowResults(true);
    } catch (err: any) {
      console.error("Generation error:", err);
      setErrorMessage(err?.message ?? "Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const isFormValid = uploadedImage && selectedGenre && storyPrompt.trim();

  return (
    <div className="min-h-screen bg-manga-cream p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-manga-gray" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-manga-black">Create New Manga</h1>
            <p className="text-manga-lightgray mt-1">Transform your story into stunning manga panels</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Input Controls */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-panel">
            <div className="space-y-8">
              {/* Step 1: Upload Character */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Step 1: Upload Your Character</h3>
                <div
                  className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-manga-red transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">
                    Drag & drop an image of your character, or click to browse
                  </p>
                </div>
                
                {/* Image Preview */}
                {uploadedImage && (
                  <div className="mt-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded character"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-600"
                    />
                  </div>
                )}
              </div>

              {/* Step 2: Choose Genre */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Step 2: Choose a Genre</h3>
                <label className="block text-gray-300 mb-2">Select a Genre</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-manga-red focus:border-manga-red"
                >
                  <option value="">Choose a genre...</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 3: Write Story */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Step 3: Write Your Story</h3>
                <label className="block text-gray-300 mb-2">Enter Your Story Prompt</label>
                <textarea
                  value={storyPrompt}
                  onChange={(e) => setStoryPrompt(e.target.value)}
                  rows={5}
                  placeholder="e.g., A hero discovers a hidden power during their first battle..."
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-manga-red focus:border-manga-red resize-none"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateManga}
                disabled={!isFormValid || isGenerating}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  isFormValid && !isGenerating
                    ? 'bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 shadow-lg'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 size={20} className="animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  'Generate Manga'
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Output Display */}
          <div className="bg-white rounded-xl p-8 shadow-panel">
            {/* Initial State */}
            {!isGenerating && !showResults && (
              <div className="flex flex-col items-center justify-center h-full min-h-96 text-center">
                <ImageIcon size={64} className="text-gray-400 mb-4" />
                <p className="text-xl text-gray-500">Your manga panels will appear here</p>
              </div>
            )}

            {/* Loading State */}
            {isGenerating && (
              <div className="flex flex-col items-center justify-center h-full min-h-96 text-center">
                <Loader2 size={64} className="text-manga-red animate-spin mb-4" />
                <p className="text-xl text-manga-black mb-2">Generating your story...</p>
                <p className="text-manga-lightgray">This may take a moment.</p>
              </div>
            )}

            {/* Success State */}
            {showResults && generatedImages.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-manga-black mb-6 text-center">
                  Your Generated Manga Panels
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200 hover:border-manga-red transition-colors"
                    >
                      <img
                        src={image}
                        alt={`Generated panel ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-4 mt-6">
                  <button className="flex-1 py-3 px-6 bg-manga-red text-white rounded-lg font-semibold hover:bg-manga-darkred transition-colors">
                    Save to Project
                  </button>
                  <button className="flex-1 py-3 px-6 border-2 border-manga-red text-manga-red rounded-lg font-semibold hover:bg-manga-red hover:text-white transition-colors">
                    Generate Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNew;