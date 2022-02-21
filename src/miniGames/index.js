
import Bio_workshop from './Bio_workshop';
import BioNewspaper from './BioNewspaper';
// old minigames
import BoxSimulator from './BoxSimulator';
import Experts from './Experts';
import Furier_Draw from './Furier_Draw';
import Mentor from './gambling/mentor';
import Student from './gambling/student';

// logic workshop
import Iframe from './Iframe';
// Image Processing workshop
import ImageProcessing1 from './image_processing1';
import ImageProcessing2 from './image_processing2';
import ImageProcessing3 from './image_processing3';
import Logic_Table1 from './Logic_table1';
import Logic_table2 from './Logic_table2';
import physic_centrifugal_force from './physic_centrifugal_force';
// Physics workshop
import Physic_collision from './Physic_collision';
import PhysicsArticle from './PhysicArticle';
// signal workshop
import Signal1 from './signal1';
import Signal2 from './signal2';
import Signal3 from './signal3';
import Sine_Waves from './Sine_Waves';
import Sine_Waves2 from './Sine_Waves2';

const MINI_GAMES = [
  // old minigames
  {
    component: PhysicsArticle,
    url: '/physics_article_1',
    name: 'بازی مقاله روز فیزیک',
  },
  {
    component: Experts,
    url: '/experts',
    name: 'مسئله خبرگان',
  },
  {
    component: BoxSimulator,
    url: '/box-simulator-1',
    props: {
      mode: 0,
    },
    name: 'شبیه‌ساز جعبه‌ها - ۱',
  },
  {
    component: BoxSimulator,
    url: '/box-simulator-2',
    props: {
      mode: 1,
    },
    name: 'شبیه‌ساز جعبه‌ها - ۲',
  },
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
    component: ImageProcessing1,
    props: {
      imageFileSource: process.env.PUBLIC_URL + '/image_processing/back-Copy-Copy.png',
      imageFileName: 'back-Copy-Copy.png',
    },
    url: '/imagepass',
    name: 'پردازش تصویر - مسابقه',
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
    component: ImageProcessing1,
    props: {
      imageFileSource: process.env.PUBLIC_URL + '/image_processing/bar_green.png',
      imageFileName: 'bar_green.png',
    },
    url: '/image_morpho2',
    name: 'پردازش تصویر - مورفولوژی۲',
  },

  // Signal games
  {
    component: Signal1,
    props: { sound_file: 'DTMF_Signal.wav', duration: 4.6 },
    url: '/signal1-1',
    name: 'بازی فوریه ۱-۱',
  },

  {
    component: Signal2,
    props: { sound_file: 'DTMF_Signal.wav', duration: 4.6 },
    url: '/signal2-1',
    name: 'بازی فوریه ۲-۱',
  },

  {
    component: Signal3,
    props: { sound_file: 'kotlet_kargah.wav', duration: 5.54 },
    url: '/signal3-1',
    name: 'بازی فوریه ۳-۱(استیت ۱۵)',
  },
  {
    component: Signal3,
    props: { sound_file: 'kotlet_kargah_2.wav', duration: 2.22 },
    url: '/signal3-2',
    name: 'بازی فوریه ۳-۲(استیت ۱۶)',
  },
  {
    component: Signal3,
    props: { sound_file: 'Noisy.wav', duration: 2.22 },
    url: '/signal3-3',
    name: 'بازی فوریه ۳-۳',
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
    component: Furier_Draw,
    props: {},
    url: '/Fourier_Draw',
    name: 'فرکانس-نقاشی',
  },
  {
    component: Iframe,
    props: {
      src: 'https://preview.p5js.org/AlieNiT/embed/Jmg7vGxF2',
      title: 'signal_state2',
    },
    url: '/signal_state2',
    name: 'فرکانس -استیت ۲',
  },
  {
    component: Iframe,
    props: {
      src: 'https://preview.p5js.org/AlieNiT/embed/avyX5fP9j',
      title: 'signal_state3',
    },
    url: '/signal_state3',
    name: 'فرکانس - استیت۳)',
  },
  {
    component: Iframe,
    props: {
      src: 'https://preview.p5js.org/AlieNiT/embed/nPToAiFTM',
      title: 'signal_state5',
    },
    url: '/signal_state5',
    name: 'فرکانس -استیت ۵',
  },
  {
    component: Iframe,
    props: {
      src: 'https://preview.p5js.org/AlieNiT/embed/eZOeyX_Ph',
      title: 'signal_state6',
    },
    url: '/signal_state6',
    name: 'فرکانس - استیت۶',
  },
  {
    component: Iframe,
    props: {
      src: 'https://preview.p5js.org/AlieNiT/embed/ECeLZWeFV',
      title: 'signal_phone',
    },
    url: '/signal_phone',
    name: 'فرکانس - تلفن(استیت ۱۳)',
  },
  {
    component: Iframe,
    props: {
      src: 'https://preview.p5js.org/AlieNiT/present/Nrsrul7C7',
      title: 'signal_compq',
    },
    url: '/signal_compq',
    name: 'فرکانس - سوال مسابقه',
  },
  {
    component: Signal3,
    props: { sound_file: 'audio_file_kotleted.wav', duration: 11.1 },
    url: '/signalfilter',
    name: 'بازی فیلتر مسابقه',
  },
  {
    component: Signal1,
    props: { sound_file: 'DTMF_Signal2.wav', duration: 4.6 },
    url: '/signalfourier',
    name: 'بازی فوریه - مسابقه',
  },
  // {
  // component: Signal2,
  // props: { sound_file: 'Noise.wav', duration: 1.22 },
  // url: '/signal2-1',
  // name: 'بازی سیگنال ۲-۱',
  // },
  // {
  // component: Signal2,
  // props: { sound_file: 'Noisy.wav', duration: 1.22 },
  // url: '/signal2-2',
  // name: 'بازی سیگنال ۲-۲',
  // },
  // {
  // component: Signal2,
  // props: { sound_file: 'Main.wav', duration: 1.22 },
  // url: '/signal2-3',
  // name: 'بازی سیگنال ۲-۳',
  // },

  // Bio games
  {
    component: BioNewspaper,
    url: '/bio-newspaper',
    name: 'بایو - روزنامه',
  },
  {
    component: Bio_workshop,
    url: '/Bio_workshop',
    name: 'بایو - جدول',
  },

  // {
  //   component: Directed_Graph,
  //   url: '/bio-graph',
  //   name: 'بایو - گراف',
  // },

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
  {
    component: Logic_Table1,
    props: {},
    url: '/Logic_Table1',
    name: 'منطق - جدول حقیقت ۱',
  },
  {
    component: Logic_table2,
    props: {},
    url: '/Logic_Table2',
    name: 'منطق - جدول حقیقت ۲',
  },

  // Physics workshop
  {
    component: Physic_collision,
    props: {},
    url: '/physic_collision',
    name: 'فیزیک - بازی برخورد',
  },
  {
    component: physic_centrifugal_force,
    props: {},
    url: '/physic_centrifugal_force',
    name: 'فیزیک - گریز از مرکز',
  },

  // شهربازی:
  {
    component: Mentor,
    props: {},
    url: '/gambling/mentor-mentor-mentor-mentor-mentor-mentor-mentor-mentor-mentor-mentor-mentor-mentor',
    name: 'قماربازی - صفحه‌ی همیار',
  },
  {
    component: Student,
    props: {},
    url: '/gambling/student',
    name: 'قمابازی - صفحه‌ی دانش‌آموز',
  },
  {
    url: '/MiniGames/Genetic_Graph',
    name: 'گراف - بیوانفورماتیک',
  },

]

export default MINI_GAMES;