import { useState } from 'react'
const Button = ({click, text}) =>(

    <button onClick={click} > 
    {text} 
    </button>

)
const Statistics = (props) =>{
    if(props.good + props.neutral + props.bad ===0){
        return(
            <div>
            <p> No feedback gathered </p>
        </div>
        )
    }
    return(
        <div>
            <StatisticLine text="good" value ={props.good} />
            <StatisticLine text="neutral" value ={props.neutral} />
            <StatisticLine text="bad" value ={props.bad} />
            <StatisticLine text="all" value = {props.good + props.neutral + props.bad} />
            <StatisticLine text="average" value ={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
            <StatisticLine text="positive" value ={(props.good) / (props.good + props.neutral + props.bad )* 100  + "%" }  />
           
        </div>
    )
    

    }
const StatisticLine = (props) => (
    
    <div>
        <p> {props.text} {props.value}</p>
    </div>
)

const App = () => {
const [clicks, setClicks] = useState({
    good:0, neutral:0, bad:0,
})

const handleGoodClick=()=>{
    const newClick ={
        ...clicks,
        good: clicks.good + 1
    }
    setClicks(newClick)
}

const handleNeutralClick=()=>{
    const newClick ={
        ...clicks,
        neutral: clicks.neutral + 1
    }
    setClicks(newClick)
}

const handleBadClick=()=>{
    const newClick ={
        ...clicks,
        bad: clicks.bad + 1
    }
    setClicks(newClick)
}
  return (
    <div>
      <h1>give feeback</h1>
       <Button click={handleGoodClick} text='good'/> 
       <Button click={handleNeutralClick} text='neutral'/> 
       <Button click={handleBadClick} text='bad'/>
       <h1>statistics</h1>
       <Statistics good= {clicks.good} neutral= {clicks.neutral} bad= {clicks.bad} />
      
    </div>
  )
}

export default App