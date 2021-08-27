
import ImageProcessing1 from './image_processing1';
import ImageProcessing2 from './image_processing2';
import ImageProcessing3 from './image_processing3';
import ImageWorkshop from './ImageWorkshop';

const MINI_GAMES = [
  {
    component: ImageWorkshop,
    url: '/image_workshop',
    name: 'بازی اول',
  },
  {
    component: ImageProcessing1,
    url: '/image_processing1',
    name: 'پردازش تصویر - آپلود فایل و اسلایدر',
  },
  {
    component: ImageProcessing2,
    url: '/image_processing2',
    name: 'پردازش تصویر - جدول و اعمال ماتریس',
  },
  {
    component: ImageProcessing3,
    url: '/image_processing3',
    name: 'پردازش تصویر - عکس سه تایی',
  },
]

export default MINI_GAMES;