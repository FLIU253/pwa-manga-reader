import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { DownCircleFilled } from "@ant-design/icons";

const KEEP_SCROLLING = 0.5;
const ALMOST_THERE = 0.7;
const START_REDIRECT = 0.9;

const NextChapterScreen = ({ rootRef }) => {
  const screenRef = useRef();
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  useEffect(() => {
    const options = {
      root: rootRef?.current ?? null,
      rootMargin: "150px 0px",
      threshold: [KEEP_SCROLLING, ALMOST_THERE, START_REDIRECT],
    };

    const observer = new IntersectionObserver((entries) => {
      setIntersectionRatio(entries[0].intersectionRatio);
    }, options);

    observer.observe(screenRef.current);

    return () => observer.disconnect();
  }, []);

  let screenModifierClass, screenText;

  if (intersectionRatio > START_REDIRECT) {
    screenModifierClass = "-start-redirect";
    screenText = "Going to next chapter";
  } else if (intersectionRatio > ALMOST_THERE) {
    screenModifierClass = "-almost-there";
    screenText = "almost there...";
  } else if (intersectionRatio > KEEP_SCROLLING) {
    screenModifierClass = "-keep-scrolling";
    screenText = "Keep scrolling...";
  } else {
    screenText = "Next Chapter";
  }

  return (
    <div
      className={classNames("next-chapter-screen", screenModifierClass)}
      ref={screenRef}
    >
      <span className="next-chapter-screen-label">
        {screenText}
        <br />
        <DownCircleFilled />
      </span>
    </div>
  );
};

export default NextChapterScreen;
