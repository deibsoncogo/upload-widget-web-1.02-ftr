export function formatBytes(bytes: number): string {
  if (bytes < 0) {
    throw new Error("Size in bytes cannot be negative")
  }

  const units = ["B", "KB", "MB", "GB", "TB", "PB"]

  let index = 0
  let convertBytes = bytes

  while (convertBytes >= 1024 && index < units.length - 1) {
    convertBytes /= 1024
    index++
  }

  return `${convertBytes.toFixed(2)} ${units[index]}`
}
