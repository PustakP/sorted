import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession } from 'next-auth/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import imageCompression from 'browser-image-compression';
import Image from 'next/image';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProductUploadForm() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState('');
  const [imageLink2, setImageLink2] = useState('');
  const [imageLink3, setImageLink3] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [lastId, setLastId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progressText, setProgressText] = useState('');

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return file;
    }
  };

  const uploadImage = async (file: File) => {
    console.log(`Compressing and uploading image: ${file.name}`);
    const compressedFile = await compressImage(file);
    
    const formData = new FormData();
    formData.append('key', '0a0e1aa641bdc532b0a53640ea1e0583');
    formData.append('image', compressedFile);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(`Image uploaded successfully: ${data.data.url}`);
    return data.data.url;
  };
  const getNextId = async () => {
    const { data, error } = await supabase
      .from('images')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching last ID:', error);
      return lastId + 1;
    }

    const nextId = data && data.length > 0 ? data[0].id + 1 : 1;
    setLastId(nextId);
    return nextId;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setIsLoading(true);
    setProgressText('Starting upload process...');

    try {
      setProgressText('Compressing and uploading main image...');
      const imageUrl = await uploadImage(image);
      let imageUrl2 = '';
      let imageUrl3 = '';

      if (image2) {
        setProgressText('Compressing and uploading additional image 1...');
        imageUrl2 = await uploadImage(image2);
      }
      if (image3) {
        setProgressText('Compressing and uploading additional image 2...');
        imageUrl3 = await uploadImage(image3);
      }
    
      setProgressText('Preparing to insert data into database...');
      const nextId = await getNextId();

      setProgressText('Inserting product data into database...');
      const { error } = await supabase
        .from('images')
        .insert({
          id: nextId,
          name,
          image_link: imageUrl,
          image_link2: imageUrl2,
          image_link3: imageUrl3,
          price: parseInt(price),
          user: session?.user?.name || 'Anonymous',
          timest: new Date().toISOString(),
        });

    if (error) {
        console.error('Supabase error:', error);
        throw error;
        }
      setProgressText('Product uploaded successfully!');

      console.log('Product uploaded successfully!');
      setImageLink(imageUrl);
      setImageLink2(imageUrl2);
      setImageLink3(imageUrl3);
      setName('');
      setPrice('');
      setImage(null);
      setImage2(null);
      setImage3(null);
      setIsUploaded(true);
    } catch (error) {
      console.error('Error uploading product:', error);
      setProgressText('Error occurred during upload.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="image">Product Image (Required)</Label>
          <Input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />
        </div>
        <div>
          <Label htmlFor="image2">Additional Image 1 (Optional)</Label>
          <Input
            type="file"
            id="image2"
            onChange={(e) => setImage2(e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <Label htmlFor="image3">Additional Image 2 (Optional)</Label>
          <Input
            type="file"
            id="image3"
            onChange={(e) => setImage3(e.target.files?.[0] || null)}
          />
        </div>
        <Button className="text-white" type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Product'}
        </Button>
        {imageLink && (
          <div className="mt-4">
            <p>Uploaded images:</p>
            <img src={imageLink} alt="Uploaded product" className="mt-2 max-w-xs" />
            {imageLink2 && <img src={imageLink2} alt="Additional image 1" className="mt-2 max-w-xs" />}
            {imageLink3 && <img src={imageLink3} alt="Additional image 2" className="mt-2 max-w-xs" />}
          </div>
        )}
      </form>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white bg-opacity-90 rounded-lg p-6 flex flex-col items-center">
            <Image src="/loading.gif" alt="Loading" width={100} height={100} />
            <p className="mt-4 text-black">{progressText}</p>
          </div>
        </div>
      )}

      {isUploaded && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h2 className="text-6xl text-white font-bold">Product Uploaded!</h2>
        </div>
      )}
    </div>
  );
}