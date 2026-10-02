import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MEMORY_STORAGE_KEY = 'kiwii-shared-memories';
const OWNED_MEMORY_KEY = 'kiwii-owned-memories';
const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatDate(date) {
  if (!date) return '';
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL('image/jpeg', 0.78));
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('That photo could not be opened. Please try another image.'));
    };
    image.src = objectUrl;
  });
}

function Modal({ title, children, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div className="diary-modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="diary-modal" role="dialog" aria-modal="true" aria-labelledby="diary-modal-title">
        <button className="diary-modal-close" type="button" onClick={onClose} aria-label="Close">×</button>
        <p className="diary-eyebrow">a little piece of your heart</p>
        <h2 id="diary-modal-title">{title}</h2>
        {children}
      </section>
    </div>
  );
}

export default function SharedMemoryDiary() {
  const [memories, setMemories] = useState(() => readList(MEMORY_STORAGE_KEY));
  const [ownedIds, setOwnedIds] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(OWNED_MEMORY_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [modal, setModal] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const syncFromStorage = (event) => {
      if (event.key === MEMORY_STORAGE_KEY) setMemories(readList(MEMORY_STORAGE_KEY));
    };
    window.addEventListener('storage', syncFromStorage);
    return () => window.removeEventListener('storage', syncFromStorage);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.diary-section');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

    sections.forEach((section) => {
      section.classList.add('diary-section-reveal');
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!photoPreview.startsWith('blob:')) return undefined;
    return () => URL.revokeObjectURL(photoPreview);
  }, [photoPreview]);

  function openMemoryForm() {
    setPhotoFile(null);
    setPhotoPreview('');
    setFormError('');
    setModal('memory');
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFormError('Please choose an image file, like a JPG or PNG.');
      event.target.value = '';
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setFormError('That photo is a little too large. Please choose one under 8 MB.');
      event.target.value = '';
      return;
    }
    setFormError('');
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function submitMemory(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!photoFile) {
      setFormError('Add a photo first so this memory has a little picture to keep.');
      return;
    }
    try {
      const image = await compressImage(photoFile);
      const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
      const memory = {
        id,
        image,
        title: form.get('title').trim(),
        message: form.get('message').trim(),
        date: form.get('date'),
        dedication: form.get('dedication').trim(),
        createdAt: new Date().toISOString(),
      };
      const nextMemories = [memory, ...memories];
      const nextOwnedIds = [...ownedIds, id];
      saveList(MEMORY_STORAGE_KEY, nextMemories);
      sessionStorage.setItem(OWNED_MEMORY_KEY, JSON.stringify(nextOwnedIds));
      setMemories(nextMemories);
      setOwnedIds(nextOwnedIds);
      setModal('');
    } catch (error) {
      setFormError(error.name === 'QuotaExceededError'
        ? 'Your browser is running low on saved space. Try a smaller photo.'
        : error.message || 'This memory could not be saved. Please try again.');
    }
  }

  function deleteMemory(id) {
    const nextMemories = memories.filter((memory) => memory.id !== id);
    try {
      saveList(MEMORY_STORAGE_KEY, nextMemories);
      setMemories(nextMemories);
      const nextOwnedIds = ownedIds.filter((ownedId) => ownedId !== id);
      sessionStorage.setItem(OWNED_MEMORY_KEY, JSON.stringify(nextOwnedIds));
      setOwnedIds(nextOwnedIds);
    } catch {
      setFormError('This memory could not be removed right now.');
    }
  }

  return (
    <div className="shared-diary">
      <nav className="diary-nav" aria-label="Memory diary navigation">
        <Link to="/">Our Story ❤️</Link>
        <a href="#our-memories">Memories 📸</a>
        <button type="button" onClick={openMemoryForm}>Add Memory 💕</button>
      </nav>

      <section className="diary-section" id="our-memories" aria-labelledby="visitor-memories-title">
        <div className="diary-section-heading">
          <p className="diary-eyebrow">little moments, kept close</p>
          <h2 id="visitor-memories-title">Create Your Own Memory ❤️</h2>
          <p>Your story belongs here too. Add a photo and keep a little moment safe.</p>
          <button className="cute-button diary-primary" type="button" onClick={openMemoryForm}>Add Your Memory 💕</button>
        </div>

        {memories.length ? (
          <div className="visitor-memory-grid">
            {memories.map((memory) => (
              <article className="visitor-memory-card" key={memory.id}>
                <div className="visitor-memory-image-wrap">
                  <img src={memory.image} alt={memory.title} width="640" height="480" loading="lazy" decoding="async" />
                  <span className="memory-sparkle" aria-hidden="true">✦</span>
                </div>
                <div className="visitor-memory-copy">
                  {memory.date && <time dateTime={memory.date}>{formatDate(memory.date)}</time>}
                  <h3>{memory.title}</h3>
                  {memory.message && <p>{memory.message}</p>}
                  {memory.dedication && <blockquote>For you, with love: “{memory.dedication}”</blockquote>}
                  {ownedIds.includes(memory.id) && (
                    <button className="diary-delete" type="button" onClick={() => deleteMemory(memory.id)}>Delete my memory</button>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="diary-empty">
            <span aria-hidden="true">🌷</span>
            <p>Your story is waiting for its next little memory... 💕</p>
            <button type="button" className="cute-button diary-primary" onClick={openMemoryForm}>+ Add Your First Memory</button>
          </div>
        )}
      </section>

      {modal === 'memory' && (
        <Modal title="Add Your Memory 💕" onClose={() => setModal('')}>
          <form className="diary-form" onSubmit={submitMemory}>
            <label className="photo-picker">
              <input type="file" accept="image/*" capture="environment" onChange={handlePhotoChange} />
              {photoPreview ? <img src={photoPreview} alt="Preview of your memory" width="640" height="480" decoding="async" /> : <span className="photo-picker-empty"><strong>＋ Add Photo</strong><small>Choose a moment from your gallery</small></span>}
            </label>
            <label>Memory Title<input name="title" required maxLength="80" placeholder="That First Coffee ☕❤️" /></label>
            <label>Short Memory / Message<textarea name="message" required maxLength="300" rows="3" placeholder="One of those little moments I never want to forget..." /></label>
            <label>Memory Date<input name="date" type="date" required /></label>
            <label>For You <span className="optional-label">optional</span><textarea name="dedication" maxLength="180" rows="2" placeholder="A little note for someone special..." /></label>
            {formError && <p className="diary-form-error" role="alert">{formError}</p>}
            <button type="submit" className="cute-button diary-primary">Save Memory 💗</button>
          </form>
        </Modal>
      )}

    </div>
  );
}