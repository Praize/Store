import React from 'react'
import styled from 'styled-components';


const Suggestions = (props) => {
  const options = props.results.map(r => (

    <div class="suggestion"key={r.id}>
        {r.name}
    </div>
  ))
  return <ul>{options}</ul>
}


export default Suggestions