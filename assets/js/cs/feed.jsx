import React from 'react';
import Job from './job';

export default function Feed(params) {
  let props = params.props;
  let jobs = _.map(params.jobs, (pp) => <Job key={pp.id} job={pp} props={props}/>);
  if(props.token) {
  return <div>
    { jobs }
  </div>;
  } else {
    return <div></div>;
  }
}
