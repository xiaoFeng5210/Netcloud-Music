import React, { useEffect } from "react";
import Slider from "../../components/Slider";
import RecommendList from "../../components/list";
import Loading from "../../baseUI/loading/index";
import { connect } from "react-redux";
import * as actionTypes from "./store/actionCreators";
import { Content } from "./style";
import Scroll from "../../baseUI/scroll";
import { renderRoutes } from "react-router-config";

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    // immutable 数据结构中长度属性 size
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll>
        <div>
          {enterLoading && <Loading />}
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Content>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
  enterLoading: state.getIn(["recommend", "enterLoading"])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
