import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getCollection, getCollectionmap } from "../../graphql/queries";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import SvgIcon from "@material-ui/core/SvgIcon";

class SubCollectionsLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      nextTokens: [],
      limit: 10,
      page: 0,
      totalPages: 1,
      mapID: null,
      collectionMap: null
    };
  }

  async loadMap() {
    if (this.state.mapID == null) {
      this.getMapID(this.props.collection.id);
    } else if (this.state.mapID) {
      const response = await API.graphql(
        graphqlOperation(getCollectionmap, {
          id: this.state.mapID
        })
      );
      let map = null;
      try {
        map = response.data.getCollectionmap.map_object;
      } catch (error) {
        console.error("Error fetching collection tree map");
      }
      this.setState({ collectionMap: JSON.parse(map) }, function() {
        this.updateParentSubcollections(
          this.props.collection,
          JSON.parse(map).children
        );
      });
    }
  }

  async getMapID() {
    let mapID = null;
    if (this.props.collection.collectionmap_id) {
      mapID = this.props.collection.collectionmap_id;
    } else {
      let parentID = this.props.collection.parent_collection[0];
      while (mapID == null && parentID) {
        let parent = await this.getParent(parentID);
        let parentData = parent.data.getCollection;
        if (parentData.parent_collection) {
          parentID = parentData.parent_collection[0];
        } else {
          parentID = null;
        }
        if (parentData.collectionmap_id) {
          mapID = parentData.collectionmap_id;
        }
      }
    }
    if (mapID == null) {
      mapID = false;
    }
    this.setState({ mapID: mapID }, function() {
      this.loadMap();
    });
  }

  async getParent(parent_id) {
    const parent_collection = await API.graphql(
      graphqlOperation(getCollection, {
        id: parent_id
      })
    );
    return parent_collection;
  }

  sortChildren(children) {
    return children.sort(function(a, b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  buildLabel(node) {
    const target = `${window.location.protocol}//${window.location.host}/collection/${node.custom_key}`;
    return <a href={target}>{node.name}</a>;
  }

  updateParentSubcollections(collection, subCollections) {
    this.props.updateSubCollections(
      this.props.parent,
      collection,
      subCollections
    );
  }

  componentDidMount() {
    this.loadMap();
  }

  render() {
    function MinusSquare(props) {
      return (
        <SvgIcon
          fontSize="inherit"
          style={{ width: 14, height: 14 }}
          {...props}
        >
          {/* tslint:disable-next-line: max-line-length */}
          <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
      );
    }

    function PlusSquare(props) {
      return (
        <SvgIcon
          fontSize="inherit"
          style={{ width: 14, height: 14 }}
          {...props}
        >
          {/* tslint:disable-next-line: max-line-length */}
          <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
      );
    }
    let return_value = null;
    if (this.state.collectionMap) {
      const renderTree = nodes => (
        <TreeItem
          key={nodes.id}
          nodeId={nodes.id}
          label={this.buildLabel(nodes)}
        >
          {Array.isArray(nodes.children)
            ? this.sortChildren(nodes.children).map(node => renderTree(node))
            : null}
        </TreeItem>
      );
      return_value = (
        <div className="collection-items-list-wrapper">
          <div className="mb-3">
            <h3
              className="subcollection-header"
              id="collection-subcollections-section"
            >
              Subcollections
            </h3>
          </div>
          
          <TreeView
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultExpanded={this.props.collection.heirarchy_path}
            defaultSelected={[this.props.collection.id]}
          >
            {renderTree(this.state.collectionMap)}
          </TreeView>
        </div>
      );
    } else {
      return_value = <div>Loading...</div>;
    }
    return return_value;
  }
}

export default SubCollectionsLoader;
