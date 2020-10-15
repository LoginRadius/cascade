import * as React from "react";
import CalHeatMap from 'cal-heatmap';
import axios from 'axios'
import { Dimmer, Loader, Segment, Button, Icon } from 'semantic-ui-react'

interface HeatMapProps {
   githubUrl: string;
}

// convert date string to a timestamp
function toTimestamp(strDate: string): string {
   var date = Date.parse(strDate);
   return String(date/1000);
}

const HeatMap: React.FC<HeatMapProps> = ({ ...props }) => {
   let user_name = props.githubUrl.split('/')[props.githubUrl.split('/').length-1];

   const [eventsData, setEventsData] = React.useState();
   const [loadingData, setLoadingData] = React.useState(true);


   // convert the events data, into a data that heat map can deal with
   const dataConverter = (data: any): object => {
      let counts: any = {}
      data.map((event: any): number => {
         let tstamp = toTimestamp(event.created_at)
         counts[tstamp] = (counts[tstamp] || 0)+1;
         return 0;
      });

      return counts;
   }

   // get the user events/data
   React.useEffect(() => {
      (async function(){
         if(user_name){
            const {data: events} = await axios.get(`https://api.github.com/users/${user_name}/events`);
            setEventsData(events)
            setLoadingData(false)
         }
      }())
   }, [user_name])

   // init the heat map
   React.useEffect(() => {
      var cal = new CalHeatMap();
      if(!loadingData && !!eventsData){
         cal.init({
            itemSelector: `#${user_name}`,
            domain: "day",
            data: eventsData,
            afterLoadData: dataConverter,
            cellSize: 15,
            range: 10,
            previousSelector: `#prevSelector-${user_name}`,
            nextSelector: `#nextSelector-${user_name}`,
            legend: [2, 5, 10, 15, 20],
         });
      }
   }, [eventsData, loadingData, user_name])

   // if user doesnt have a github profile, get nothin then
   if(!user_name){
      return null;
   }

  return (
     <React.Fragment>
         {
            loadingData ? 
            <Segment>
               <Dimmer active inverted>
                  <Loader size='small' />
               </Dimmer>

               <p className='text-center'> Heat map... </p>
            </Segment>
            : (
               <div className='mt-4'>
                  <Button.Group icon className='mb-2'>
                     <Button id={`prevSelector-${user_name}`}><Icon name='chevron left' /></Button>
                     <Button id={`nextSelector-${user_name}`}><Icon name='chevron right' /></Button>
                  </Button.Group>
                  <div id={`${user_name}`}></div>
               </div>
            )
         }
     </React.Fragment>
  );
};

export default HeatMap;
