import { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class ResultsNumberDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLimit: "10"
    };
  }

  handleChange = (event, result) => {
    this.setState({
      selectedLimit: result.value
    });
    this.props.setLimit(event, result);
  };

  formatActiveDisplayText = () => {
    return `${this.state.selectedLimit} per page`;
  };

  render() {
    const numberOptions = [
      {
        key: "10",
        text: "10",
        value: "10"
      },
      {
        key: "50",
        text: "50",
        value: "50"
      },
      {
        key: "100",
        text: "100",
        value: "100"
      }
    ];
    return (
      <>
        <Dropdown
          title="Items per page"
          selection
          compact
          text={this.formatActiveDisplayText()}
          value={this.state.selectedLimit}
          options={numberOptions}
          onChange={this.handleChange}
          aria-label="Results per page"
          aria-haspopup="listbox"
          className={this.props.className || ""}
        />
      </>
    );
  }
}

export default ResultsNumberDropdown;
