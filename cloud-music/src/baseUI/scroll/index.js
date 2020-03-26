import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle
} from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import styled from "styled-components";

// 样式
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
// 使用 forwardRef 进行包裹
const Scroll = forwardRef((props, ref) => {
  // 从外面拿到参数
  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom
  } = props;
  const { pullUp, pullDown, onScroll } = props;

  const [bScroll, setBScroll] = useState();
  // current 指向初始化bs实例需要的DOM元素
  const scrollContaninerRef = useRef();

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
  }, []);

  // 每次重新渲染都要刷新实例,防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  //  给实例绑定事件
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", scroll => {
      onScroll(scroll);
    });
  }, [onScroll, bScroll]);

  // 进行上拉到底的判断,调用上拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on("scrollEnd", () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off("scrollEnd");
    };
  });

  //  进行下拉的判断,调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on("touchEnd", pos => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off("touchEnd");
    };
  }, [pullDown, bScroll]);

  // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
  // 这样父元素就可以直接用useRef拿我们这个组件的实例,去调用里面的方法了
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
    </ScrollContainer>
  );
});

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizental"]),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool // 是否支持向上吸顶
};

export default Scroll;
