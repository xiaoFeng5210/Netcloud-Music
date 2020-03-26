import { LoadingWrapper } from "./style";
import React from "react";

function Loading() {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  );
}

export default React.memo(Loading);
