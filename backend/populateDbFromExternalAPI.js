const rp = require('request-promise');
const STB_API = "https://info.stbsa.ro/rp/api"
const sequelize = require('./sequelize');
const { Line } = require('./models/line.js');
const Stop = require('./models/stop.js');
const LineStop = require('./models/linestop.js');
require('./relations')

export async function populateDbFromExternalAPI() {
    await sequelize.authenticate();
    rp(STB_API + "/lines")
        .then(async data => {
            // Parse the JSON data
            const parsedData = JSON.parse(data);
            const apiLines = parsedData['lines']


            for (let i = 0; i < apiLines.length; i++) {
                const apiLine = apiLines[i]
                //Fetch stations first of this line
                rp(STB_API + `/lines/${apiLine.id}`)
                    .then(async data => {
                        const parsedData = JSON.parse(data);
                        const apiStops = parsedData['stops'];

                        const dbFirstStop = await Stop.create({ name: parsedData['direction_name_tur'] })
                        const dbLastStop = await Stop.create({ name: parsedData['direction_name_retur'] })
                        const dbLine = await Line.create({
                            name: apiLine.name,
                            vehicleType: apiLine.type.toLowerCase(),
                            startStopId: dbFirstStop.id,
                            endStopId: dbLastStop.id
                        })

                        for (let i = 0; i < apiStops.length - 1; i++) {
                            const stop = apiStops[i];
                            let dbStop = await Stop.findOne({ where: { name: stop.name } });
                            if (dbStop == null)
                                dbStop = await Stop.create({ name: stop.name })

                            await sleep(1000);
                            try {
                                const lineStop = await LineStop.create({ lineId: dbLine.id, stopId: dbStop.id, orderIndex: i })
                                console.log(lineStop)
                            }
                            catch (err) {
                                console.log(err)
                            }

                        }

                    })
            }
        })
        .catch(error => {
            console.log(error);
        });
}