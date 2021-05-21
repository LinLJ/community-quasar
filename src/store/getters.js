const getters = {
  device: state => state.app.device,
  navigation: state => state.nav.navigation,
  isLogin: state => state.user.isLogin,
  seckillsHours: state => state.seckills.deadline.hours < 10 ? '0' + state.seckills.deadline.hours : state.seckills.deadline.hours,
  seckillsMinutes: state => state.seckills.deadline.minute < 10 ? '0' + state.seckills.deadline.minute : state.seckills.deadline.minute,
  seckillsSeconds: state => state.seckills.deadline.seconds < 10 ? '0' + state.seckills.deadline.seconds : state.seckills.deadline.seconds
}
export default getters

// 获取秒杀的小时
export const seckillsHours = state => {
  return state.seckills.deadline.hours < 10 ? '0' + state.seckills.deadline.hours : state.seckills.deadline.hours;
};

// 获取秒杀的分钟
export const seckillsMinutes = state => {
  return state.seckills.deadline.minute < 10 ? '0' + state.seckills.deadline.minute : state.seckills.deadline.minute;
};

// 获取秒杀的秒
export const seckillsSeconds = state => {
  return state.seckills.deadline.seconds < 10 ? `0${state.seckills.deadline.seconds}` : state.seckills.deadline.seconds;
};
