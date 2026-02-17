import React, { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import { collection, query, where, getDocs, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Loader2,
  Upload,
  Link as LinkIcon,
  ZoomIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ImageGallery({ pathologyId }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadImages();
  }, [pathologyId, user]);

  const getImageDocRef = () => doc(db, 'users', user.uid, 'images', pathologyId);

  const loadImages = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const snapshot = await getDocs(
        query(collection(db, 'users', user.uid, 'images'), where('pathologyId', '==', pathologyId))
      );
      if (!snapshot.empty) {
        setImages(snapshot.docs[0].data().urls || []);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
    setIsLoading(false);
  };

  const saveImages = async (updatedImages) => {
    await setDoc(getImageDocRef(), {
      pathologyId,
      urls: updatedImages,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    setImages(updatedImages);
  };

  const handleAddUrl = async () => {
    if (!newUrl.trim()) return;
    setIsUploading(true);
    try {
      await saveImages([...images, newUrl.trim()]);
      setNewUrl('');
    } catch (error) {
      console.error('Error adding image:', error);
    }
    setIsUploading(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result;
        await saveImages([...images, dataUrl]);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
    }
  };

  const handleRemove = async (index) => {
    if (!confirm(t('pathology.deleteImageConfirm'))) return;
    try {
      const updatedImages = images.filter((_, i) => i !== index);
      await saveImages(updatedImages);
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  return (
    <Card className="border-gray-200 dark:border-slate-700 shadow-sm dark:bg-slate-800">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-b border-gray-200 dark:border-slate-700">
        <CardTitle className="flex items-center gap-2 text-lg dark:text-gray-100">
          <ImageIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          {t('pathology.images')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        {/* Agregar imagen */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder={t('pathology.addImageUrl')}
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="pl-10 dark:bg-slate-900 dark:border-slate-700 dark:text-gray-100"
              />
            </div>
            <Button
              onClick={handleAddUrl}
              disabled={!newUrl.trim() || isUploading}
              className="bg-purple-500 hover:bg-purple-600"
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            </Button>
          </div>

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <Button variant="outline" className="w-full border-dashed border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50">
              {isUploading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              {t('pathology.uploadImage')}
            </Button>
          </div>
        </div>

        {/* Gallery */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
          </div>
        ) : images.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">
            {t('pathology.noImages')}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <AnimatePresence>
              {images.map((url, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700"
                >
                  <img
                    src={url}
                    alt={`Imagen ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE0Ij5FcnJvcjwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{t('pathology.enlargedView')}</DialogTitle>
                        </DialogHeader>
                        <img src={url} alt={t('pathology.enlargedView')} className="w-full h-auto max-h-[70vh] object-contain" />
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 p-0"
                      onClick={() => handleRemove(idx)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
