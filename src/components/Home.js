import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import "../App.css";
import TypedContext from "./TypedContext";

const SpinningLoader = styled.div`
  padding-top: 40px;
  :before {
    content: "";
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    left: 50%;
    border-radius: 50%;
    position: absolute;
    border: 2px solid #ccc;
    border-top-color: #000;
    animation: spinner 0.8s linear infinite;
  }
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Home = () => {
  const [emptyArray, setemptyArray] = useState(new Array(10).fill(" "));
  useEffect(() => {
    setTimeout(async () => {
      let data = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      ).then((res) => res.json());
      setemptyArray(data);
      // console.log(data);
    }, 5000);
  }, []);

  return (
    <div>
      <TypedContext />
      <div className="grid">
        {emptyArray.map((data, ind) => (
          <div class="card" key={ind}>
            <div class="header">
              <img
                class="header-img skeleton"
                src={`https://source.unsplash.com/100x100/?nature&${ind}`}
              />
              <div class="title" data-title>
                <div class={data?.title ? "default" : "skeleton skeleton-text"}>
                  {data?.title}
                </div>
                {!data?.title && (
                  <div
                    class={data?.title ? "" : "skeleton skeleton-text"}
                  ></div>
                )}
              </div>
            </div>
            <div data-body>
              <div class={data?.body ? "" : "skeleton skeleton-text"}>
                {data?.body}
              </div>
              {!data?.body && (
                <Fragment>
                  <div class={data?.body ? "" : "skeleton skeleton-text"}></div>
                  <div class={data?.body ? "" : "skeleton skeleton-text"}></div>
                  <div class={data?.body ? "" : "skeleton skeleton-text"}></div>
                </Fragment>
              )}
            </div>
          </div>
        ))}
      </div>
      {emptyArray.length > 10 ? "" : <SpinningLoader />}
    </div>
  );
};

export default React.memo(Home);
