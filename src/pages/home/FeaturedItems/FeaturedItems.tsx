import { FC, useState, useEffect } from "react";
import { FeaturedItem } from "./FeaturedItem";
import { Controls } from "./Controls";
import { v4 as uuid } from "uuid";

import "../../../css/FeaturedItems.scss";

type Props = {
  featuredItems: [
    {
      altText: string;
      cardTitle: string;
      link: string;
      src: string;
    }
  ];
  site: {
    siteId: string;
  };
};

export const FeaturedItems: FC<Props> = ({ featuredItems, site }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [multiplier, setMultiplier] = useState(4);

  useEffect(() => {
    function setValues() {
      if (window.innerWidth >= 768) {
        if (startIndex % 4) {
          setStartIndex(startIndex - 2);
          setEndIndex(startIndex + 2);
          setMultiplier(4);
        } else {
          setEndIndex(startIndex + 4);
          setMultiplier(4);
        }
      } else {
        setEndIndex(startIndex + 2);
        setMultiplier(2);
      }
    }
    setValues();
    window.addEventListener("resize", setValues);
    return () => {
      window.removeEventListener("resize", setValues);
    };
  }, [startIndex, endIndex, multiplier]);

  const handleClick = (group: number) => {
    let start = (group - 1) * multiplier;
    let end =
      start + multiplier < featuredItems.length
        ? start + multiplier
        : featuredItems.length + 1;
    setStartIndex(start);
    setEndIndex(end);
  };

  if (!featuredItems?.length) {
    return null;
  }

  return (
    <div
      className="featured-items-wrapper"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our Featured Items"
    >
      <div className="featured-items-heading">
        <h2>Our Featured Items</h2>
      </div>
      <div
        className="row justify-content-center"
        id="slide-row"
        aria-live="off"
      >
        {featuredItems.map((item, index) => {
          return (
            <FeaturedItem
              key={item.src}
              item={item}
              position={startIndex + index + 1}
              length={featuredItems.length}
              site={site}
              style={
                index >= startIndex && index < endIndex
                  ? { display: "block" }
                  : { display: "none" }
              }
            />
          );
        })}
      </div>
      <div
        className="featured-items-indicators"
        role="group"
        aria-label="Choose slide group"
      >
        {Array(Math.ceil(featuredItems.length / multiplier))
          .fill(null)
          .map((el, index) => {
            const id = uuid();
            return (
              <Controls
                key={id}
                index={index + 1}
                multiplier={multiplier}
                startIndex={startIndex}
                handleClick={handleClick}
              />
            );
          })}
      </div>
    </div>
  );
};
