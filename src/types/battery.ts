export interface BatteryInfo {
  academyId: number;
  batteryLevel: number;
  employeeId: string;
  serialNumber: string;
  timestamp: Date;
}

export interface DeviceConsumption {
  consumption: Array<{
    dailyAverage: number;
    interval: number;
  }>;
  startPower: number;
  endPower: number;
  timestamp: Date;
  academyId: number;
  averageConsumption: number;
}

export interface School {
  academyId: number;
  numberOfBatteryIssues: number;
  devices: {
    serialNumber: string;
    averageConsumption: number;
    isUnhealthy: boolean;
  }[];
}
