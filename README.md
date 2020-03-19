# react-infinite-scroll-using-hooks

A react infinite scroll using React Hooks and Intersection Observer API. The scroller exposes scroll handler for scroll position persistance. It is designed so as to accept custom styles.

## installation

```
npm i --save react-infinite-scroll-using-hooks
```

# Usagae

```
import InfiniteScroller from "react-infinite-scroll-using-hooks";

<InfiniteScroller
    listItems={}
    isMore=true
    fetchMore={() => loadMoreCallBack()}
    scrollHandler={x => setLastScrollPosition(x)}
    initialScrollPos={lastScrollPosition}
    renderItems={item => <Card></Card>}
/>

```

## Props

- `renderItems` (function) iterator function
- `loader` (function) returning loader component
- `scrollHandler` (function) onScroll callback
- `endOfLine` (function) returning end of list component
- `isLoading` (bool) true if list fetch is in progress
- `isMore` (bool) true if more items are available
- `listItems` (array) items array to iterate over
- `fetchMore` (function) fetch more callback
- `wrapperStyle` (Object) custom style of wrapper
- `threshold` (Number) IntersectionObserver option param (0-1) by default 0
- `rootMargin` (Dimension in px) IntersectionObserver option param and by default 0
