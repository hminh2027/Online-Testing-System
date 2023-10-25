import type { RcFile } from 'antd/es/upload';
import axios from 'axios';

interface CloudinaryResponse {
  url: string;
}
export const upload = async (image: string | Blob | RcFile) => {
  const formData = new FormData();

  formData.append('file', image);
  formData.append('cloud_name', 'minh2027');
  formData.append('upload_preset', 'xf9mllsp');
  formData.append('folder', 'Testing Folder');

  const res = await axios<CloudinaryResponse>({
    url: 'https://api.cloudinary.com/v1_1/minh2027/upload',
    method: 'POST',
    data: formData,
  });

  const { url } = res.data;

  return url;
};
