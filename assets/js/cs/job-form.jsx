import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function JobForm(props) {
  //console.log("props@JobForm", props);

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    //console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_job(props.form);
    if(props.form.duration % 15 == 0) {
       alert("Job created");
    }
    //console.log(props.form);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  let workers = _.map(props.workers, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  //console.log("props.token->", props.token);
  if(props.token) {
  return <div style={{padding: "4ex"}}>
    <h2>New Job</h2>
    <FormGroup>
      <Label for="worker_id">Worker</Label>
      <Input type="select" name="worker_id" value={props.form.worker_id} onChange={update}>
        { workers }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="textarea" name="title" value={props.form.title} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="description">Description</Label>
      <Input type="textarea" name="description" value={props.form.description} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="duration">Duration in mins</Label>
      <Input type="number" name="duration" step="15" min="0" value={props.form.duration} onChange={update} />
    </FormGroup>
    <Button onClick={submit} color="primary">Create Job</Button> &nbsp;
    <Button onClick={clear}>Clear</Button>
  </div>;
  } else {
    return <div></div>;
  }
}

function state2props(state) {
  //console.log("rerender@JobForm", state);
  return {
    form: state.form,
    workers: state.workers,
  };
}

export default connect(state2props)(JobForm);

