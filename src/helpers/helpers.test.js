import { getListOfClubs, getWinners, getLosers, getDraws, getGoalsFor, getGoalsAgainst, getStats, getAllIndividualTeamStats} from ".";

describe('Helper Functions', () => {
    it('should get a list of clubs', () => {
        expect(getListOfClubs).toEqual(expect.arrayContaining([expect.any(String)]))
    })
    it('should get a list of winners', () => {
        expect(getWinners).toEqual(expect.arrayContaining([expect.any(String)]))
    })
    it('should get a list of losers', () => {
        expect(getLosers).toEqual(expect.arrayContaining([expect.any(String)]))
    })
    it('should get a list of teams that draw', () => {
        expect(getDraws).toEqual(expect.arrayContaining([expect.any(String)]))
    })
    it('should get a list of teams and no of goals they scored', () => {
        expect(getGoalsFor).toEqual(expect.arrayContaining([expect.any(Object)]))
    })
    it('should get a list of teams and no of goals scored against them', () => {
        expect(getGoalsAgainst).toEqual(expect.arrayContaining([expect.any(Object)]))
    })
    it('should contain a list of win, draw, and loss statistics', () => {
        expect(getStats[0]).toEqual(expect.arrayContaining([expect.any(Object)]))
        expect(getStats[1]).toEqual(expect.arrayContaining([expect.any(Object)]))
        expect(getStats[2]).toEqual(expect.arrayContaining([expect.any(Object)]))
    })
    it('should get a list of teams and their overall statistics', () => {
        expect(getAllIndividualTeamStats).toEqual(expect.arrayContaining([expect.any(Object)]))
    })
})