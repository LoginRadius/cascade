import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import UserCard from "../../components/UserCard/index";
import { people, PeopleSchema } from "../../constants/peopleData";
import { Modal, Image, Header, Popup } from "semantic-ui-react";
import qs from "qs";

interface PeopleProps extends RouteComponentProps {}
interface PeopleState {
  selectedProfile?: PeopleSchema;
}

class People extends React.Component<PeopleProps, PeopleState> {
  constructor(props: PeopleProps) {
    super(props);

    // Add selected profile from query
    const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    let profile: PeopleState["selectedProfile"];

    if (query.sel) {
      profile = people.find(peep => peep.Email === query.sel);
    }

    this.state = {
      selectedProfile: profile
    };
  }

  private _getPeopleCategory = (people: PeopleSchema[]) => {
    const cat: Map<string, PeopleSchema[]> = new Map();
    people.forEach(peep => {
      const catName = /(?:Engineer|Developer)/g.test(peep.Category)
        ? "Engineering"
        : /(?:Director|Analyst)/g.test(peep.Category)
        ? "Product Management"
        : peep.Category;
      const current = cat.get(catName);
      cat.set(catName, current ? [...current, peep] : [peep]);
    });

    return cat;
  };

  _getSocialInfo = (profile?: PeopleSchema) => {
    if (profile === undefined) return [];

    const social = [];
    if (profile.GithubURL) {
      social.push({ name: "github", url: profile.GithubURL, icon: "github" });
    }
    if (profile.Medium) {
      social.push({ name: "medium", url: profile.Medium, icon: "medium" });
    }
    if (profile.PersonalBlogURL) {
      social.push({ name: "blog", url: profile.PersonalBlogURL, icon: "user" });
    }
    if (profile.PersonalWebsite) {
      social.push({
        name: "website",
        url: profile.PersonalWebsite,
        icon: "portrait"
      });
    }
    if (profile.StackOverFlow) {
      social.push({
        name: "stack-overflow",
        url: profile.StackOverFlow,
        icon: "stack-overflow"
      });
    }
    return social;
  };

  // Utils
  _updateURLQuery = (add?: { [key: string]: string }, remove?: string[]) => {
    const { location, history } = this.props;
    const current = qs.parse(location.search, { ignoreQueryPrefix: true });
    const newQuery = { ...(current || {}), ...(add || {}) };

    if (remove) {
      remove.forEach(param => {
        delete newQuery[param];
      });
    }

    history.push(
      `${location.pathname}/?${Object.keys(newQuery).map(
        q => q + "=" + newQuery[q]
      )}`
    );
  };

  // Sets alternate image from ui-avatars.com if original URL doesn't work
  setAlternate(e: React.SyntheticEvent, name: any){
    let imageTag = e.currentTarget.childNodes[0] as HTMLImageElement;
    imageTag.setAttribute("src", `https://ui-avatars.com/api/?name=${name}&size=460`);
  };
  
  render() {
    const peopleCat = this._getPeopleCategory(people);
    const { selectedProfile } = this.state;
    let socialInfo = this._getSocialInfo(selectedProfile);

    return (
      <div className="team-boxed">
        <div className="container">
          <div className="intro">
            <h2 className="text-center">People </h2>
            <p className="text-center">
              This is our team, who help you bring a delighful user experience!
            </p>
          </div>

          {Array.from(peopleCat.keys()).map((category, catIndex) => {
            return (
              <div className="teams mt-5" key={catIndex}>
                <h1 className="text-left">{category}</h1>
                <div className="row">
                  {(peopleCat.get(category) || []).map((peep, index) => {
                    return (
                      <UserCard
                        key={index}
                        {...peep}
                        onClick={profile => {
                          this.setState({ selectedProfile: profile });
                          this._updateURLQuery({ sel: profile.Email });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}

          <Modal
            open={selectedProfile !== undefined}
            onClose={() => {
              this.setState({ selectedProfile: undefined });
              this._updateURLQuery(undefined, ["sel"]);
            }}
            size="small"
            centered
            style={{ height: "max-content", margin: "25% auto" }}
          >
            <Modal.Content image>
              <Image
                wrapped
                size="medium"
                src={
                  selectedProfile?.Thumbnail ||
                  `https://ui-avatars.com/api/?name=${selectedProfile?.Name}&size=460`
                }
                onError={(event:React.SyntheticEvent)=>this.setAlternate(event,selectedProfile?.Name)}
              />
              <Modal.Description>
                <Header>{selectedProfile?.Name}</Header>
                <i>{selectedProfile?.Category}</i>

                {/* Expertise */}
                <p className="mt-4">
                  I'm expert at {selectedProfile?.Expertat}
                </p>

                {/* Can work on */}
                {selectedProfile?.CanWorkOn && (
                  <p className="mt-1">
                    I can also work on {selectedProfile.CanWorkOn}
                  </p>
                )}

                {/* Social */}
                {socialInfo.length ? (
                  <div className="mt-1">
                    <i>Find me on</i>
                    <br />
                    {socialInfo.map((soc, index) => {
                      return (
                        <Popup
                          key={index}
                          content={soc.name}
                          inverted
                          position="top center"
                          offset="0 10px"
                          trigger={
                            <a
                              href={soc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mr-3"
                              style={{ cursor: "pointer" }}
                            >
                              <i className={`fa fa-2x fa-${soc.icon}`}></i>
                            </a>
                          }
                        />
                      );
                    })}
                  </div>
                ) : null}
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
      </div>
    );
  }
}

export default withRouter(People);
