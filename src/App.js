import React, { useState, useEffect } from "react";
import InfiniteScroller from "./infiniteScroller";
import posts from "./mockData";

export default function App() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [data, setData] = useState([]);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    let result = posts.slice(size * page, 10 + size * page);
    setData([...data, ...result]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div style={{ height: "500px", width: "300px" }}>
      <InfiniteScroller
        listItems={data}
        isMore={data.length + 10 <= posts.length}
        fetchMore={() => setPage(page + 1)}
        scrollHandler={x => setLastScrollPosition(x)}
        initialScrollPos={lastScrollPosition}
        renderItems={item => {
          return (
            <div
              style={{
                padding: "5% 10%",
                backgroundColor: "aliceblue",
                margin: "2px 0px",
                borderRadius: "4px"
              }}
            >
              <h5>{item.id}</h5>
              <p style={{ margin: "0" }}>Title</p>
              <h4 style={{ margin: "0" }}>{item.title}</h4>
              <p style={{ margin: "0", marginTop: "4px" }}>Body</p>
              <h4 style={{ margin: "0" }}>{item.body}</h4>
            </div>
          );
        }}
      />
    </div>
  );
}
