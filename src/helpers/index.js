import { data } from "../data";

export const getListOfClubs = (() => {
    let set = new Set()
    data.map((item) => Object.keys(item.score).map((item) => set.add(item)))
    return [...set];
  })()
  
  export const getWinners = (() => {
    let map1 = new Map()
    let arrOfMap1 = []
    let arrOfWinners = []
    data.map((item) => map1.set(...Object.entries(item.score)))
    arrOfMap1.push([...map1])
    let result = arrOfMap1.map((item) => item.map((i) => i.reduce((a, e) => {
          if (e[1] > a[1]) return e
          if (e[1] < a[1]) return a
          if (e[1] === a[1]) return null
    })))
    let winners = result.map((item) => item.filter((i) => {
      return i !== null
    }))
    winners.map((item) => item.map((i) => arrOfWinners.push(i[0])))
    return arrOfWinners ?? []
  })()
  
  export const getLosers = (() => {
    let map2 = new Map()
    let arrOfMap2 = []
    let arrOfLosers = []
      data.map((item) => map2.set(...Object.entries(item.score)))
      arrOfMap2.push([...map2])
      let result = arrOfMap2.map((item) => item.map((i) => i.reduce((a, e) => {
        if (e[1] < a[1]) return e
        if (e[1] > a[1]) return a
        if (e[1] === a[1]) return null
      })))
      let loosers = result.map((item) => item.filter((i) => {
        return i !== null
      }))
      loosers.map((item) => item.map((i) => arrOfLosers.push(i[0])))
      return arrOfLosers ?? []
  })()
  
  export const getDraws = (() => {
    let map3 = new Map()
    let arrOfMap3 = []
    let arr = []
    let set = new Set()
    let arrOfDraws = []
      data.map((item) => map3.set(...Object.entries(item.score)))
      arrOfMap3 = [...map3]
      arrOfMap3.map((item) => item.map((i) => {
        if (i[1] === null) return null
        set.add(item)
      }))
      set.forEach((s) => arr.push(s))
      let result = arr.map((item) => item.reduce((a, e) => {
        if (e[1] === a[1]) return [e, a]
      }))
      let draws = result.filter((item) => item !== undefined)
      draws.map((item) => item.map((i) => arrOfDraws.push(i[0])))
      return arrOfDraws ?? []
  })()
  
  export const getGoalsFor = (() => {
  let map4 = new Map()
  let arrOfMap4 = []
  let emptyArr = []
    data.map((item) => map4.set(...Object.entries(item.score)))
    arrOfMap4.push([...map4])
    arrOfMap4.map((arr) => arr.map((item) => item.map((i) => emptyArr.push(i))))
    let Obj = emptyArr.map((item) => item.reduce((a, v) => {
      return {name: a, goalsFor: v}
    }))
    let grouped = Obj.reduce((groupedTeams, team) => {
      const name = team.name
      if (!groupedTeams[name]) groupedTeams[name] = []
      groupedTeams[name].push(team.goalsFor)
      return groupedTeams
    }, {})
    let stats = Object.entries(grouped).map((item) => {
      return {
        name: item[0],
        goalsFor: item[1].reduce((total, number) => total + number, 0)
      }
    })
    return stats ?? []
  })()
  

  export const getGoalsAgainst = (() => {
  let map5 = new Map()
  let emptyArr = []
  data.map((item) => map5.set(...Object.entries(item.score)))
  let arrOfMap5 = [...map5]
  let result = arrOfMap5.map((arr) =>  arr.reduce((a, e) => {
    return [
      {name: a[0], goalAgainst: e[1]},
      {name: e[0], goalAgainst: a[1]},
    ]
  }))
  result.map((item) => item.map((Obj) => emptyArr.push(Obj)))
  let grouped = emptyArr.reduce((groupedTeams, team) => {
    const name = team.name
    if (!groupedTeams[name]) groupedTeams[name] = []
    groupedTeams[name].push(team.goalAgainst)
    return groupedTeams
  }, {})
  let stats = Object.entries(grouped).map((item) => {
    return {
      name: item[0],
      goalsAgainst: item[1].reduce((total, number) => total + number, 0)
    }
  })
  return stats ?? []
  })()
  
  export const getStats = (() => {
  let winStats = []
  let drawStats = []
  let lossStats = []
    getListOfClubs.map((club) => {
      let countWin = 0
      let countDraw = 0
      let countLoss = 0
      if (getWinners.includes(club) !== -1){
        getWinners.map((winner) => {
          if (winner === club) countWin++
        })
        winStats.push({name: club, win: countWin})
      if (getDraws.includes(club) !== -1){
        getDraws.map((draw) => {
          if (draw === club) countDraw++
        })
        drawStats.push({name: club, draw: countDraw})
      }
      if (getLosers.includes(club) !== -1){
        getLosers.map((loser) => {
          if (loser === club) countLoss++
        })
        lossStats.push({name: club, loss: countLoss})
      }
      }
    })
    return [winStats, drawStats, lossStats]
  })()
  
  export const getAllIndividualTeamStats = (() => {
    let listofwinners = getStats[0]
    let listofdraws = getStats[1]
    let listofllosers = getStats[2]
    let arr = []
    getListOfClubs.map((club) => { 
      let win;
      let draw; 
      let loss; 
      let gf; 
      let ga;
    listofwinners.map((item) => item['name'] === club ? win = item['win'] : null)
    listofdraws.map((item) => item['name'] === club ? draw = item['draw'] : null)
    listofllosers.map((item) => item['name'] === club ? loss = item['loss'] : null)
    getGoalsAgainst.map((item) => item['name'] === club ? ga = item['goalsAgainst'] : null)
    getGoalsFor.map((item) => item['name'] === club ? gf = item['goalsFor'] : null)
    arr.push({
      Played: win + draw + loss,
      name: club,
      Win: win, 
      Draw: draw, 
      Lost: loss,
      GF: gf,
      GA: ga,
      GD: gf - ga,
      Points: win * 3 + draw * 1 - loss * 3
    })
    })
    return arr;
  })()
  