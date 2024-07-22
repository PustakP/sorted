import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession } from 'next-auth/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  const uploadImage = async (file: File) => {
    console.log(`Uploading image: ${file.name}`);
    const formData = new FormData();
    formData.append('key', '0a0e1aa641bdc532b0a53640ea1e0583');
    formData.append('image', file);

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

    try {
      console.log('Starting product upload process...');
      const imageUrl = await uploadImage(image);
      let imageUrl2 = '';
      let imageUrl3 = '';

      if (image2) {
        imageUrl2 = await uploadImage(image2);
      }
      if (image3) {
        imageUrl3 = await uploadImage(image3);
      }
    
      const nextId = await getNextId();

      console.log('Inserting product data into Supabase...');
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
        <Button type="submit">
          Upload Product
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
      {isUploaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h2 className="text-6xl text-white font-bold">Product Uploaded!</h2>
        </div>
      )}
    </div>
  );
}