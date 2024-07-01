import { Component } from "react";
import "../css/Viewer.scss";

class PDFViewer extends Component {
  render() {
    return (
      <object
        id="pdf-object"
        data={this.props.manifest_url}
        type="application/pdf"
        width="100%"
        height="1000"
      >
        <p>
          Download <a href={this.props.manifest_url}>PDF</a>
        </p>
      </object>
    );
  }
}
export default PDFViewer;
