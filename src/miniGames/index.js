
import ImageProcessing1 from './image_processing1';
import ImageProcessing2 from './image_processing2';
import ImageProcessing3 from './image_processing3';
import ImageWorkshop from './ImageWorkshop';
import Signal from './signal1';

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
  {
    component: Signal,
    props: { sound_file: 'Noise.wav', duration: 1.22 },
    url: '/signal1-1',
    name: 'بازی فوریه ۱-۱',
  },
  {
    component: Signal,
    props: { sound_file: 'Noisy.wav', duration: 1.22 },
    url: '/signal1-2',
    name: 'بازی فوریه ۱-۲',
  },
  {
    component: Signal,
    props: { sound_file: 'Main.wav', duration: 1.22 },
    url: '/signal1-3',
    name: 'بازی فوریه ۱-۳',
  },
]

export default MINI_GAMES;