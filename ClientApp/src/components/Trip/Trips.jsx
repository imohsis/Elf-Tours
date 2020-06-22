import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getAllTrips } from "../../actions/tripActions";

export class Trips extends Component {
  constructor(props) {
    super(props);
    this.onTripUpdate = this.onTripUpdate.bind(this);
    this.onTripDelete = this.onTripDelete.bind(this);

    this.state = {
      trips: [],
      loading: true,
      failed: false,
      error: "",
    };
  }

  componentDidMount() {
    this.props.getAllTrips();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.trips.data != this.props.trips.data) {
      this.setState({ trips: this.props.trips.data });
    }
  }

  onTripUpdate(id) {
    const { history } = this.props;
    history.push("/update/" + id);
  }
  onTripDelete(id) {
    const { history } = this.props;
    history.push("/delete/" + id);
  }

  renderAllTripsTable(trips) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date Started</th>
            <th>Date Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <th>{trip.name}</th>
              <th>{trip.description}</th>
              <th>{new Date(trip.dateStarted).toISOString().slice(0, 10)}</th>
              <th>
                {trip.dateCompleted
                  ? new Date(trip.dateCompleted).toISOString().slice(0, 10)
                  : "-"}
              </th>
              <th>
                <div className="form-group">
                  <button
                    onClick={() => this.onTripUpdate(trip.id)}
                    className="btn btn-primary m-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => this.onTripDelete(trip.id)}
                    className="btn btn-danger m-2"
                  >
                    Delete
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  render() {
    let content = this.props.trips.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.state.trips.length && this.renderAllTripsTable(this.state.trips)
    );

    return (
      <div>
        <h2>All Trips</h2>
        <p>Here are all the trips</p>
        {content}
      </div>
    );
  }
}

// export default Trips;

const mapStateToProps = ({ trips }) => ({
  trips,
});

export default connect(mapStateToProps, { getAllTrips })(Trips);
