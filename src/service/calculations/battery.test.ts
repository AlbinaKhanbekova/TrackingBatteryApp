import { calculateBatteryConsumption } from './battery';
import { BatteryInfo } from '../../types/battery';

describe('Battery level calulations', () => {
  test('Check consumption on first time interval', () => {
    const data = [
      {
        academyId: 30006,
        batteryLevel: 1,
        employeeId: 'T1007384',
        serialNumber: '1805C67HD02259',
        timestamp: '2019-05-17T09:00:00',
      },
      {
        academyId: 30006,
        batteryLevel: 0.9,
        employeeId: 'T1007384',
        serialNumber: '1805C67HD02259',
        timestamp: '2019-05-17T21:00:00',
      },
      {
        academyId: 30006,
        batteryLevel: 0.8,
        employeeId: 'T1007384',
        serialNumber: '1805C67HD02259',
        timestamp: '2019-05-18T21:00:00',
      },
      {
        academyId: 30006,
        batteryLevel: 1,
        employeeId: 'T1007384',
        serialNumber: '1805C67HD02259',
        timestamp: '2019-05-18T22:00:00',
      },
    ] as unknown as BatteryInfo[];
    const devices = calculateBatteryConsumption(data as unknown as BatteryInfo[]);

    expect(devices['1805C67HD02259'].consumption[0].dailyAverage).toEqual(0.13);
  });

  test('Calculate average for several intervals', () => {
    const data = [
      {
        academyId: 30006,
        batteryLevel: 1,
        employeeId: 'T1007384',
        serialNumber: '1805C67HD02259',
        timestamp: '2019-05-17T09:00:00',
      },
      {
        academyId: 30006,
        batteryLevel: 0.9,
        employeeId: 'T1007384',
        serialNumber: '1805C67HD02259',
        timestamp: '2019-05-17T21:00:00',
      },
      {
        academyId: 30006,
        batteryLevel: 0.8,
        employeeId: 'T1007384',
        serialNumber: '1805C67HD02259',
        timestamp: '2019-05-18T21:00:00',
      },
      {
        academyId: 30006,
        batteryLevel: 1,
        employeeId: 'T1007384',
        serialNumber: '1805C67HD02259',
        timestamp: '2019-05-18T22:00:00',
      },
      {
        academyId: 30006,
        batteryLevel: 0.6,
        employeeId: 'T1007384',
        serialNumber: '1805C67HD02259',
        timestamp: '2019-05-19T03:00:00',
      },
      {
        academyId: 30006,
        batteryLevel: 0.4,
        employeeId: 'T1007384',
        serialNumber: '1805C67HD02259',
        timestamp: '2019-05-19T22:00:00',
      },
    ] as unknown as BatteryInfo[];
    const devices = calculateBatteryConsumption(data as unknown as BatteryInfo[]);
    // consumption should be: [{ total: 0.13, interval: 36 }, { total: 0.6, interval: 24 }]
    // avarage consumption: (0.13*36 + 0.6*24) / (36 + 24) = 0.32

    expect(devices['1805C67HD02259'].consumption[1].dailyAverage).toEqual(0.6);

    expect(devices['1805C67HD02259'].averageConsumption).toEqual(0.32);
  });
});
