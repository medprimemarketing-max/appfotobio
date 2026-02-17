import React, { useState, useEffect } from 'react';
import { db } from '@/config/firebase';
import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Edit3, Plus, Trash2, Loader2, StickyNote } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClinicalNotesSection({ pathologyId }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadNotes();
  }, [pathologyId, user]);

  const loadNotes = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const notesRef = collection(db, 'users', user.uid, 'notes');
      const q = query(notesRef, where('pathologyId', '==', pathologyId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setNotes(data);
    } catch (error) {
      console.error('Error loading notes:', error);
      setNotes([]);
    }
    setIsLoading(false);
  };

  const handleSaveNew = async () => {
    if (!newNote.trim() || !user) return;
    setIsSaving(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'notes'), {
        pathologyId,
        content: newNote.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setNewNote('');
      await loadNotes();
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Error al guardar la nota. Por favor intenta nuevamente.');
    }
    setIsSaving(false);
  };

  const handleUpdate = async (id) => {
    if (!editContent.trim()) return;
    setIsSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid, 'notes', id), {
        content: editContent.trim(),
        updatedAt: serverTimestamp(),
      });
      setEditingId(null);
      setEditContent('');
      await loadNotes();
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Error al actualizar la nota.');
    }
    setIsSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm(t('pathology.deleteConfirm'))) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'notes', id));
      await loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Error al eliminar la nota.');
    }
  };

  return (
    <Card className="border-gray-200 dark:border-slate-700 shadow-sm dark:bg-slate-800">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-b border-gray-200 dark:border-slate-700">
        <CardTitle className="flex items-center gap-2 text-lg dark:text-gray-100">
          <StickyNote className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          {t('pathology.clinicalNotes')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        {/* Nueva nota */}
        <div className="space-y-3">
          <Textarea
            placeholder={t('pathology.addNotePlaceholder')}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px] resize-none border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100 focus:border-amber-400 focus:ring-amber-400"
          />
          <Button
            onClick={handleSaveNew}
            disabled={!newNote.trim() || isSaving}
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            {t('pathology.addNote')}
          </Button>
        </div>

        {/* Lista de notas */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
          </div>
        ) : notes.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">
            {t('pathology.noNotes')}
          </p>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-slate-700"
                >
                  {editingId === note.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[80px] resize-none"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleUpdate(note.id)}
                          disabled={isSaving}
                          className="bg-amber-500 hover:bg-amber-600"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          {t('pathology.save')}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          {t('pathology.cancel')}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">{note.content}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(note.createdAt?.toDate?.() || note.createdAt).toLocaleDateString(undefined, {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingId(note.id);
                              setEditContent(note.content);
                            }}
                            className="text-gray-500 hover:text-amber-600"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(note.id)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
}
