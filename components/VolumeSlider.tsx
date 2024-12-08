'use client'

import * as RadixSlider from "@radix-ui/react-slider";

interface VolumeSliderProps {
    value?: number;
    onChange?: (value: number) => void;
};

const VolumeSlider: React.FC<VolumeSliderProps> = ({value = 0.5, onChange}) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    };

    return (
        <RadixSlider.Root 
            value={[value]} 
            defaultValue={[0.5]} 
            onValueChange={handleChange} 
            max={1} 
            step={0.1} 
            aria-label="Volume" 
            className="relative flex items-center select-none touch-none w-full h-10"
        >
            <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
                <RadixSlider.Range 
                    className="absolute bg-emerald-500 rounded-full h-full"
                    style={{ width: `${value * 100}%` }}
                />
            </RadixSlider.Track>
            <RadixSlider.Thumb 
                className="block w-4 h-4 bg-emerald-500 rounded-full hover:bg-emerald-600 focus:outline-none"
            />
        </RadixSlider.Root>
    )
}

export default VolumeSlider;