import React, { Component } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";
import "../css/socialButtons.scss";

class SocialButtons extends Component {
  render() {
    const buttons = this.props.buttons.map((platform, index) => {
      switch (platform) {
        case "Email":
          return (
            <EmailShareButton
              key={index}
              url={this.props.url}
              subject={this.props.title}
            >
              <EmailIcon size={44} round />
            </EmailShareButton>
          );
        case "Facebook":
          return (
            <FacebookShareButton
              key={index}
              url={this.props.url}
              quote={this.props.title}
            >
              <FacebookIcon size={44} round />
            </FacebookShareButton>
          );
        case "LinkedIn":
          return (
            <LinkedinShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
            >
              <LinkedinIcon size={44} round />
            </LinkedinShareButton>
          );
        case "Pinterest":
          return (
            <PinterestShareButton
              key={index}
              url={this.props.url}
              media={this.props.image}
            >
              <PinterestIcon size={44} round />
            </PinterestShareButton>
          );
        case "Reddit":
          return (
            <RedditShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
            >
              <RedditIcon size={44} round />
            </RedditShareButton>
          );
        case "Tumblr":
          return (
            <TumblrShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
            >
              <TumblrIcon size={44} round />
            </TumblrShareButton>
          );
        case "Twitter":
          return (
            <TwitterShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
            >
              <TwitterIcon size={44} round />
            </TwitterShareButton>
          );
        case "Viber":
          return (
            <ViberShareButton
              key={index}
              url={this.props.URL}
              title={this.props.title}
            >
              <ViberIcon size={44} round />
            </ViberShareButton>
          );
        case "Whatsapp":
          return (
            <WhatsappShareButton
              key={index}
              url={this.props.URL}
              title={this.props.title}
            >
              <WhatsappIcon size={44} round />
            </WhatsappShareButton>
          );
        case "Workplace":
          return (
            <WorkplaceShareButton
              key={index}
              url={this.props.URL}
              quote={this.props.title}
            >
              <WorkplaceIcon size={44} round />
            </WorkplaceShareButton>
          );
        default:
          return <></>;
      }
    });
    return (
      <div className="social-buttons-section">
        <h3>Share</h3>
        {buttons}
      </div>
    );
  }
}
export default SocialButtons;
