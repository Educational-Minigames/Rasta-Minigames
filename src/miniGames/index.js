
import BioNewspaper from './BioNewspaper';
import Furier_Draw from './Furier_Draw'
// logic workshop
import Iframe from './Iframe'
// Image Processing workshop
import ImageProcessing1 from './image_processing1';
import ImageProcessing2 from './image_processing2';
import ImageProcessing3 from './image_processing3';
// Physics workshop
import Physic_collision from './Physic_collision';
// signal workshop
import Signal1 from './signal1';
import Signal2 from './signal2';
import Sine_Waves from './Sine_Waves'
import Sine_Waves2 from './Sine_Waves2'

const MINI_GAMES = [
  // Image processing games
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

  // Signal games
  {
    component: Signal1,
    props: { sound_file: 'Noise.wav', duration: 1.22 },
    url: '/signal1-1',
    name: 'بازی فوریه ۱-۱',
  },
  {
    component: Signal1,
    props: { sound_file: 'Noisy.wav', duration: 1.22 },
    url: '/signal1-2',
    name: 'بازی فوریه ۱-۲',
  },
  {
    component: Signal1,
    props: { sound_file: 'Main.wav', duration: 1.22 },
    url: '/signal1-3',
    name: 'بازی فوریه ۱-۳',
  },
  {
    component: Signal2,
    props: { sound_file: 'Noise.wav', duration: 1.22 },
    url: '/signal2-1',
    name: 'بازی فوریه ۲-۱',
  },
  {
    component: Signal2,
    props: { sound_file: 'Noisy.wav', duration: 1.22 },
    url: '/signal2-2',
    name: 'بازی فوریه ۲-۲',
  },
  {
    component: Signal2,
    props: { sound_file: 'Main.wav', duration: 1.22 },
    url: '/signal2-3',
    name: 'بازی فوریه ۲-۳',
  },

  {
    component: Sine_Waves,
    props: {},
    url: '/Sine_Waves',
    name: 'فرکانس- موج‌های سینوسی',
  },
  {
    component: Sine_Waves2,
    props: {},
    url: '/Sine_Waves2',
    name: 'فرکانس- موج‌های سینوسی۲',
  },
  {
    component: Iframe,
    props: {
      src: 'https://preview.p5js.org/AlieNiT/embed/ECeLZWeFV',
      title: 'signal_phone',
    },
    url: '/signal_phone',
    name: 'فرکانس-تلفن',
  },
  {
    component: Furier_Draw,
    props: {},
    url: '/Fourier_Draw',
    name: 'فرکانس-نقاشی',
  },

  // Bio games
  {
    component: BioNewspaper,
    url: '/bio-newspaper',
    name: 'بایو - روزنامه',
  },

  // Logic games
  {
    component: Iframe,
    props: {
      src: 'https://circuitverse.org/simulator/embed/q0_1',
      title: 'logic_Q0_Madar_1',
    },
    url: '/logic_Q0_Madar_1',
    name: 'منطق_Q0_1',
  },
  {
    component: Iframe,
    props: {
      src: 'https://circuitverse.org/simulator/embed/q0_2',
      title: 'logic_Q0_Madar_2',
    },
    url: '/logic_Q0_Madar_2',
    name: 'منطق_Q0_2',
  },
  {
    component: Iframe,
    props: {
      src: 'https://circuitverse.org/simulator/embed/q1_madar_1',
      title: 'logic_Q1_Madar_1',
    },
    url: '/logic_Q1_Madar_1',
    name: 'منطق_Q1_Madar_1',
  },
  {
    component: Iframe,
    props: {
      src: 'https://circuitverse.org/simulator/embed/q1_madar_2',
      title: 'logic_Q1_Madar_1',
    },
    url: '/logic_Q1_Madar_2',
    name: 'منطق_Q1_madar_2',
  },
  {
    component: Iframe,
    props: {
      src: 'https://circuitverse.org/simulator/embed/q1_madar_3',
      title: 'logic_Q1_Madar_1',
    },
    url: '/logic_Q1_Madar_3',
    name: 'منطق_Q1_Madar_3',
  },
  {
    component: Iframe,
    props: {
      src: 'https://circuitverse.org/simulator/embed/q1_madar_4',
      title: 'logic_Q1_Madar_1',
    },
    url: '/logic_Q1_Madar_4',
    name: 'منطق_Q1_madar_4',
  },
  {
    component: Iframe,
    props: {
      src: `${process.env.PUBLIC_URL}/MiniGames/run_circuit/Logic Gate Simulator _ Academo.org - Free, interactive, education..html`,
      title: 'Logic Circuit',
    },
    url: '/Logic_Q2',
    name: 'منطق_Q2_طراحی مدار',
  },
  {
    component: Iframe,
    props: {
      src: 'https://circuitverse.org/simulator/embed/q3-087a7688-c91e-4dd2-8bda-168a0bb7494d',
      title: 'Logic_Q3',
    },
    url: '/Logic_Q3',
    name: 'منطق_Q3',
  },

  // Physics workshop
  {
    component: Physic_collision,
    props: {},
    url: '/physic_collision',
    name: 'فیزیک - بازی برخورد',
  },
]

export default MINI_GAMES;