import React from "react";
import "./index.css";
import logo from "../../logo.png";

export default function Pomodoro() {

    const [timer,setTimer] = React.useState("00:00.0")
    const [minutoIntervalo,setMinutoIntervalo] = React.useState(5)
    const [minutoAtividade,setMinutoAtividade] = React.useState(30)

    const [minutoCronometro,setMinutoCronometro] = React.useState(0)
    const [segundosCronometro,setSegCronometro] = React.useState(0)
    const [statusPomodoro,setStatusPomodoro] = React.useState('')


    const [active,setActive] = React.useState(false)

    function toggle(){
      setActive(!active)
    }

    React.useEffect(() => {
      let interval = null
      if(active){
        interval = setInterval(()=>{
          setSegCronometro(segundosCronometro => (segundosCronometro+1))
        },1000);
      }else if(!active && segundosCronometro!==0){
        clearInterval(interval)
      }


      if(segundosCronometro>=60.0){
        setMinutoCronometro(minutoCronometro => minutoCronometro+1)
        setSegCronometro(0)
      }
      setTimer(formatData(minutoCronometro)+":"+formatData(segundosCronometro))
      

      if(Number.parseInt(minutoCronometro)==Number.parseInt(minutoAtividade)){
        alert('Pomodoro Encerrado !!')
        setStatusPomodoro(`Espero por ${minutoIntervalo} Minutos para iniciar Novo Pomodoro !`)
        setMinutoCronometro(0)
        setActive(false)
        return clearInterval(interval)
      }
      
      return () => clearInterval(interval);
      
    }, [segundosCronometro,active])

    function formatData(value){
      if(Number.parseInt(value)<10){
        return "0"+Number.parseInt(value)
      }
      return value;
    }



  return (
    <div>
      <div className="header">
        <img className="logo" src={logo}></img>
        <h1>Pomodoro</h1>
      </div>
      <div className="timer center-div">
        <h1>{timer}</h1>
      </div>
      <div className="body center-div">
        <div className="container">
          <div>
            <h3 className="inforPomodoro">... {statusPomodoro}...</h3>
          </div>
          <div className="row">
            <h2>Tempo de Atividade: </h2>
            <input value={minutoAtividade} onChange={({target})=>{setMinutoAtividade(target.value)}}></input>
            <h2>Minutos</h2>
          </div>
          <br></br>
          <div className="row">
            <h2>Tempo de Descanso: </h2>
            <input value={minutoIntervalo} onChange={({target})=>{setMinutoIntervalo(target.value)}} ></input>
            <h2>Minutos</h2>
          </div>
          <button className="bred" onClick={toggle}>{active?'Pausar':'Iniciar'}</button>
        </div>
      </div>
    </div>
  );
}
