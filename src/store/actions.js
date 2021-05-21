// 获取秒杀倒计时
export const loadSeckillsInfo = ({ commit }) => {
      const date = new Date();
      const hours = date.getHours();
      const minute = date.getMinutes();
      const seconds = date.getSeconds();
      console.log([hours, minute, seconds]);
      // 距离开始秒杀时间
      const deadline = {
        hours: 1,
        minute: 38,
        seconds: 36
      };
      commit('SET_SECKILLS_INFO', [data, deadline]);
  };