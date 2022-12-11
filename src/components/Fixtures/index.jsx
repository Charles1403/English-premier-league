import { useContext } from 'react';
import { StateContext } from '../../App';
import {useNavigate, useParams } from "react-router-dom";

function Fixtures() { 
    const {fixtures, pendingfixtures} = useContext(StateContext)
    const navigate = useNavigate()
    const {id} = useParams()
  return (
    <>
        <button onClick={() => navigate(-1)}>Go to Table</button>
        <div className='container'>
            <h4>{id} Fixtures:</h4>
            {fixtures.map((item, index) => 
                <div key={index} className='fixtureBoard'>
                    {item['date']}
                    <div className='scoreBoard'>
                        {
                            Object.keys(item['score']).map((key, index) => 
                                <div key={index} className='scores'>
                                    <p className='club'>{key}</p>
                                    <p className='goals'>{item['score'][key]}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
        <div className='container'>
            <h4>{id}'s Fixtures still to be played:</h4>
            {pendingfixtures.map((item, index) => 
            <div key={index} className='fixtureBoard'>
                {item['date']}
                <div className='scoreBoard'>
                    {
                         Object.keys(item['score']).map((key, index) => 
                         <div key={index} className='scores'>
                             <p className='club'>{key}</p>
                             <p className='goals'>{item['score'][key]}</p>
                         </div>
                     )
                    }
                </div>
            </div>
            )}
        </div>
    </>
  )
}

export default Fixtures;

