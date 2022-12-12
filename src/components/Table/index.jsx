import React, {useContext} from 'react'
import {data} from '../../data'
import {useNavigate } from "react-router-dom";
import { StateContext } from '../../App';
import { format } from 'date-fns'
import getTime from 'date-fns/getTime'

function Table({Stats}) { 
  const {setFixtures, setPendingfixtures} = useContext(StateContext)
  const navigate = useNavigate()

  const sorting = (() => {
      const sorted = [...Stats].sort((a, b) => b.Points - a.Points || b.GD - a.GD);
      Stats = sorted
  })()

  const addRank = (() => {
    let counter = 1
    Stats.map((item) => item.Pos = counter ++)
  })()


  const handleClick = (item) => {
    let Fixtures = []
    let pendingFixtures = []

    data.map((obj) => {
      if (obj.score.hasOwnProperty(item.name)){
        if (Object.values(obj.score).includes(null)) {
          obj.date = getTime(new Date(obj.date))
          pendingFixtures.push(obj)
          return null
        }
        obj.date = getTime(new Date(obj.date))
        Fixtures.push(obj)
      }
    })
    let sortFixtures = [...Fixtures].sort((a,b) => a.date - b.date)
    let sortPendingFixtures = [...pendingFixtures].sort((a, b) => a.date - b.date);
    const sFixtures = sortFixtures.map((item) => ({...item, date: format(new Date(item.date), 'dd/MM, H:mm')}))
    const pFixtures = sortPendingFixtures.map((item) => ({...item, date: format(new Date(item.date), 'dd/MM, H:mm')})) 
    setFixtures(sFixtures)
    setPendingfixtures(pFixtures)
    navigate(`/${item.name}/fixtures`)
  }

  const column = [
    {heading: 'Position', value: 'Pos'},
    {heading: 'Club', value: 'name'},
    {heading: 'Played', value: 'Played'},
    {heading: 'Win', value: 'Win'},
    {heading: 'Draw', value: 'Draw'},
    {heading: 'Lost', value: 'Lost'},
    {heading: 'GF', value: 'GF'},
    {heading: 'GA', value: 'GA'},
    {heading: 'GD', value: 'GD'},
    {heading: 'Points', value: 'Points'}
  ]
  
  return (
    <div>
        <table>
        <thead>
            <tr>
              {column.map((item, pos) => <th key={pos}>{item.heading}</th>)}
            </tr>
        </thead>
            <tbody>
              {Stats.map((item, index) => 
                <tr key={index} onClick={() => handleClick(item)} className='standings'>
                  {column.map((columnItem, index) => <td key={index}>{item[`${columnItem.value}`]}</td>)}
                </tr>
              )}
            </tbody>
        </table>
    </div>
  )
}

export default Table;
