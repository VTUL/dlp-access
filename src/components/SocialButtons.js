import React, { Component } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
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
        case "Hatena":
          return (
            <HatenaShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
            >
              <HatenaIcon size={44} round />
            </HatenaShareButton>
          );
        case "Instagram":
          return (
            <InstapaperShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
            >
              <InstapaperIcon size={44} round />
            </InstapaperShareButton>
          );
        case "Line":
          return (
            <LineShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
            >
              <LineIcon size={44} round />
            </LineShareButton>
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
        case "LiveJournal":
          return (
            <LivejournalShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
            >
              <LivejournalIcon size={44} round />
            </LivejournalShareButton>
          );
        case "Mailru":
          return (
            <MailruShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
              imageUrl={this.props.image}
            >
              <MailruIcon size={44} round />
            </MailruShareButton>
          );
        case "OK":
          return (
            <OKShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
              image={this.props.image}
            >
              <OKIcon size={44} round />
            </OKShareButton>
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
        case "Pocket":
          return (
            <PocketShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
            >
              <PocketIcon size={44} round />
            </PocketShareButton>
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
        case "Telegram":
          return (
            <TelegramShareButton
              key={index}
              url={this.props.url}
              title={this.props.title}
            >
              <TelegramIcon size={44} round />
            </TelegramShareButton>
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
        case "VK":
          return (
            <VKShareButton
              key={index}
              url={this.props.URL}
              title={this.props.title}
              image={this.props.image}
            >
              <VKIcon size={44} round />
            </VKShareButton>
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
