import React, { Component } from "react";
import DashboardContainer from "../DashboardContainer";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class OrganizationsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organizations: [],
      indexErrors: "",
    };
  }

  fetchOrganizations() {
    axios
      .get("http://localhost:3000/api/v1/organizations", {
        withCredentials: true,
      })
      .then((response) => {
        /// We have a list of organizations from the backend
        if (response.data.success) {
          this.setState({
            organizations: response.data.organizations,
          });
          /// Something happened
        } else {
          this.setState({
            indexErrors: "Couldn't retrieve organizations!",
          });
        }
      })
      /// Process any server errors
      .catch((error) => {
        toast.error("We had an error: " + error.message);
      });
  }

  componentDidMount() {
    this.fetchOrganizations();
  }

  render() {
    return (
      <DashboardContainer
        loggedIn={this.props.loggedIn}
        handleLogout={this.props.handleLogout}
      >
        <div className="col-lg-6 mx-auto">
          <div className="card mt-5">
            <div className="card-header">
              <i className="fa fa-building"></i>
              <span className="pl-2 subtitle">Organizations</span>
              <Link
                to="/dashboard/organizations/new"
                className="float-right btn btn-dark btn-sm"
              >
                <i className="fa fa-fw fa-plus-circle"></i>
                <span className="pl-2">Add Organization</span>
              </Link>
            </div>
            <div className="card-body">
              {this.state.indexErrors ? (
                <span className="text-danger">{indexErrors}</span>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.organizations.map(function (organization) {
                      return (
                        <tr key={organization.id}>
                          <td>{organization.name}</td>
                          <td>
                            <Link
                              to={"/dashboard/organizations/" + organization.id}
                              className="btn btn-dark"
                            >
                              <i
                                className="fa fa-pencil-alt"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </DashboardContainer>
    );
  }
}
