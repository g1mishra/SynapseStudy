import { cn } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  imageSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export default function Avatar(props: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative">
      <Image
        src={props?.imageSrc || "/placeholder.png"}
        className={cn("w-12 h-12 rounded-full mr-4", {
          hidden: imageError,
        })}
        alt={props?.alt ?? "alt"}
        width={props?.width ?? 48}
        height={props?.height ?? 48}
        onError={handleImageError}
      />
      <div
        style={{
          width: props?.width ?? 48,
          height: props?.height ?? 48,
        }}
        className={cn("rounded-full bg-gray-500 mr-4", {
          hidden: !imageError,
        })}
      >
        <div className="flex items-center justify-center h-full text-white text-xl font-bold">
          {props?.alt?.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}
