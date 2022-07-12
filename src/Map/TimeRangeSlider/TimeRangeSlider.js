import { useState } from 'react';
import "./TimeRangeSlider.css"
import {Range, getTrackBackground} from 'react-range';
import { format } from 'date-fns'

function TimeRangeSlider(props) {

  const MIN = new Date(props.min).getTime()
  const MAX = new Date(props.max).getTime()
  const STEP = 86400000

  const [values, setValues] = useState([MIN, MAX])

  const changeValues = (dates) => {
    setValues(dates)
    props.dateRangeChanged(values)
  }

  function toDate(milli) {
    return format(new Date(milli), 'yyyy-MM-dd')
  }

  return (
    <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(dates) => changeValues(dates)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            id="range"
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#548BF4', '#ccc'],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '38px',
              width: '32px',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-28px',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px',
                borderRadius: '4px',
                backgroundColor: '#548BF4'
              }}
            >
              {toDate(values[index])}
            </div>
            <div
              style={{
                height: '14px',
                width: '5px',
                backgroundColor: isDragged ? '#548BF4' : '#CCC'
              }}
            />
          </div>
        )}
      />
  );
}

export default TimeRangeSlider;
