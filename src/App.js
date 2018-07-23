import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { default as TouchBackend } from 'react-dnd-touch-backend';
// import { DragDropContext } from 'react-dnd';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'

import './App.css'
require('globalize/lib/cultures/globalize.culture.ar-AE')

localizer(globalize)


// BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

const DragAndDropCalendar = withDragAndDrop(
  BigCalendar,
  { backend: TouchBackend({ enableMouseEvents: true }) }
)
// const DragAndDropCalendar = DragDropContext(TouchBackend({ enableMouseEvents: true }))(BigCalendar)
//------------------------------------------------------------

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      events: [
        {
          id: 0,
          title: 'All Day Event very long title',
          start: new Date(),
          end: new Date(),
        },
        {
          id: 0,
          title: 'All Day Event very long title',
          start: new Date(),
          end: new Date(),
        },
        {
          id: 0,
          title: 'All Day Event very long title',
          allDay: true,
          start: new Date(),
          end: new Date(),
        },
        {
          id: 0,
          title: 'All Day Event very long title',
          allDay: true,
          start: new Date(),
          end: new Date(),
        },
        {
          id: 0,
          title: 'All Day Event very long title',
          allDay: true,
          start: new Date(moment().add(1, "days")),
          end: new Date(moment().add(1, "days"))
        }
      ],
      culture: 'en'
    };
    this.moveEvent = this.moveEvent.bind(this)
  }

  moveEvent({ event, start, end }) {
    console.log('here--');
    const { events } = this.state

    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

    console.log(`${event.title} was dropped onto ${event.start}`)
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    alert(`${event.title} was resized to ${start}-${end}`)
  }

  render() {
    let cultures = ['en', 'ar-AE']
    let rtl = this.state.culture === 'ar-AE'
    return (
      <div className="App">
        {/*<BigCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />*/}
        <h3 className="callout">
          <label>Select a Culture</label>{' '}
          <select
            className="form-control"
            style={{ width: 200, display: 'inline-block' }}
            defaultValue={'en'}
            onChange={e => this.setState({ culture: e.target.value })}
          >
            {cultures.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
        </h3>
        <div className="day-event">
          <DragAndDropCalendar
            rtl={rtl}
            events={this.state.events}
            onEventDrop={this.moveEvent}
            culture={this.state.culture}
            views={['week']}
            defaultView={BigCalendar.Views.WEEK}
            defaultDate={new Date(2018, 6, 22)}
          />
        </div>
      </div>
    );
  }
}

export default App
