/* 
  页面reload加载动画
*/
const initAnimation = {
  visible: {
    height: "100%",
    transition: {
      duration: 2,
    },
  },
  hidden: {
    height: 0,
    transition: {
      delay: 3,
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

/* 
    全页面过渡动画
*/
const pageTransition = {
  hidden: {
    y: "100%",
  },
  // 进入动画延迟触发0.4秒，耗时0.5秒，缓动曲线easeOutQuart进入
  visible: {
    y: 0,
    transition: {
      delay: 0.6,
      ease: [0.165, 0.84, 0.44, 1],
      duration: 0.5,
    },
  },
  // 退出动画要覆盖进入动画时长
  exit: {
    opacity: 0,
    transition: {
      delay: 1.2,
      duration: 0.2,
    },
  },
};

/* 
    全页面过渡子组件 - 暗场遮罩
*/
const maskWrap = {
  // 常态化隐藏
  visible: {
    opacity: 0,
  },
  // 只在退出时显示，延迟0.3秒触发，耗时0.2秒
  exit: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

/* 
    全页面过渡子组件 - 入场页面圆角蒙版
*/
const containerWrap = {
  // 进入之前为圆角
  hidden: {
    borderRadius: "1rem",
  },
  // 进入后圆角消失，设置0.9秒的延迟触发（全页面过渡动画0.9秒完成）保证在进入的过程中依然保持圆角
  visible: {
    borderRadius: "0rem",
    transition: {
      delay: 1,
      delayChildren: 1,
      staggerChildren: 0.2,
    },
  },
  exit: {
    scale: 0.92,
    transition: {
      ease: [0.165, 0.84, 0.44, 1],
      duration: 0.4,
    },
  },
};

// 波浪文字容器
const textContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.06,
      delayChildren: 0.04 * i,
    },
  }),
};

// 波浪文字
const textChildren = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const fade = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  initAnimation,
  pageTransition,
  maskWrap,
  containerWrap,
  textContainer,
  textChildren,
  fade,
};
