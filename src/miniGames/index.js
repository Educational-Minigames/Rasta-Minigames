
import ImageProcessing1 from './image_processing1';
import ImageProcessing2 from './image_processing2';
import ImageProcessing3 from './image_processing3';
// logic workshop
import Logic_Q0_Madar_1 from './Logic_Q0_1'
import Logic_Q0_Madar_2 from './Logic_Q0_2'
import Logic_Q1_Madar_1 from './Logic_Q1_Madar_1'
import Logic_Q1_Madar_2 from './Logic_Q1_Madar_2'
import Logic_Q1_Madar_3 from './Logic_Q1_Madar_3'
import Logic_Q1_Madar_4 from './Logic_Q1_Madar_4'
import Logic_Q2 from './run_circuit'
import Logic_Q3 from './Logic_Q3'
// Physics workshop
import Physic_collision from '/Physic_collision';
// signal workshop
import Signal from './signal1';

const MINI_GAMES = [
  {
    component: ImageProcessing1,
    props: {
      imageFileSource: process.env.PUBLIC_URL + '/image_processing/in.png',
      imageFileName: 'in.png',
    },
    url: '/image_processing1-1',
    name: 'پردازش تصویر - آپلود فایل و اسلایدر - ۱',
  },
  {
    component: ImageProcessing1,
    props: {
      imageFileSource: process.env.PUBLIC_URL + '/image_processing/doogh.jpg',
      imageFileName: 'doogh.jpg',
    },
    url: '/image_processing1-2',
    name: 'پردازش تصویر - آپلود فایل و اسلایدر - ۲',
  },
  {
    component: ImageProcessing1,
    props: {
      imageFileSource: process.env.PUBLIC_URL + '/image_processing/doogh_br.jpg',
      imageFileName: 'doogh_br.jpg',
    },
    url: '/image_processing1-3',
    name: 'پردازش تصویر - آپلود فایل و اسلایدر - ۳',
  },

  {
    component: ImageProcessing2,
    props: {
      imageFileSource: process.env.PUBLIC_URL + '/image_processing/im1_gray.jpg',
      imageFileName: 'im1_gray.jpg',
    },
    url: '/image_processing2-1',
    name: 'پردازش تصویر - جدول و اعمال ماتریس - ۱',
  },
  {
    component: ImageProcessing2,
    props: {
      imageFileSource: process.env.PUBLIC_URL + '/image_processing/chess.png',
      imageFileName: 'chess.png',
    },
    url: '/image_processing2-2',
    name: 'پردازش تصویر - جدول و اعمال ماتریس - ۲',
  },
  {
    component: ImageProcessing2,
    props: {
      imageFileSource: process.env.PUBLIC_URL + '/image_processing/s_p_noise_img_1.jpg',
      imageFileName: 's_p_noise_img_1.jpg',
    },
    url: '/image_processing2-3',
    name: 'پردازش تصویر - جدول و اعمال ماتریس - ۳',
  },

  {
    component: ImageProcessing3,
    props: {
      imageFileSource: process.env.PUBLIC_URL + '/image_processing/bar255.jpg',
      imageFileName: 'bar255.jpg',
    },
    url: '/image_processing3-1',
    name: 'پردازش تصویر - عکس سه تایی - ۱',
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

  // Logic games
  {
    component: Logic_Q0_Madar_1,
    props: { },
    url: '/logic_Q0_Madar_1',
    name: 'منطق_Q0_1',
  },
  {
    component: Logic_Q0_Madar_2,
    props: { },
    url: '/logic_Q0_Madar_2',
    name: 'منطق_Q0_2',
  },
  {
    component: Logic_Q1_Madar_1,
    props: { },
    url: '/logic_Q1_Madar_1',
    name: 'منطق_Q1_Madar_1',
  },
  {
    component: Logic_Q1_Madar_2,
    props: { },
    url: '/logic_Q1_Madar_2',
    name: 'منطق_Q1_madar_2',
  },
  {
    component: Logic_Q1_Madar_3,
    props: { },
    url: '/logic_Q1_Madar_3',
    name: 'منطق_Q1_Madar_3',
  },
  {
    component: Logic_Q1_Madar_4,
    props: { },
    url: '/logic_Q1_Madar_4',
    name: 'منطق_Q1_madar_4',
  },
  {
    component: Logic_Q2,
    props: { },
    url: '/Logic_Q2',
    name: 'منطق_Q2_طراحی مدار',
  },
  {
    component: Logic_Q3,
    props: { },
    url: '/Logic_Q3',
    name: 'منطق_Q3',
  },
  // Physics workshop
  {
    component: Physic_collision,
    props: { },
    url: '/physic_collision',
    name: 'فیزیک - بازی برخورد',
  },
]

export default MINI_GAMES;