import React, { Component } from "react";
import axios from "axios";

export class Update extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDes = this.onChangeDes.bind(this);
    this.onChangeSDate = this.onChangeSDate.bind(this);
    this.onChangeEDate = this.onChangeEDate.bind(this);
    this.onUpdateCancel = this.onUpdateCancel.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      description: "",
      dateStarted: null,
      dateCompleted: null,
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeDes(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeSDate(e) {
    this.setState({
      dateStarted: e.target.value,
    });
  }
  onChangeEDate(e) {
    this.setState({
      dateCompleted: e.target.value,
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get("api/Trips/ById/" + id).then((trip) => {
      const response = trip.data;

      this.setState({
        name: response.name,
        description: response.description,
        dateStarted: new Date(response.dateStarted).toISOString().slice(0, 10),
        dateCompleted: response.dateCompleted
          ? new Date(response.dateCompleted).toISOString().slice(0, 10)
          : null,
      });
    });
  }

  onUpdateCancel() {
    const { history } = this.props;
    history.push("/trips");
  }

  onSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    const { id } = this.props.match.params;

    let tripObj = {
      name: this.state.name,
      description: this.state.description,
      dateStarted: new Date(this.state.dateStarted).toISOString(),
      dateCompleted: this.state.dateCompleted
        ? new Date(this.state.dateCompleted).toISOString()
        : null,
    };

    axios.put("api/Trips/UpdateTrip/" + id, tripObj).then((result) => {
      history.push("/trips");
    });
  }
  render() {
    return (
      <div className="trip-form">
        <h4>Add New Trip</h4>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Trip Name:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Trip Description:</label>
            <textarea
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDes}
            />
          </div>
          <div className="row">
            <div className="col col-md-6 col-sm-6 col-xs-12">
              <div className="form-group">
                <label>Date of start: </label>
                <input
                  type="date"
                  className="form-control"
                  value={this.state.dateStarted}
                  onChange={this.onChangeSDate}
                />
              </div>
            </div>
            <div className="col col-md-6 col-sm-6 col-xs-12">
              <div className="form-group">
                <label>Date of completion: </label>
                <input
                  type="date"
                  className="form-control"
                  value={this.state.dateCompleted}
                  onChange={this.onChangeEDate}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <button onClick={this.onUpdateCancel} className="btn btn-default">
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Update;
