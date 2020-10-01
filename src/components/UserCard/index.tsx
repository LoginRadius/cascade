import * as React from "react";
import "./UserCard.scss";
import { PeopleSchema } from "../../constants/peopleData";
import { Image, Popup } from "semantic-ui-react";

export interface UserCardProps extends PeopleSchema {
  onClick?: (people: PeopleSchema) => void;
}
const UserCard: React.FC<UserCardProps> = ({ onClick, ...props }) => {
  // const social = getSocialInfo(props);

  // Sets alternate image from ui-avatars.com if original URL doesn't work
  function setAlternate(e: React.SyntheticEvent, name: any){
    let imageTag = e.currentTarget as HTMLImageElement;
    imageTag.setAttribute("src", `https://ui-avatars.com/api/?name=${name}&size=460`);
  };

  return (
    <Popup
      content={getTooltipContent(props)}
      header={props.Name}
      inverted
      trigger={
        <Image
          src={
            props.Thumbnail ||
            `https://ui-avatars.com/api/?name=${props.Name}&size=460`
          }
          avatar
          size="tiny"
          onClick={() => onClick && onClick(props)}
          className="m-2"
          style={{ cursor: "pointer" }}
          onError={(event:React.SyntheticEvent)=>setAlternate(event, props.Name)}
        />
      }
    />
  );
};

function getTooltipContent(props: UserCardProps) {
  return (
    <div className="user-card tooltip-content">
      <i>{props.Category}</i>
      <p>{props.Expertat || ""}</p>
    </div>
  );
}

export default UserCard;
