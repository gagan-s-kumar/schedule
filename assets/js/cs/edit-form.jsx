import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function EditForm(params) {

  //console.log("Entered EDITFORM");
  //console.log(params.job[0]);
  let props = params.props;
  let job = params.job[0];
  //props.form.title = job.title;
  //props.form.description = job.description;
  //props.form.duration = job.duration;
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

  function edit(ev) {
    api.edit_job(props.form, job.id);
    //console.log("Callin edit");
    //console.log(props.form);
    api.request_jobs();
  }

  function close(ev) {
    let data = {
                  worker_id: job.worker_id,
                  description: job.description,
                  title: job.title,
                  duration: job.duration,
                  completed: true
               };
    api.edit_job(data, job.id);
    //console.log("Callin close");
    //console.log(props.form);
    api.request_jobs();
  }

  function open(ev) {
    let data = {
                  worker_id: job.worker_id,
                  description: job.description,
                  title: job.title,
                  duration: job.duration,
                  completed: false
               };
    api.edit_job(data, job.id);
    //console.log("Callin open");
    //console.log(props.form);
    api.request_jobs();
  }

  function job_delete(ev) {
    api.delete_job(job.id);
    //console.log("Callin edit");
    api.request_jobs();
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }
  let workers = _.map(props.workers, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);

  return <div style={{padding: "4ex"}}>
    <h2>Job Details</h2>
    <FormGroup>
      <Label for="worker_id">New Worker</Label>
      <Input type="select" name="worker_id" value={props.form.worker_id} onChange={update}>
        { workers }
      </Input>
      <div className="old"> Current Assignee: { job.worker.name }</div>
    </FormGroup>
    <FormGroup>
      <Label for="title">New Title</Label>
      <Input type="textarea" name="title" value={props.form.title} onChange={update} />
      <div className="old"> Current Title: { job.title }</div>
    </FormGroup>
    <FormGroup>
      <Label for="description">New Description</Label>
      <Input type="textarea" name="description" value={props.form.description} onChange={update} />
      <div className="old"> Current Description: { job.description }</div>
    </FormGroup>
    <FormGroup>
      <Label for="duration">New Duration</Label>
      <Input type="number" name="duration" value={props.form.duration} onChange={update} />
      <div className="old"> Current Duration: { job.duration }</div>
    </FormGroup>
    <Button onClick={close} color="primary">Close Without Edit</Button> &nbsp;
    <Button onClick={open} color="primary">Open Without Edit</Button> &nbsp;
    <Button onClick={edit} color="primary">Edit Task</Button> &nbsp;
    <Button onClick={clear}>Clear</Button>
  </div>;
}

function state2props(state) {
  //console.log("rerender@EditForm", state);
  return {
    form: state.form,
    jobs: state.jobs,
  };
}

export default connect(state2props)(EditForm);

