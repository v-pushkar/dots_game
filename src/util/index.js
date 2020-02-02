
export const createRandomNum = (max)=>Math.floor(Math.random()*Math.floor(max))

export const   selectRumdomCell = (size)=>{
    const x = createRandomNum(size)
    const y = createRandomNum(size)
    return {y,x}
}