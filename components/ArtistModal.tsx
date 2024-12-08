import useArtistModal from "@/hooks/useArtistModal";
import Modal from "./Modal"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { userUser } from "@/hooks/useUser";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const ArtistModal = () => {
    const artistModal = useArtistModal();
    const { user } = userUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            author: "",
            description: "",
            followers: 0,
            picture: null,
            instagram: "",
        }
    });

    const onChange = (open : boolean) => {
        if(!open) {
          reset();
          artistModal.onClose();
        }
    }

    const onSubmit : SubmitHandler<FieldValues> = async (data) => {
      try {
        setIsLoading(true);

        const pictureFile = data?.picture?.[0];

        if(!pictureFile || !user || errors.author) { 
          toast.error("Please fill all the fields");
          return;
        }

        const uniqueId = nanoid();

        const {data : imageData, error: imageError} = await supabaseClient.storage.from("images").upload(`artist-images-${uniqueId}`, pictureFile,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

        if(imageError) {
          setIsLoading(false);
          return toast.error("An error occurred while uploading the image");
        }

        const {error: supabaseError} = await supabaseClient.from("artist").insert({
          author: data.author,
          description: data.description,
          followers: 0,
          picture: imageData.path,
          instagram: data.instagram,
        });

        if(supabaseError) {
          setIsLoading(false);
          return toast.error("An error occurred while creating the artist");
        }

        toast.success("Artist created successfully");
        reset();
        artistModal.onClose();
        router.refresh();
      } catch (error) {
        return toast.error("An error occurred while creating the artist");
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <Modal title="Add a new artist!" description="Create your own artist over here" isOpen={artistModal.isOpen} onChange={onChange} >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
         
          <div>
            <div className="pb-1">Enter artist's name</div>
            <Input
              id="author"
              disabled={isLoading}
              {...register("author", { required: true })}
              placeholder="Name"
            />
          </div>
          {errors?.author && (
            <div className="w-full flex items-end justify-end">
              <p className="text-xs text-red-500">Author name is required</p>
            </div>
          )}
          <div>
            <div className="pb-1">Enter a description</div>
            <Input
              id="description"
              disabled={isLoading}
              {...register("description", { required: true })}
              placeholder="Description"
            />
          </div>

          <div>
            <div className="pb-1">Select an image file</div>
            <Input
              id="image"
              disabled={isLoading}
              type="file"
              accept="image/*"
              {...register("picture", { required: true })}
              placeholder="Image"
            />
          </div>
          {errors?.picture && (
            <div className="w-full flex items-end justify-end">
              <p className="text-xs text-red-500">Image is required</p>
            </div>
          )}
          <div>
            <div className="pb-1">Enter artist's Instagram</div>
            <Input
              id="instagram"
              disabled={isLoading}
              {...register("instagram", { required: true })}
              placeholder="www.instagram.com/sonara"
            />
          </div>


          <Button disabled={isLoading} type="submit">Create</Button>
        </form>
    </Modal>
  )
}

export default ArtistModal