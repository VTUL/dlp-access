import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

import "./FeaturedCarousel.css";

const slide1 = require("../../images/carousel/1_iawa_logo.jpg");
const slide2 = require("../../images/carousel/2_Ms2008_089_B001_F007_001_SecondSt_Ms_001_r.jpg");
const slide3 = require("../../images/carousel/3_Church_r.jpg");
const slide4 = require("../../images/carousel/4_Rodeck_Vienna_r.jpg");
const slide5 = require("../../images/carousel/5_rupp.jpg");
const slide6 = require("../../images/carousel/6_Ms2013_023_F003_019_Austellungbau_Dr_001_r.jpg");
const slide7 = require("../../images/carousel/7_Ms1991_046_MeditationGroup_B094_015_copy_25p_r.jpg");
const slide8 = require("../../images/carousel/8_Ms1991_046_MeditationGroup_B094_002_25p_r.jpg");
const slide9 = require("../../images/carousel/9_Ms1998_022_B001_F002_001_Pro_Ms_031_r.jpg");
const slide10 = require("../../images/carousel/10_Ms1990_016_F026_014_Garvey_Dr_007_25p_r.jpg");
const slide11 = require("../../images/carousel/11_Ms2013_090_B005_015_Cunningham_Ph_001_copy_r.jpg");
const slide12 = require("../../images/carousel/12_00002_50p_r.jpg");
const slide13 = require("../../images/carousel/13_ArchitectPortraits_r.jpg");

const items = [
  {
    src: slide1,
    altText: "Welcome to the IAWA Online Collections",
    captionHeader: "Welcome to the IAWA Online Collections",
    captionText:
      "Browse through selected items from the personal collections of 20th century women architects"
  },
  {
    src: slide2,
    altText: "Alexander",
    captionHeader: "Alexander",
    captionText: ""
  },
  {
    src: slide3,
    altText: "Melita Rodeck",
    captionHeader: "Melita Rodeck",
    captionText: ""
  },
  {
    src: slide4,
    altText: "Melita Rodeck",
    captionHeader: "Melita Rodeck",
    captionText: ""
  },
  {
    src: slide5,
    altText: "Sigrid Rupp",
    captionHeader: "Sigrid Rupp",
    captionText: ""
  },
  {
    src: slide6,
    altText: "Dorothee Stelzer King",
    captionHeader: "Dorothee Stelzer King",
    captionText: ""
  },
  {
    src: slide7,
    altText: "Zelma Wilson",
    captionHeader: "Zelma Wilson",
    captionText: ""
  },
  {
    src: slide8,
    altText: "Zelma Wilson",
    captionHeader: "Zelma Wilson",
    captionText: ""
  },
  {
    src: slide9,
    altText: "Jean Linden Young",
    captionHeader: "Jean Linden Young",
    captionText: ""
  },
  {
    src: slide10,
    altText: "Susana Torre",
    captionHeader: "Susana Torre",
    captionText: ""
  },
  {
    src: slide11,
    altText: "Marie Louise Laleyan",
    captionHeader: "Marie Louise Laleyan",
    captionText: ""
  },
  {
    src: slide12,
    altText: "Eleanore Pettersen",
    captionHeader: "Eleanore Pettersen",
    captionText: ""
  },
  {
    src: slide13,
    altText: "IAWA Portraits",
    captionHeader: "IAWA Portraits",
    captionText: "Architect Portraits"
  }
];

class FeaturedCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption
            captionText={item.captionText}
            captionHeader={item.captionHeader}
          />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    );
  }
}

export default FeaturedCarousel;
