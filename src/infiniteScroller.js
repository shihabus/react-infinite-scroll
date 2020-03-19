/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import useIsOnScreenHook from "./customHook";
import "./index.css";
import PropTypes from "prop-types";

// PARAMS
/**
 *
 * @renderItems (function) iterator function
 * @loader (function) returning loader component
 * @scrollHandler (function) onScroll callback
 * @endOfLine (function) returning end of list component
 * @isLoading (bool) true if list fetch is in progress
 * @isMore (bool) true if more items are available
 * @listItems (array) items array to iterate over
 * @fetchMore (function) fetch more callback
 * @wrapperStyle (Object) custom style of wrapper
 * @threshold (Number) IntersectionObserver option param (0-1) by default 0
 * @rootMargin (Dimension in px) IntersectionObserver option param and by default 0
 */

export default function InfiniteScroller(props) {
  const {
    renderItems,
    loader,
    endOfLine,
    isLoading,
    isMore,
    listItems,
    fetchMore,
    wrapperStyle,
    threshold,
    rootMargin,
    scrollHandler,
    initialScrollPos,
    listWidth,
    listHeight
  } = props;

  const [scrollPos, setScrollPos] = React.useState(initialScrollPos);
  const parentDiv = useRef(null);
  const EOL = useRef(null);
  const intersecting = useIsOnScreenHook(EOL, {
    root: parentDiv.current,
    threshold,
    rootMargin
  });

  useEffect(() => {
    if (intersecting) {
      fetchMore();
    }
  }, [intersecting]);

  useEffect(() => {
    if (parentDiv.current) {
      parentDiv.current.scrollTo(0, scrollPos);
      scrollHandler(parentDiv.current);
    }
  }, [scrollPos, parentDiv]);

  return (
    <div
      style={{
        overflow: "auto",
        height: listHeight,
        width: listWidth,
        ...wrapperStyle
      }}
      onScroll={() => setScrollPos(parentDiv.current.scrollTop)}
      ref={parentDiv}
    >
      {listItems.map(x => renderItems(x))}
      {isLoading && loader()}
      {!isMore && endOfLine()}
      {!isLoading && isMore && <div ref={EOL} />}
    </div>
  );
}
InfiniteScroller.propTypes = {
  renderItems: PropTypes.func,
  scrollHandler: PropTypes.func,
  loader: PropTypes.func,
  endOfLine: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  isMore: PropTypes.bool.isRequired,
  listItems: PropTypes.array.isRequired,
  fetchMore: PropTypes.func.isRequired,
  wrapperStyle: PropTypes.object,
  threshold: PropTypes.string,
  rootMargin: PropTypes.string,
  listWidth: PropTypes.string,
  listHeight: PropTypes.string
};

InfiniteScroller.defaultProps = {
  listWidth: "100%",
  listHeight: "100%",
  initialScrollPos: 0,
  scrollHandler: () => {},
  listItems: [],
  renderItems: () => {},
  loader: () => <div>Loading....</div>,
  endOfLine: () => <div>EOF</div>,
  isLoading: false,
  isMore: false,
  fetchMore: () => {},
  wrapperStyle: {},
  threshold: 0,
  rootMargin: "10px"
};
