import React, { Component } from "react";
import { RenderItems, titleFormatted } from "../../lib/MetadataRenderer";
import Thumbnail from "../../components/Thumbnail";
import "../../css/SearchResult.css";
import { fetchLanguages } from "../../lib/fetchTools";

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
    const keyArray = ["description", "tags", "creator"];
    if (this.state.languages !== null) {
      return (
        <div key={this.props.item.id} className="col-12 collection-entry">
          <div className="collection-img">
            <Thumbnail item={this.props.item} dataType={this.props.dataType} />
          </div>
          <div className="collection-details">
            {titleFormatted(this.props.item, this.props.dataType)}
            <RenderItems
              keyArray={keyArray}
              item={this.props.item}
              languages={this.state.languages}
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
