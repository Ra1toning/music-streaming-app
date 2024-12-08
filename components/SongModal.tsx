'use client'

import useSongModal from "@/hooks/useSongModal";
import Modal from "./Modal"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { userUser } from "@/hooks/useUser";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import useGetArtists from "@/hooks/useGetArtists";
import React from "react";
import { PuffLoader } from "react-spinners";
import ModalArtistSelection from "./ModalArtistSelection";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

const SongModal = () => {
    const songModal = useSongModal();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { user } =  userUser();

    const { artists, isLoading: artistLoading } = useGetArtists();

    const [isLoading, setIsLoading] = useState(false);

    const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            title: "",
            song_uri: null,
            image_uri: null,
            user_id: "",
            artist_id: "",
        }
    });

    const onChange = (open : boolean) => {
        if(!open) {
          reset();
          songModal.onClose();
        }
    };

    const onSubmit : SubmitHandler<FieldValues> = async (data) => {
      try {
        setIsLoading(true);

        const pictureFile = data?.image_uri?.[0];
        const songFile = data?.song_uri?.[0];

        if(!pictureFile || !songFile || !selectedArtistId) {
          toast.error("Please select a song and image file");
          return
        }

        const uniqueId = nanoid();

        const {data : imageData, error : imageError} = await supabaseClient.storage.from("images").upload(`song-cover-image-${uniqueId}`, pictureFile, 
        {
          cacheControl: "3600",
          upsert: false,
        });

        if(imageError) {
          setIsLoading(false);
          return toast.error("An error occurred while uploading the image file");
        }

        const {data : songData, error : songError} = await supabaseClient.storage.from("songs").upload(`song-audio-file-${uniqueId}`, songFile, 
        {
          cacheControl: "3600",
          upsert: false,
        });

        if(songError) {
          setIsLoading(false);
          return toast.error("An error occurred while uploading the song file");
        }

        const {error : supabaseError } = await supabaseClient
        .from("songs")
        .insert(
          {
            title: data?.title,
            song_uri: songData.path,
            image_uri: imageData.path,
            user_id: user?.id,
            artist_id: selectedArtistId,
          }
        )

        if(supabaseError) {
          setIsLoading(false);
          return toast.error("An error occurred while creating the song");
        }

        setIsLoading(false);
        toast.success("Song created successfully");
        reset();
        songModal.onClose();
        router.refresh();

      } catch (error) {
        toast.error("An error occurred while creating the song");
      } finally {
        setIsLoading(false);
      }
    };

    const handleSelectedArtist = (id : string) => {
      setSelectedArtistId((prevId) => (prevId === id ? null : id));
    };

  return (
    <Modal title="Add a new song" description="Create your own song" isOpen={songModal.isOpen} onChange={onChange}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div>
          <div className="pb-1">Enter song title</div>
          <Input
            id="title"
            disabled={isLoading}
            {...register("title", { required: true })}
            placeholder="Title"
          />
        </div>
        {errors?.title && (
          <div className="w-full flex items-end justify-end">
            <p className="text-xs text-red-500">Song title is required</p>
          </div>
        )}

        <div>
          <div className="pb-1">Select a image file</div>
          <Input
            id="image_uri"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image_uri", { required: true })}
            placeholder="Cover Image"
          />
        </div>

        <div>
          <div className="pb-1">Select an audio file</div>
          <Input
            id="song_uri"
            type="file"
            disabled={isLoading}
            accept="audio/*"
            {...register("song_uri", { required: true })}
            placeholder="Song audio file"
          />
        </div>
        {errors?.title && (
          <div className="w-full flex items-end justify-end">
            <p className="text-xs text-red-500">Song file is required</p>
          </div>
        )}
         <div>
          <div className="pb-1">Choose an artist</div>
          <div className="grid grid-cols-3 gap-2 py-4 cursor-pointer">
            {artistLoading ? (
              <React.Fragment>
                <div className="w-full flex items-center justify-center col-span-3">
                  <PuffLoader size={50} color="#10B981" />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {artists?.map((artist) => (
                  <ModalArtistSelection key={artist.id} data={artist} onClick={() => handleSelectedArtist(artist.id)} selected={selectedArtistId === artist.id}/>
                ))}
              </React.Fragment>
            )}
          </div>
        </div>
          
        <Button disabled={isLoading} type="submit">Create</Button>
        </form>
    </Modal>
  )
}

export default SongModal