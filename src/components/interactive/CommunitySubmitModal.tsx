import React, { useState } from 'react';

export interface CategoryOption {
  value: string;
  label: string;
}

export interface CommunitySubmitModalProps {
  badge?: string;
  title?: string;
  description?: string;
  nameLabel?: string;
  titleLabel?: string;
  categoryLabel?: string;
  uploadLabel?: string;
  buttonText?: string;
  categories?: CategoryOption[];
}

export const defaultCategories: CategoryOption[] = [
  { value: 'nails', label: 'Nail Art & Beauty' },
  { value: 'fashion', label: 'Fashion & OOTD' },
  { value: 'decor', label: 'Cozy Room Decor' },
  { value: 'sketch', label: 'Digital Art & Sketch' }
];

export default function CommunitySubmitModal({
  badge = 'Community Showcase',
  title = '✨ Submit Your Creation',
  description = 'Share your nail art, outfit check, room setup, or digital sketch to be featured on TeenTimeGlow.',
  nameLabel = 'Your Name / Handle *',
  titleLabel = 'Creation Title *',
  categoryLabel = 'Category *',
  uploadLabel = 'Upload Photo / Mockup',
  buttonText = "Submit To Rini's Gallery ✨",
  categories = defaultCategories
}: CommunitySubmitModalProps) {
  const [name, setName] = useState('');
  const [creationTitle, setCreationTitle] = useState('');
  const [category, setCategory] = useState('nails');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('submitModal');
    if (modal) modal.classList.remove('active');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !creationTitle.trim()) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', creationTitle);
    formData.append('category', category);
    if (file) formData.append('file', file);

    try {
      const res = await fetch('/api/community/submit', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.success) {
        if (typeof window !== 'undefined' && (window as any).showToast) {
          (window as any).showToast('🎉 Submitted! Rini will review your creation shortly.', '✨');
        }
        if (typeof window !== 'undefined' && (window as any).confetti) {
          (window as any).confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
        }
        setName('');
        setCreationTitle('');
        setFile(null);
        setPreviewUrl(null);
        closeModal();
      } else {
        alert(data.error || 'Submission failed');
      }
    } catch (err: any) {
      alert('Error submitting: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-box">
      <button type="button" className="modal-close-btn" onClick={closeModal}>
        &times;
      </button>

      <div style={{ marginBottom: '20px' }}>
        <span className="section-pill-tag">{badge}</span>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '8px' }}>{title}</h3>
        <p style={{ fontSize: '0.9rem', color: '#4B5563', marginTop: '4px' }}>{description}</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label htmlFor="submitAuthorName" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
            {nameLabel}
          </label>
          <input
            id="submitAuthorName"
            name="authorName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="@yourhandle"
            required
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label htmlFor="submitCreationTitle" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
            {titleLabel}
          </label>
          <input
            id="submitCreationTitle"
            name="creationTitle"
            type="text"
            value={creationTitle}
            onChange={(e) => setCreationTitle(e.target.value)}
            placeholder="e.g. Cozy Bedroom Desk Corner"
            required
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label htmlFor="submitCategorySelect" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
            {categoryLabel}
          </label>
          <select
            id="submitCategorySelect"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '0.9rem', background: '#fff', boxSizing: 'border-box' }}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="submitFileInput" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
            {uploadLabel}
          </label>
          <input
            id="submitFileInput"
            name="file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ fontSize: '0.85rem', color: '#4B5563' }}
          />
          {previewUrl && (
            <div style={{ marginTop: '10px' }}>
              <img
                src={previewUrl}
                alt="Preview"
                style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-black-pill magnetic-btn"
          style={{ justifyContent: 'center', padding: '12px', marginTop: '10px', opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? 'Submitting to Quarantine...' : buttonText}
        </button>
      </form>
    </div>
  );
}
