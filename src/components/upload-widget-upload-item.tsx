import * as Progress from "@radix-ui/react-progress"
import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react"
import { motion } from "motion/react"
import { useUploads, type Upload } from "../store/uploads"
import { formatBytes } from "../utils/format-bytes"
import { Button } from "./ui/button"

interface UploadWidgetUploadItemProps {
  upload: Upload
  uploadId: string
}

export function UploadWidgetUploadItem({
  upload,
  uploadId,
}: UploadWidgetUploadItemProps) {
  const cancelUpload = useUploads((store) => store.cancelUpload)

  const progress = Math.min(
    (upload.uploadSizeInBytes * 100) / upload.originalSizeInBytes,
    100
  )

  return (
    <motion.div
      className="p-3 rounded-lg flex flex-col gap-3 shadow-shape-content bg-white/2 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium flex items-center gap-1">
          <ImageUp strokeWidth={1.5} className="size-3 text-zinc-300" />
          <span>{upload.name}</span>
        </span>

        <span className="text-xxs text-zinc-400 flex gap-1.5 items-center">
          <span className="line-through">{formatBytes(upload.originalSizeInBytes)}</span>

          <div className="size-1 rounded-full bg-zinc-700" />

          <span>
            300KB
            <span className="text-green-400 ml-1">-94%</span>
          </span>

          <div className="size-1 rounded-full bg-zinc-700" />

          {upload.status === "progress" && <span>{progress}%</span>}

          {upload.status === "success" && <span>100%</span>}

          {upload.status === "error" && <span className="text-red-400">Error</span>}

          {upload.status === "canceled" && (
            <span className="text-yellow-400">Canceled</span>
          )}
        </span>
      </div>

      <Progress.Root
        data-status={upload.status}
        className="group bg-zinc-800 rounded-full h-1 overflow-hidden"
      >
        <Progress.Indicator
          style={{ width: upload.status === "progress" ? `${progress}%` : "100%" }}
          className="bg-indigo-500 h-1 group-data-[status=success]:bg-green-400 group-data-[status=error]:bg-red-400 group-data-[status=canceled]:bg-yellow-400 transition-all"
        />
      </Progress.Root>

      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        <Button size="icon-sm">
          <Download strokeWidth={1.5} className="size-4" />
          <span className="sr-only">Download compressed image</span>
        </Button>

        <Button disabled={upload.status !== "success"} size="icon-sm">
          <Link2 strokeWidth={1.5} className="size-4" />
          <span className="sr-only">Copy remote URL</span>
        </Button>

        <Button disabled={!["canceled", "error"].includes(upload.status)} size="icon-sm">
          <RefreshCcw strokeWidth={1.5} className="size-4" />
          <span className="sr-only">Retry upload</span>
        </Button>

        <Button
          onClick={() => cancelUpload(uploadId)}
          disabled={upload.status !== "progress"}
          size="icon-sm"
        >
          <X strokeWidth={1.5} className="size-4" />
          <span className="sr-only">Cancel upload</span>
        </Button>
      </div>
    </motion.div>
  )
}
