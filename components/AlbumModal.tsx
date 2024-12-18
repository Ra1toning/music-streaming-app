'use client';

import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';

import Input from './Input';
import Button from './Button';
import Modal from './Modal';
import ModalArtistSelection from './ModalArtistSelection';
import { PuffLoader } from 'react-spinners';

import useAlbumModal from '@/hooks/useAlbumModal';
import { userUser } from '@/hooks/useUser';
import useGetArtists from '@/hooks/getArtists';

interface SongEntry {
  id: string;
  title: string;
  songFile: File | null;
  imageFile: File | null;
}

const STEPS = {
  ALBUM_INFO: 1,
  ARTIST_SELECT: 2,
  ADD_SONGS: 3,
};

const genres = [
  { label: 'Select a genre (optional)', value: '' },
  { label: 'Pop', value: 'Pop' },
  { label: 'Rock', value: 'Rock' },
  { label: 'Jazz', value: 'Jazz' },
  { label: 'Hip-Hop', value: 'Hip-Hop' },
  { label: 'Classical', value: 'Classical' },
  { label: 'Electronic', value: 'Electronic' },
  { label: 'Country', value: 'Country' },
  { label: 'J-Pop', value: 'pop' },
];

const AlbumModal = () => {
  const albumModal = useAlbumModal();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { user } = userUser();
  const { artists, isLoading: artistLoading } = useGetArtists();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [songs, setSongs] = useState<SongEntry[]>([]);
  const [expandedSongId, setExpandedSongId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(STEPS.ALBUM_INFO);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      img_uri: null,
      artist_id: '',
      description: '',
      genre: '',
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      setSongs([]);
      setSelectedArtistId(null);
      setCurrentStep(STEPS.ALBUM_INFO);
      albumModal.onClose();
    }
  };

  const handleSelectedArtist = (id: string) => {
    setSelectedArtistId((prevId) => (prevId === id ? null : id));
  };

  const addSongEntry = () => {
    setSongs([...songs, { id: nanoid(), title: '', songFile: null, imageFile: null }]);
    setExpandedSongId(null);
  };

  const updateSongEntry = (id: string, field: keyof SongEntry, value: string | File | null ) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === id ? { ...song, [field]: value } : song
      )
    );
  };

  const removeSongEntry = (id: string) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
  };

  const toggleSongEntry = (id: string) => {
    setExpandedSongId((prevId) => (prevId === id ? null : id));
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      if (!selectedArtistId) {
        toast.error('Please select an artist.');
        setCurrentStep(STEPS.ARTIST_SELECT);
        setIsLoading(false);
        return;
      }

      if (songs.length === 0) {
        toast.error('Please add at least one song.');
        setCurrentStep(STEPS.ADD_SONGS);
        setIsLoading(false);
        return;
      }

      for (const song of songs) {
        if (!song.title || !song.songFile || !song.imageFile) {
          toast.error('Please complete all song details before submitting.');
          setCurrentStep(STEPS.ADD_SONGS);
          setIsLoading(false);
          return;
        }
      }

      const albumCoverFile = data.img_uri?.[0];
      let albumImagePath = null;

      if (albumCoverFile) {
        const uniqueAlbumId = nanoid();
        const { data: imageData, error: imageError } = await supabaseClient.storage
          .from('images')
          .upload(`album-cover-${uniqueAlbumId}`, albumCoverFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (imageError) throw new Error('Error uploading album cover');
        albumImagePath = imageData.path;
      }
      const albumLink = nanoid();

      const { data: albumData, error: albumError } = await supabaseClient
        .from('albums')
        .insert({
          title: data.title,
          description: data.description,
          img_uri: albumImagePath,
          artist_id: selectedArtistId,
          albumLink: albumLink,
          genre: data.genre || null,
        })
        .select()
        .single();

      if (albumError) throw new Error('Error creating album');

      for (const song of songs) {
        const uniqueSongId = nanoid();

        const { data: imageData, error: imageError } = await supabaseClient.storage
          .from('images')
          .upload(`song-cover-image-${uniqueSongId}`, song.imageFile!, {
            cacheControl: '3600',
            upsert: false,
          });

        if (imageError) {
          toast.error(`Error uploading image for song: ${song.title}`);
          continue;
        }

        const { data: songData, error: songError } = await supabaseClient.storage
          .from('songs')
          .upload(`song-audio-file-${uniqueSongId}`, song.songFile!, {
            cacheControl: '3600',
            upsert: false,
          });

        if (songError) {
          toast.error(`Error uploading audio for song: ${song.title}`);
          continue;
        }

        await supabaseClient.from('songs').insert({
          title: song.title,
          song_uri: songData.path,
          image_uri: imageData.path,
          user_id: user?.id,
          artist_id: selectedArtistId,
          album_id: albumData.id,
        });
      }

      toast.success('Album and songs created successfully!');
      router.refresh();
      onChange(false);
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const goNextStep = () => {
    if (currentStep === STEPS.ALBUM_INFO) {
      if (!watch('title') || !watch('img_uri')) {
        toast.error('Please fill the required fields (title and album cover).');
        return;
      }
      setCurrentStep(STEPS.ARTIST_SELECT);
    } else if (currentStep === STEPS.ARTIST_SELECT) {
      if (!selectedArtistId) {
        toast.error('Please select an artist before proceeding.');
        return;
      }
      setCurrentStep(STEPS.ADD_SONGS);
    } 
  };

  const goPrevStep = () => {
    if (currentStep === STEPS.ARTIST_SELECT) {
      setCurrentStep(STEPS.ALBUM_INFO);
    } else if (currentStep === STEPS.ADD_SONGS) {
      setCurrentStep(STEPS.ARTIST_SELECT);
    }
  };

  return (
    <Modal
      title="Create a New Album"
      description="Follow the steps to create your new album."
      isOpen={albumModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Step Indicators */}
        <div className="flex items-center justify-center space-x-4">
          <div className={`h-2 w-2 rounded-full ${currentStep >= STEPS.ALBUM_INFO ? 'bg-blue-500' : 'bg-gray-300'}`} />
          <div className={`h-2 w-2 rounded-full ${currentStep >= STEPS.ARTIST_SELECT ? 'bg-blue-500' : 'bg-gray-300'}`} />
          <div className={`h-2 w-2 rounded-full ${currentStep === STEPS.ADD_SONGS ? 'bg-blue-500' : 'bg-gray-300'}`} />
        </div>

        {currentStep === STEPS.ALBUM_INFO && (
          <div className="p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-3">Step 1: Album Information</h2>
            <p className="text-sm text-neutral-300 mb-4">Enter the basic details of your album.</p>
            <div className="mb-4">
              <label className="block pb-1 font-medium" htmlFor="title">
                Album Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                disabled={isLoading}
                {...register('title', { required: true })}
                placeholder="e.g. My Awesome Album"
              />
              {errors.title && (
                <p className="text-xs text-red-500 mt-1">Album title is required.</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block pb-1 font-medium" htmlFor="description">
                Description (optional)
              </label>
              <Input
                id="description"
                disabled={isLoading}
                {...register('description')}
                placeholder="A short description of the album"
              />
            </div>

            <div className="mb-4">
              <label className="block pb-1 font-medium" htmlFor="genre">
                Genre (optional)
              </label>
              <select
                id="genre"
                disabled={isLoading}
                {...register('genre')}
                className="block w-full rounded border border-neutral-500 p-2 mt-1 bg-neutral-800 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {genres.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block pb-1 font-medium" htmlFor="img_uri">
                Album Cover Image <span className="text-red-500">*</span>
              </label>
              <Input
                id="img_uri"
                type="file"
                disabled={isLoading}
                accept="image/*"
                {...register('img_uri', { required: true })}
                placeholder="Upload album cover"
              />
              {errors.img_uri && (
                <p className="text-xs text-red-500 mt-1">Album cover is required.</p>
              )}
            </div>
          </div>
        )}

        {currentStep === STEPS.ARTIST_SELECT && (
          <div className="p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-3">Step 2: Choose an Artist</h2>
            <p className="text-sm  mb-4">Select the artist associated with this album.</p>

            {artistLoading ? (
              <div className="w-full flex items-center justify-center py-4">
                <PuffLoader size={40} color="#3B82F6" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-4">
                {artists?.map((artist) => (
                  <ModalArtistSelection
                    key={artist.id}
                    data={artist}
                    onClick={() => handleSelectedArtist(artist.id)}
                    selected={selectedArtistId === artist.id}
                  />
                ))}
              </div>
            )}
            {!selectedArtistId && (
              <p className="text-xs text-red-500 mt-1">Please select an artist before proceeding.</p>
            )}
          </div>
        )}

        {currentStep === STEPS.ADD_SONGS && (
          <div className="p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-3">Step 3: Add Songs</h2>
            <p className="text-sm  mb-4">Add and configure your songs here. Each song needs a title, cover image, and audio file.</p>

            <div className="flex justify-between items-center mb-4">

              <Button
                type="button"
                onClick={addSongEntry}
                className=" text-white px-3 py-3 rounded text-sm font-bold"
              >
                Add Song
              </Button>
            </div>

            {songs.length === 0 && (
              <p className="text-sm">No songs added yet. Click "Add Song" to get started.</p>
            )}

            <div className="max-h-64 overflow-y-auto pr-2">
              {songs.map((song) => (
                <div key={song.id} className="borderp-3 mb-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">
                      
                    </div>
                    <Button
                      type="button"
                      onClick={() => toggleSongEntry(song.id)}
                      className="text-sm underline bg-neutral-100 text-black font-bold rounded-sm"
                    >
                      {song.title || 'New Song'}
                    </Button>
                  </div>
                  {expandedSongId === song.id && (
                    <>
                      <div className="mb-3">
                        <label className="block pb-1 font-medium">Song Title</label>
                        <Input
                          placeholder="e.g. Track 1"
                          value={song.title}
                          onChange={(e) =>
                            updateSongEntry(song.id, 'title', e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <label className="block pb-1 font-medium">Song Cover Image</label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            updateSongEntry(song.id, 'imageFile', file);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="block pb-1 font-medium">Song Audio File</label>
                        <Input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            updateSongEntry(song.id, 'songFile', file);
                          }}
                        />
                      </div>

                      <Button
                        type="button"
                        onClick={() => removeSongEntry(song.id)}
                        className="bg-neutral-800 hover:bg-neutral-800 text-white px-3 py-1 text-sm rounded"
                      >
                        Remove Song
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep !== STEPS.ALBUM_INFO && (
            <Button
              type="button"
              onClick={goPrevStep}
              className="bg-neutral-100 hover:bg-neutral-200 text-gray-800 px-4 py-2 rounded"
            >
              Back
            </Button>
          )}

          {currentStep === STEPS.ALBUM_INFO && (
            <Button
              type="button"
              onClick={goNextStep}
              className=" text-white px-4 py-2 rounded"
            >
              Next
            </Button>
          )}

          {currentStep === STEPS.ARTIST_SELECT && (
            <Button
              type="button"
              onClick={goNextStep}
              className=" text-white px-4 py-2 rounded"
            >
              Next
            </Button>
          )}

          {currentStep === STEPS.ADD_SONGS && (
            <Button
              disabled={isLoading}
              type="submit"
              className=" text-white font-medium px-4 py-2 rounded"
            >
              {isLoading ? 'Creating Album...' : 'Create Album'}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AlbumModal;
