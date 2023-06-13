import { cn } from "@/utils/utils";
import { memo } from "react";

const FileInputPreview = memo(
  (props: { file: File | null; handleClearFilePreview: () => void }) => {
    const { file, handleClearFilePreview } = props;
    let filePreview = <></>;

    if (file?.type.startsWith("image/")) {
      filePreview = (
        <img src={URL.createObjectURL(file)} alt="File Preview" className="w-24 h-24 object-fill" />
      );
    } else if (file?.type.startsWith("video/")) {
      filePreview = (
        <video
          src={URL.createObjectURL(file)}
          controls
          className="w-32 aspect-video h-24 object-fill"
        />
      );
    } else if (file?.type.startsWith("audio/")) {
      filePreview = <audio src={URL.createObjectURL(file)} controls className="" />;
    } else {
      filePreview = <div className="rounded bg-slate-400">{file?.name}</div>;
    }

    return (
      <>
        {file && (
          <div className="relative max-w-max mb-4">
            {filePreview}
            <button
              type="button"
              className={cn("absolute right-0 top-0 z-10 hover:bg-gray-200", {
                "-right-8": !file?.type.startsWith("image/"),
              })}
              onClick={handleClearFilePreview}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </>
    );
  }
);

export default FileInputPreview;
