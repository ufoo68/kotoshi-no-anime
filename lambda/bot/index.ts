import axios from 'axios';

interface AnimeData {
  id: string
  title: string
}

export const handler = async () => {
  const res = await axios.get('http://api.moemoe.tokyo/anime/v1/master/2021');
  const animeDatas: AnimeData[] = res.data;
  console.log(animeDatas);
  return { statusCode: 200 }
}