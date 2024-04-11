import React, { useState, useEffect } from 'react';
import start from './img/start.png';
import pause from './img/pause.png';
import restart from './img/restart.png';
import './App.css';

function Cronometro() {
    const [tempo, setTempo] = useState(0)
    const [isRodando, setIsRodando] = useState(false)

    useEffect(() => {
        let intervalo;

        if(isRodando) {
            intervalo = setInterval(() => {
                setTempo(tempo => tempo + 1); // atualiza o cronômetro de 1s
            }, 10); // atualizaa cada 10 milisegundos
        } else {
            clearInterval(intervalo)
        }

        return () => clearInterval(intervalo);
    }, [isRodando]) //dependencia do useEffect,
    // ele irá executar caso o "IsRodando" mude de valor

    const formatarTempo = (tempo) => {
        const horas = Math.floor(tempo / 360000 );
        // quantidade de segundos em uma hora
        // floor arredonda para baixo

        const minutos = Math.floor((tempo % 360000) / 6000);
        const segundos = Math.floor((tempo % 6000) / 100);
        const milisegundos = tempo % 100;


        return `
        ${horas.toString().padStart(2, '0')}:
        ${minutos.toString().padStart(2, '0')}:
        ${segundos.toString().padStart(2, '0')}:
        ${milisegundos.toString().padStart(2, '0')}
        `
    }

        //padStart preenche "2" as casas à esquerda com "0" caso não tenha nenhum valor ali.

        const handleComecar = () => {
            setIsRodando(true)
            /* quando eu chamar a função "handleComecar",
            vai trocar o booleano do setIsRodadando para false */
        }

        const handlePausar = () => {
            setIsRodando(false)
            /* quando eu chamar a função "handlePausar",
            vai trocar o booleano do setIsRodadando para false */
        }

        const handleReiniciar = () => {
            setIsRodando(false)
            setTempo(0)
            /* quando eu chamar a função "handleReiniciar",
            vai trocar o booleano do setIsRodadando para false */
        }

        return(
            <div className='cronometro-container'>
              <h1>Cronometro</h1>
              <p className='tempo'>{formatarTempo(tempo)}</p>
        
              <div className='botoes-container'>
        
                <button onClick={handleComecar}>
                  <img src={start} alt='botão de start' className='start'></img>
                </button>
                <button onClick={handlePausar}>
                 <img src={pause} alt='botão de pause' className='pause'></img>
                </button>
                <button onClick={handleReiniciar}>
                 <img src={restart} alt='botão de restart' className='restart'></img>
                </button>
        
              </div>
            </div>
        )	
   
}

export default Cronometro;