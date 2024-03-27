import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { RenderItems, arkLinkFormatted } from "../lib/MetadataRenderer";
import { Thumbnail } from "./Thumbnail";
import "../css/SearchResult.scss";
import { fetchLanguages, fetchPageCount } from "../lib/fetchTools";

class ItemListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: null
    };
  }

  componentDidMount() {
    fetchLanguages(this, this.props.site, "abbr");
    fetchPageCount(this);
  }

  render() {
    const keyArray = [
      { field: "description", label: "Description" },
      { field: "tags", label: "Tags" },
      { field: "creator", label: "Creator" }
    ];
    if (this.state.languages !== null) {
      return (
        <div key={this.props.item.id} className="col-12 collection-entry">
          <NavLink
            to={`/${this.props.category}/${arkLinkFormatted(
              this.props.item.custom_key
            )}`}
          >
            <div className="collection-img">
              <Thumbnail
                item={this.props.item}
                category={this.props.category}
                site={this.props.site}
              />
            </div>
          </NavLink>
          <div className="collection-details">
            <NavLink
              to={`/${this.props.category}/${arkLinkFormatted(
                this.props.item.custom_key
              )}`}
            >
              <h3>
                {this.props.item.title}
                {this.state.pageCnt && parseInt(this.state.pageCnt) > 1 && (
                  <span className="ml-1">[{this.state.pageCnt}]</span>
                )}
              </h3>
            </NavLink>
            <RenderItems
              keyArray={keyArray}
              item={this.props.item}
              languages={this.state.languages}
              site={this.props.site}
            />
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}
export default ItemListView;
