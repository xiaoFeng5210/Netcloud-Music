import { fromJS } from "immutable";
import {
  CHANGE_SINGER_LIST,
  CHANGE_PAGE_COUNT,
  CHANGE_ENTER_LOADING,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING
} from "./constants";

const defaultState = fromJS({
  singerList: [],
  enterLoading: true, //控制进场Loading
  pullUpLoading: false, //控制上拉加载动画
  pullDownLoading: false, //控制下拉加载动画
  pageCount: 0 //这里是当前页数，我们即将实现分页功能
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_SINGER_LIST:
      return state.set("singerList", action.payload);
    case CHANGE_PAGE_COUNT:
      return state.set("pageCount", action.payload);
    case CHANGE_ENTER_LOADING:
      return state.set("enterLoading", action.payload);
    case CHANGE_PULLUP_LOADING:
      return state.set("pullUpLoading", action.payload);
    case CHANGE_PULLDOWN_LOADING:
      return state.set("pullDownLoading", action.payload);
    default:
      return state;
  }
};
