import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface GalleryProps {
  images: string[]
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={selectedImage}
          alt="Product image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image}
            className={cn(
              "relative aspect-square cursor-pointer rounded-lg overflow-hidden",
              selectedImage === image && "ring-2 ring-black"
            )}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt="Product thumbnail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
} 