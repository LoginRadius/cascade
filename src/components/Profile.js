import React, { useState, useEffect } from "react";

function Profile() {
  const [person, setPerson] = useState({});
  let profname = "mohammed786";
  useEffect(() => {
    fetch("https://api.github.com/users/" + profname)
      .then((res) => res.json())
      .then((temp) => {
        setPerson(temp);
      });
  }, []);
  return (
    <div>
      <div className="ui container">
        <h2 className="ui header" style={{ paddingTop: 10 }}>
          <img alt="avatar" src={person.avatar_url} />
          <div className="content izzuhead">
            <span id="profnam2">{profname}</span>
            <div className="sub header izzuhead">
              <span id="fullname">{person.name}</span>&nbsp;
              <a
                href={`https://github.com/${profname}`}
                target="_blank"
                id="proflink"
                rel="noopener noreferrer"
              >
                <i className="share icon" />
              </a>
            </div>
          </div>
        </h2>
        <hr />
        <div className="ui relaxed divided list">
          <div className="item">
            <i className="large address card middle aligned icon" />
            <div className="content">
              <div className="header izzuhead" id="useriden">
                {person.id}
              </div>
              <div className="description izzuhead">Identity</div>
            </div>
          </div>
          <div className="item">
            <i className="large building middle aligned icon" />
            <div className="content">
              <div className="header izzuhead" id="compname">
                {person.company}
              </div>
              <div className="description izzuhead">Company</div>
            </div>
          </div>
          <div className="item">
            <i className="large compass middle aligned icon" />
            <div className="content">
              <div className="header izzuhead" id="bloglink">
                {person.blog}
              </div>
              <div className="description izzuhead">Portfolio</div>
            </div>
          </div>
          <div className="item">
            <i className="large search middle aligned icon" />
            <div className="content">
              <div className="header izzuhead" id="location">
                {person.location}
              </div>
              <div className="description izzuhead">Location</div>
            </div>
          </div>
          <div className="item">
            <i className="large clone outline middle aligned icon" />
            <div className="content">
              <div className="header izzuhead" id="publrepo">
                {person.public_repos}
              </div>
              <div className="description izzuhead">Public repositories</div>
            </div>
          </div>
          <div className="item">
            <i className="large bell middle aligned icon" />
            <div className="content">
              <div className="header izzuhead" id="follhere">
                {person.followers}
              </div>
              <div className="description izzuhead">Followers</div>
            </div>
          </div>
          <div className="item">
            <i className="large microphone middle aligned icon" />
            <div className="content">
              <div className="header izzuhead" id="follther">
                {person.following}
              </div>
              <div className="description izzuhead">Following</div>
            </div>
          </div>
          <div className="item">
            <i className="large calendar outline middle aligned icon" />
            <div className="content">
              <div className="header izzuhead" id="modedate">
                {person.updated_at}
              </div>
              <div className="description izzuhead">Last modified on</div>
            </div>
          </div>
          <div className="item">
            <i className="large plus circle middle aligned icon"></i>
            <div className="content">
              <div className="header izzuhead" id="makedate">
                {person.created_at}
              </div>
              <div className="description izzuhead">Account created on</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
