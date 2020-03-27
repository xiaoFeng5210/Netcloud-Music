import React, { useEffect, useState } from "react";
import Horizen from "../../baseUI/horizen-item";
import Scroll from "../../baseUI/scroll";
import { categoryTypes, alphaTypes } from "../../api/utils";
import { NavContainer, ListContainer, List, ListItem } from "./style";
import { connect } from "react-redux";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from "./store/actionCreators";

function Singers(props) {
  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount
  } = props;

  const {
    getHotSingerDispatch,
    updateDispatch,
    pullDownRefreshDispatch,
    pullUpRefreshDispatch
  } = props;

  let [category, setCategory] = useState("");
  let [alpha, setAlpha] = useState("");
  const list = singerList ? singerList.toJS() : [];

  useEffect(() => {
    getHotSingerDispatch();
  }, []);

  let handleUpdateCategory = val => {
    setCategory(val);
    updateDispatch(val, alpha);
  };
  let handleUpdateAlpha = val => {
    setAlpha(val);
    updateDispatch(category, val);
  };

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={"分类(默认热门):"}
          handleClick={handleUpdateCategory}
          oldVal={category}
        />
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        ></Horizen>
      </NavContainer>

      {/* 列表jsx */}
      <ListContainer>
        <Scroll>
          <List>
            {list.map((item, index) => {
              return (
                <ListItem key={item.accountId + "" + index}>
                  <div className="img_wrapper">
                    <img
                      src={`${item.picUrl}?param=300x300`}
                      width="100%"
                      height="100%"
                      alt="music"
                    />
                  </div>
                  <span className="name">{item.name}</span>
                </ListItem>
              );
            })}
          </List>
        </Scroll>
      </ListContainer>
    </div>
  );
}

const mapStateToProps = state => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"])
});

const mapDispatchToProps = dispatch => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)); //页码重置
      dispatch(changeEnterLoading(true));
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    // 顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));
      if (category === "" && alpha === "") {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
