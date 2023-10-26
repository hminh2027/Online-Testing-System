import type { RcFile } from 'antd/es/upload';
import axios from 'axios';
import { config } from '@/config';

interface CloudinaryResponse {
  url: string;
}
export const upload = async (image: string | Blob | RcFile) => {
  const formData = new FormData();

  formData.append('file', image);
  formData.append('cloud_name', config.cloudinary.name);
  formData.append('upload_preset', config.cloudinary.preset);
  formData.append('folder', config.cloudinary.folder);

  const res = await axios<CloudinaryResponse>({
    url: config.cloudinary.endpoint,
    method: 'POST',
    data: formData,
  });

  const { url } = res.data;

  return url;
};
