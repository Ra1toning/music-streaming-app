'use client'

import React from 'react';
import { Artist, Albums } from "@/types";
import AlbumItem from './AlbumItem';
import {  
  Carousel,  
  CarouselContent,  
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface PageContentProps { 
    albums: Albums[]; 
    artists: Artist[]; 
    title?: string; 
}; 

const PageContent : React.FC<PageContentProps> = ({ 
    albums, 
    artists, 
    title = "Albums" 
}) => { 
    if (albums?.length === 0) { 
        return ( 
            <div className="mt-4 text-neutral-400 w-full flex items-center justify-center"> 
                No albums found 
            </div> 
        ); 
    } 

    return ( 
        <div className="mt-8 mx-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-white text-2xl font-semibold">{title}</h1>
            </div>
            <Carousel  
                opts={{ 
                    align: "start", 
                    loop: true,
                    slidesToScroll: 2, 
                }} 
                className="w-full relative" 
            > 
                <CarouselContent className="flex gap-4 md:gap-6 lg:gap-8">
                    {albums.map((album) => ( 
                        <CarouselItem 
                            key={album.id}  
                            className="sm:basis-auto lg:basis-auto" 
                        > 
                            <AlbumItem 
                                data={album} 
                                artist={artists.find((artist) => artist.id === album.artist_id)} 
                                 
                            /> 
                        </CarouselItem> 
                    ))} 
                </CarouselContent>
                <div className="absolute -top-10 right-10 flex space-x-0">
                    <CarouselPrevious className="rounded-full p-2 bg-white/10 text-white hover:bg-white/20 transition" />
                    <CarouselNext className="rounded-full p-2 bg-white/10 text-white hover:bg-white/20 transition" />
                </div>
            </Carousel>
        </div>
    ); 
}; 

export default PageContent;