import React, { Component } from "react";
import { RenderItems, titleFormatted } from "../../lib/MetadataRenderer";
import { Thumbnail } from "../../components/Thumbnail";
import "../../css/SearchResult.css";
import { fetchLanguages } from "../../lib/fetch_tools";

class ItemListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: null
    };
  }

  componentDidMount() {
    fetchLanguages(this, "abbr");
  }

  render() {
    const keyArray = [
      "identifier",
      "description",
      "date",
      "source",
      "language",
      "creator",
      "resource_type",
      "medium",
      "belongs_to",
      "tags",
      "related_url"
    ];
    if (this.state.languages !== null) {
      return (
        <li key={this.props.item.id} className="collection-entry">
          {titleFormatted(this.props.item, this.props.dataType)}
          <span className="collection-img">
            <Thumbnail item={this.props.item} dataType={this.props.dataType} />
          </span>
          <div className="collection-details">
            <RenderItems
              keyArray={keyArray}
              item={this.props.item}
              languages={this.state.languages}
            />
          </div>
        </li>
      );
    } else {
      return <></>;
    }
  }
}
export default ItemListView;
