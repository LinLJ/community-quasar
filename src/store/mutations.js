// 设置秒杀商品
export const SET_SECKILLS_INFO = (state, seckills) => {
    state.seckills.goodsList = seckills[0];
    state.seckills.deadline = seckills[1];
  };