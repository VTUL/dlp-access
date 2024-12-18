import { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/SearchResult.scss";
import { fetchLanguages } from "../lib/fetchTools";
import { RenderItems, arkLinkFormatted } from "../lib/MetadataRenderer";
import { Thumbnail } from "./Thumbnail";

class ItemListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: null
    };
  }

  componentDidMount() {
    fetchLanguages(this, this.props.site, "abbr");
  }

  renderPageCount = () => {
    const archiveOptions = this.props.item?.archiveOptions;
    if (!archiveOptions) return false;
    const archiveOptObj = JSON.parse(archiveOptions);
    return "page_count" in archiveOptObj;
  };

  getKeyArray = () => {
    let keyArray = [
      { field: "description", label: "Description" },
      {
        field: "format",
        label: `Format${this.props.item?.format?.length > 1 ? "s" : ""}`
      },
      { field: "tags", label: "Tags" },
      { field: "creator", label: "Creator" }
    ];
    if (this.renderPageCount()) {
      keyArray.push({
        field: "page_count",
        label: "Page(s)"
      });
    }
    return keyArray;
  };

  render() {
    const keyArray = this.getKeyArray();
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
              <h3>{this.props.item.title}</h3>
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
