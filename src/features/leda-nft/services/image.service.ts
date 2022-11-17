import { PinataResponse } from '../../../common/types/ipfs-types';
import HttpService from '../../../common/services/http.service';
import IImageService from '../interfaces/image-service.interface';

export default class ImageService extends HttpService implements IImageService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'images';
  }

  async upload(file: File): Promise<string> {
    try {
      const formData = new FormData();
      const filename = file.name.replace(/\.[^/.]+$/, '');

      // TODO: Send three reserved params as formData as follows:
      // formData.append('reserved::name', name); <-- item name
      // formData.append('reserved::description', description); <-- item description
      // formData.append('reserved::external_url', external_url); <-- item url
      // external_url should be in the following format: https://{webhost}/item/{itemId}

      formData.append('image', file, filename);

      // TODO: Remove hardcoded values once the properties filed is implemented in create nft page
      formData.append('color', 'pink');
      formData.append('beard', 'false');

      const { data } = await this.instance.post<PinataResponse>(
        `${this.endpoint}/upload`,
        formData
      );

      return data.IpfsHash;
    } catch (ex) {
      // TODO: Add exception handling here
      console.log('ex|upload', ex);
      return '';
    }
  }
}
