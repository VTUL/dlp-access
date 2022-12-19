import { Component } from "react";
import 'pdfjs-dist/web/pdf_viewer.css';

const pdfjsLib = require("pdfjs-dist");

class PDFViewer extends Component {
  constructor(props) {
    super(props);
    // this.initEventBus();
    this.state = {
      pdfHeight: null
    };
  }

  initEventBus() {
    let eventBus = new pdfjsLib.EventBus();
    eventBus.on('pagesinit', (e) => {
      this.setState({
        scale: this._pdfViewer.currentScale
      });
      if (this.props.onInit) {
        this.props.onInit({});
      }
      if (this.props.onScaleChanged) {
        this.props.onScaleChanged({scale: this.state.scale});
      }
    });
    eventBus.on('scalechange', (e) => {
      if (this.props.onScaleChanged) {
        this.props.onScaleChanged({scale: e.scale});
      }
    });
    this._eventBus = eventBus;
  }

  loadPDF = async () => {
    // const _this = this;
    // const loadingTask = pdfjsLib.getDocument(this.props.manifest_url);
    // loadingTask.promise.then(function(pdf) {
    //   pdf.getPage(1).then(function(page) {
    //     const viewport = page.getViewport({ scale: 1.5 });
    //     _this.setState({ pdfHeight: viewport.height + "px" });
    //   });
    // });
    const loadingTask = pdfjsLib.getDocument(this.props.manifest_url);
    loadingTask.promise
      .then(function (pdfDocument) {
        return pdfDocument.getPage(1).then(function (pdfPage) {
          const viewport = pdfPage.getViewport({ scale: 1.5 });
          const canvas = document.getElementById("pdf-canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");
          const renderTask = pdfPage.render({
            canvasContext: ctx,
            viewport,
          });
          return renderTask.promise;
        });
      })
      .catch(function (reason) {
        console.error("Error: " + reason);
      });
  }

  componentDidMount() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
    this.loadPDF();
  }

  render() {
    let pdfView = <></>;
    return pdfView;
  }
}
export default PDFViewer;
