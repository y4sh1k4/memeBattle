import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateMeme() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Meme uploaded successfully! 🎉', {
      description: 'Your meme has been added to the battle queue.',
    });
    setPreview(null);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex w-screen items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-4xl mx-auto p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Create New Meme</h2>
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg">Meme Title</Label>
            <Input id="title" placeholder="Enter a catchy title" required className="text-lg h-12" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image" className="text-lg">Upload Meme</Label>
            <div 
              className="border-2 border-dashed rounded-lg p-8 md:p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => document.getElementById('image')?.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-[500px] mx-auto rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center py-12">
                  <ImagePlus className="h-20 w-20 mb-6 text-muted-foreground" />
                  <p className="text-xl text-muted-foreground mb-2">
                    Drop your meme here or click to upload
                  </p>
                </div>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full text-lg h-12">
            Submit Meme
          </Button>
        </form>
      </Card>
    </div>
  );
}