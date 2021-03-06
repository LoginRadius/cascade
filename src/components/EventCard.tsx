import moment from "moment";
import React from "react";
import { Event } from "../constants/eventData";
export interface EventCardProps extends Event {}

export interface EventCardState {
  duration: moment.Duration;
}

class EventCard extends React.Component<EventCardProps, EventCardState> {
  // constructor(props: EventCardProps) {
  //   super(props);
  //   let duration = moment.duration(
  //     moment(this.props.Datetime).diff(moment().utc())
  //   );
  //   this.state = {
  //     duration,
  //   };
  //   // this._startTimer();
  // }
  // _startTimer = () => {
  //   setInterval(() => {
  //     let duration = moment.duration(
  //       moment(this.props.Datetime).diff(moment().utc())
  //     );
  //     this.setState({ duration });
  //   }, 1000);
  // };
  render() {
    return (
      <div className="col-md-6 col-lg-4 item">
        <div className="box">
          <h3 className="name">{this.props.Name}</h3>
          <p className="title">{this.props.Location}</p>
          <strong>
            <p>{`Dt: ${this.props.StartDate}`}</p>
          </strong>
          <i className="fa fa-3x fa-microphone mt-2" aria-hidden="true"></i>
          <div className="register">
            <a
              href={this.props.RegisterURL}
              target="blank"
              className="btn btn-common"
            >
              {`${
                this.props.Category === "TOHOST" ? "View Detail" : "Get Ticket"
              }`}
            </a>
          </div>
          {/* {this.state.duration && this._eventTimer(this.state.duration)} */}
          {this.props.Category === "TOHOST"
            ? this.props.Presenters && (
                <>
                  <h5>
                    <u>{"Our Speakers"}</u>
                  </h5>
                  <div className="speakers d-flex">
                    {this.props.Presenters?.map((press, index) => (
                      <div
                        key={index}
                        className="column m-2 d-flex flex-column"
                      >
                        <img
                          className="rounded-circle text-center m-auto"
                          src={
                            press.Thumbnail ||
                            `https://ui-avatars.com/api/?name=${press.Name}&size=460`
                          }
                          alt={press.Name}
                        />
                        <span>{press.Name}</span>
                      </div>
                    ))}
                  </div>{" "}
                </>
              )
            : this.props.Attendees && (
                <>
                  <h5>
                    <u>{"Attendees"}</u>
                  </h5>
                  <div className="speakers d-flex">
                    {this.props.Attendees?.split("/").map((attendee, index) => (
                      <div
                        key={index}
                        className="column m-2 d-flex flex-column"
                      >
                        <span>{attendee}</span>
                      </div>
                    ))}
                  </div>{" "}
                </>
              )}
        </div>
      </div>
    );
  }

  _eventTimer = (duration: moment.Duration) => {
    return (
      <div className="timer-box d-flex">
        <div className="time d-flex flex-column m-1">
          <span> {Math.round(duration.asDays())} </span>
          <span> Days </span>
        </div>
        <span className="align-middle"> : </span>
        <div className="time d-flex flex-column m-1">
          <span> {duration.hours()} </span>
          <span> Hours </span>
        </div>
        <span className="align-middle"> : </span>
        <div className="time d-flex flex-column m-1">
          <span> {duration.minutes()} </span>
          <span> Minutes </span>
        </div>
        <span className="align-middle"> : </span>
        <div className="time d-flex flex-column m-1">
          <span> {duration.seconds()}</span>
          <span> Seconds </span>
        </div>
      </div>
    );
  };
}

export default EventCard;
