import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  /**
   * Take a foto and return the blob in a promise
   */
  public async getPictureFromCamera() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      saveToGallery: false,
      correctOrientation: true
    });


    return PhotoService.b64toBlob(capturedPhoto.base64String);
  }

  /**
   * Get picture from galerie and return the blob in a promise
   */
  public async getPictureFromGalerie() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 100,
      saveToGallery: false,
      correctOrientation: true
    });


    return PhotoService.b64toBlob(capturedPhoto.base64String);
  }

  /**
   * Generate a blob from a picture data
   * @param data
   * @private
   */
  private static b64toBlob(data): Blob {
    let chars = atob(data);
    let bytes = [];

    for (let i = 0; i < chars.length; i += 512) {
      let size = chars.slice(i, i + 512);

      const count = new Array(size.length);
      for (let j = 0; j < size.length; j++)
        count[j] = size.charCodeAt(j);


      const byteArray = new Uint8Array(count);
      bytes.push(byteArray);
    }

    return new Blob(bytes, {type: 'image/png'});
  }
}
