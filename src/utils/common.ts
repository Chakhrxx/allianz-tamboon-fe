import Resizer from 'react-image-file-resizer'

type ResizeImageOptions = {
  maxWidth: number
  maxHeight: number
  format: 'JPEG' | 'PNG' | 'WEBP'
  quality: number
}

export class CommonUtil {
  static delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))
  static resizeImage = (file: File, options?: ResizeImageOptions) => {
    return new Promise<File>((resolve) => {
      Resizer.imageFileResizer(
        file,
        options?.maxWidth || 200,
        options?.maxHeight || 200,
        options?.format || 'PNG',
        options?.quality || 100,
        0,
        (resizedImageFile) => {
          resolve(resizedImageFile as File)
        },
        'file'
      )
    })
  }
}
