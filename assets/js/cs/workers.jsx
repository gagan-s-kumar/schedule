import React from 'react';
import { Link } from 'react-router-dom';

function Worker(params) {
  return <p>{params.worker.name} - <Link to={"/workers/" + params.worker.id}>jobs</Link></p>;
}

export default function Workers(params) {
  let workers = _.map(params.workers, (uu) => <Worker key={uu.id} worker={uu} />);
  if(params.token) {
  return <div>
    { workers }
  </div>;
  } else {
    return <div></div>;
  }
}
