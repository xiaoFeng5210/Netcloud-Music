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
  const [bScroll, setBScroll] = useState();
  // current 指向初始化bs实例需要的DOM元素
});
