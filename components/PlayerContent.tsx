'use client'

import { Song } from "@/types";
import MediaCards from "./MediaCards";
import usePlayer from "@/hooks/usePlayer";
import useGetArtists from "@/hooks/getArtists";
import { PuffLoader } from "react-spinners";
import { BsFillPauseFill, BsFillPlayFill, BsFillSkipBackwardFill, BsFillSkipForwardFill, BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import VolumeSlider from "./VolumeSlider";
import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

/**
 * PlayerContent компонент нь дуу тоглуулагчийн UI болон функциональ байдлыг хариуцдаг.
 * 
 * @param {PlayerContentProps} props - Компонентийн пропс.
 * @param {Song} props.song - Одоогийн тоглож буй дууны мэдээлэл.
 * @param {string} props.songUrl - Одоогийн тоглож буй дууны URL.
 * 
 * @returns {JSX.Element} - PlayerContent компонентийн JSX.
 * 
 * @component
 * @example
 * <PlayerContent song={currentSong} songUrl={currentSongUrl} />
 */

/**
 * Дуу тоглуулах эсэхийг хариуцдаг функц.
 * @function
 * @name handlePlay
 */

/**
 * Дууны дараагийн дууг тоглуулах функц.
 * @function
 * @name onPlayNext
 */

/**
 * Дууны өмнөх дууг тоглуулах функц.
 * @function
 * @name onPlayPrevious
 */

/**
 * Дууны дууг хаах/нээх функц.
 * @function
 * @name handleMute
 */

/**
 * Дууны тоглуулах хугацааг форматлах функц.
 * @function
 * @name formatTime
 * @param {number} seconds - Хугацаа секундээр.
 * @returns {string} - Форматлагдсан хугацаа.
 */

/**
 * Дууны тоглуулах хугацааг өөрчлөх функц.
 * @function
 * @name handleTrackClick
 * @param {React.MouseEvent<HTMLDivElement>} e - Хулганын үйлдэл.
 */

/**
 * Дууны тоглуулах хугацааг шинэчлэх useEffect.
 * @function
 * @name useEffect
 */

/**
 * Дууг тоглуулах үед дууны мэдээллийг шинэчлэх useEffect.
 * @function
 * @name useEffect
 */

/**
 * Дууны дууг шинэчлэх useEffect.
 * @function
 * @name useEffect
 */

/**
 * Дууны үргэлжлэх хугацааг шинэчлэх useEffect.
 * @function
 * @name useEffect
 */
const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const player = usePlayer();
    const { artists, isLoading: artistLoading } = useGetArtists();

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const trackRef = useRef<HTMLDivElement>(null);

    const [play, { pause, sound }] = useSound(songUrl, {
      volume: volume,
      onload: () => {
          const songDuration = sound?.duration() || 0;
          setDuration(songDuration);
      },
      onplay: () => {
          setIsPlaying(true);
          // Duration-г энд дахин шалгах
          if (duration === 0 && sound) {
              const currentDuration = sound.duration() || 0;
              setDuration(currentDuration);
          }
      },
      onpause: () => {
          setIsPlaying(false);
      },
      onend: () => {
          setIsPlaying(false);
          onPlayNext();
      },
      format: ["mp3"],
    });
  

    const Icon = isPlaying ? BsFillPauseFill : BsFillPlayFill;
    const VolumeIcon = volume === 0 ? BsFillVolumeMuteFill : BsFillVolumeUpFill;

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const onPlayNext = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1] || player.ids[0];

        player.setId(nextSong);
    };

    const onPlayPrevious = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const prevSong = player.ids[currentIndex - 1] || player.ids[player.ids.length - 1];

        player.setId(prevSong);
    };

    const handlePlay = () => {
        if (!sound) {
            play();
            return;
        }

        if (isPlaying) {
            pause();
        } else {
            sound.play();
            setIsPlaying(true);
        }
    };

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (trackRef.current && sound) {
          const trackWidth = trackRef.current.clientWidth;
          const clickPosition = e.nativeEvent.offsetX;
          const percent = clickPosition / trackWidth;
  
          const newTime = percent * duration;
  
          if (newTime >= 0 && newTime <= duration) {
              sound.seek(newTime);
              setProgress(percent * 100);
              setCurrentTime(newTime);
              
              // Хэрэв тоглж байгаа бол үргэлж тоглох
              if (!isPlaying) {
                  sound.play();
                  setIsPlaying(true);
              }
          }
      }
    };
  
  
    const handleMute = () => {
        setVolume(volume === 0 ? 0.5 : 0);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound && isPlaying) {
                const currentTime = sound.seek() || 0;
                setCurrentTime(currentTime);
                setProgress((currentTime / duration) * 100);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [sound, isPlaying, duration]);

    useEffect(() => {
        play();
        return () => {
            if (sound) {
                sound.unload();
            }
        };
    }, [songUrl, play]);

    useEffect(() => {
        if (sound) {
            sound.volume(volume);
        }
    }, [volume, sound]);

    useEffect(() => {
      if (sound && duration === 0) {
          const currentDuration = sound.duration() || 0;
          if (currentDuration > 0) {
              setDuration(currentDuration);
          }
      }
  }, [sound, duration]);

    if (artistLoading) {
        return (
            <div className="flex w-full h-20 items-center justify-center">
                <PuffLoader color={"#ffffff"} size={40} />
            </div>
        );
    }

    return (
        <div>
            <>
              {/* Mobile: Media Card at the top */}
              <div className="md:hidden w-full flex justify-center items-center mb-4">
                <MediaCards
                    key={song.id}
                    data={song}
                    artist={artists.filter((artist) => artist.id === song.artist_id)[0]}
                    onClick={() => {}}
                />
              </div>
              {/* Mobile controller */}
              <div className="flex md:hidden col-auto w-full justify-center items-center gap-4 p-2 rounded-md">
                    <BsFillSkipBackwardFill
                        size={24}
                        onClick={onPlayPrevious}
                        className="text-neutral-300 cursor-pointer hover:text-white"
                    />
                    <div
                        onClick={handlePlay}
                        className="h-12 w-12 flex items-center justify-center rounded-full bg-emerald-500 p-2 cursor-pointer shadow-lg"
                    >
                        <Icon className="text-white" size={28} />
                    </div>
                    <BsFillSkipForwardFill
                        size={24}
                        onClick={onPlayNext}
                        className="text-neutral-300 cursor-pointer hover:text-white"
                    />
                </div>
            </>
            <div className="grid grid-cols-2 md:grid-cols-3 md:h-full">
                {/* Desktop: Media Card on the left side */}
                <div className="hidden md:flex w-full justify-start items-start">
                    <MediaCards
                        key={song.id}
                        data={song}
                        artist={artists.filter((artist) => artist.id === song.artist_id)[0]}
                        onClick={() => {}}
                    />
                </div>
                {/* Desktop controller */}
                <div className="hidden h-full md:flex justify-center items-center w-full max-w-[720px] gap-x-6">
                    <BsFillSkipBackwardFill
                        size={20}
                        onClick={onPlayPrevious}
                        className="text-neutral-300 cursor-pointer hover:text-white"
                    />
                    <div
                        onClick={handlePlay}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
                    >
                        <Icon className="text-black" size={20} />
                    </div>
                    <BsFillSkipForwardFill
                        size={20}
                        onClick={onPlayNext}
                        className="text-neutral-300 cursor-pointer hover:text-white"
                    />
                </div>

                {/* Volume */}
                <div className="hidden md:flex justify-end w-full">
                    <div className="flex items-center gap-x-2 w-[120px]">
                        <VolumeIcon
                            size={25}
                            onClick={handleMute}
                            className="text-neutral-300 cursor-pointer hover:text-white"
                        />
                        <VolumeSlider value={volume} onChange={(value) => setVolume(value)} />
                    </div>
                </div>
            </div>
            

            {/* Song Tracker */}
            <div className="w-full px-4 mt-2">
                <div className="flex items-center gap-x-2">
                    <span className="text-neutral-300 text-sm">
                        {formatTime(currentTime)}
                    </span>
                    <div 
                        ref={trackRef}
                        onClick={handleTrackClick}
                        className="flex-grow h-1 bg-neutral-600 rounded-full cursor-pointer relative"
                    >
                        <div 
                            className="absolute h-full bg-emerald-500 rounded-full" 
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-neutral-300 text-sm">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PlayerContent;