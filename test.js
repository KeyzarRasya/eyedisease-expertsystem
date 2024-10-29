const {cfExpert} = require('./system/certainty')

const data = [
    ["K01", 0.6],
    ["K02", 0.8],
    ["K03", 0.2],
    ["K04", 1],
    ["G01", 1],
    ["G02", 0.2],
    ["G03", 0],
    ['G04', 0],
    ['G05', 0.2],
    ['M01', -0.2],
    ['M02', 0],
    ['M03', 0.5],
    ['N01', 1],
    ['N02', 1],
    ['N03', 1],
    ['R01', 1],
    ['R02', 1],
    ['R03', 1]
]

function findCfHE(dataUser, cfExpert) {
    let allCF = [];

    for (const disease of cfExpert) {
        let cfPerDisease = [];
        for (const [expertKey, expertValue] of disease.cf) {
            const userEntry = dataUser.find(([key]) => key === expertKey);
            const userValue = userEntry ? userEntry[1] : 0; 

            const cfResult = expertValue * userValue;
            cfPerDisease.push(cfResult);

            console.log(
                `${expertKey} Data Expert = ${expertValue}, User Data = ${userValue}`
            );
        }

        console.log(`Disease: ${disease.nama}`);
        console.log("==============");

        allCF.push(cfPerDisease);
    }

    console.log("All CF:", allCF);
    return allCF;
}

function calculatePosibility(cfHE) {
    const cfCombine = [];

    for (let i = 0; i < cfHE.length; i++) {
        let eachCF = cfHE[i];
        let cfOld = 0;
        for (let j = 0; j < eachCF.length; j += 2) {
            let firstValue = cfOld === 0 ? (eachCF[j] || 0) : cfOld;    
            let secondValue = eachCF[j + 1] || 0; 
            let thirdvalue = 1-firstValue;
            cfOld = firstValue + (secondValue * thirdvalue)
        }
        cfCombine.push(cfOld);
    }

    console.log(cfCombine);
    return cfCombine;
}

function findHighest(data) {
    let highest = data[0];
    let index = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] > highest) {
            highest = data[i];
            index = i
        }
    }
    return {highest, index};
}

function conclusion(data, index, expert){
    let percent = data * 100
    const penyakit = expert[index].nama
    return {penyakit, percent:percent}
}

module.exports = {
    findCfHE,
    calculatePosibility,
    findHighest,
    conclusion
}