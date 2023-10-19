import axios from 'axios';

export const uploadImagesToImageBB = async (imagesData: any) => {
  const apiKey = '46e1122b071589a93cdc571daf353fc7'; // Replace with your ImageBB API key
  const apiUrl = 'https://api.imgbb.com/1/upload';

  const imageLinks = [];

  for (const imageData of imagesData) {
    const formData = new FormData();
    formData.append('image', imageData);
    formData.append('key', apiKey);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': `multipart/form-data`
        } 
      });
      imageLinks.push(response.data.url);
    } catch (error) {
      throw new Error('Image upload to ImageBB failed');
    }
  }

  return imageLinks;
};
