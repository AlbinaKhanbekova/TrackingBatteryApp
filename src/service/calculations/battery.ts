import { BatteryInfo, DeviceConsumption, School } from '../../types/battery';

const round = (num: number) => parseFloat(num.toFixed(2)) || 0;
const getLastElement = <T>(arr: T[]) => arr[arr.length - 1];

export function calculateBatteryConsumption(data: BatteryInfo[]) {
  const deviceConsumption: Record<string, DeviceConsumption> = {};

  for (let record of data) {
    const serialNumber = record.serialNumber;

    if (!deviceConsumption[serialNumber]) {
      deviceConsumption[serialNumber] = {
        consumption: [{ dailyAverage: 0, interval: 0 }],
        startPower: record.batteryLevel,
        endPower: record.batteryLevel,
        timestamp: record.timestamp,
        academyId: record.academyId,
        averageConsumption: 0,
      };
    } else {
      if (record.batteryLevel <= deviceConsumption[serialNumber].endPower) {
        deviceConsumption[serialNumber].endPower = record.batteryLevel;
      } else {
        const lastElement = getLastElement(deviceConsumption[serialNumber].consumption);
        if (lastElement.dailyAverage !== 0) {
          deviceConsumption[serialNumber].consumption.push({ dailyAverage: 0, interval: 0 });
        }
        deviceConsumption[serialNumber].startPower = record.batteryLevel;
        deviceConsumption[serialNumber].endPower = record.batteryLevel;
        deviceConsumption[serialNumber].timestamp = record.timestamp;
      }

      const difference = round(deviceConsumption[serialNumber].startPower - record.batteryLevel);

      const durationinHours = round(
        (new Date(record.timestamp).valueOf() - new Date(deviceConsumption[serialNumber].timestamp).valueOf()) /
          1000 /
          60 /
          60,
      );

      const dailyAverage = round(difference * (24 / durationinHours));

      deviceConsumption[serialNumber].consumption[deviceConsumption[serialNumber].consumption.length - 1] = {
        dailyAverage,
        interval: durationinHours,
      };
    }
  }

  for (let serialNumber in deviceConsumption) {
    // remove empty data
    const consumption = deviceConsumption[serialNumber].consumption.filter((value) => value.dailyAverage !== 0);
    let totalDuration = 0;

    // calculate average consumption with duration proportions
    const totalConsumption = consumption.reduce((prev, curr) => {
      totalDuration += curr.interval;
      return prev + curr.dailyAverage * curr.interval;
    }, 0);

    deviceConsumption[serialNumber].averageConsumption = round(totalConsumption / (totalDuration || 1));
  }

  return deviceConsumption;
}

export const getSchoolsWithUnhealthyDevices = (data: BatteryInfo[]) => {
  const devices = calculateBatteryConsumption(data);
  const schools: Record<string, School> = {};

  for (let serialNumber in devices) {
    const isUnhealthyDevice = devices[serialNumber].averageConsumption > 0.3;

    if (!schools[devices[serialNumber].academyId]) {
      schools[devices[serialNumber].academyId] = {
        academyId: devices[serialNumber].academyId,
        devices: [
          {
            serialNumber,
            averageConsumption: devices[serialNumber].averageConsumption,
            isUnhealthy: isUnhealthyDevice,
          },
        ],
        numberOfBatteryIssues: isUnhealthyDevice ? 1 : 0,
      };
    } else {
      schools[devices[serialNumber].academyId].devices.push({
        serialNumber,
        averageConsumption: devices[serialNumber].averageConsumption,
        isUnhealthy: isUnhealthyDevice,
      });
      schools[devices[serialNumber].academyId].numberOfBatteryIssues += isUnhealthyDevice ? 1 : 0;
    }

    // sort devices by average consumption
    schools[devices[serialNumber].academyId].devices.sort((a, b) => b.averageConsumption - a.averageConsumption);
  }

  // sort school by number of unhealthy batteries
  const sortedSchools = Object.values(schools).sort((a, b) => b.numberOfBatteryIssues - a.numberOfBatteryIssues);

  return sortedSchools;
};
