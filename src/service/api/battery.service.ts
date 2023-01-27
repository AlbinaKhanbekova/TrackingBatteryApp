import { BatteryInfo } from '../../types/battery';
import { ResponseError } from '../../types/error';

const BASE_URL = process.env.REACT_APP_API_URL || 'battery-data.json';

/**
 * Get battery data
 * @returns Battery details
 */
export const getBatteryData = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data: BatteryInfo[] = await response.json();

    return { data };
  } catch (error: unknown) {
    const { message, status } = error as ResponseError;
    return { error: { message: message || 'unknown error', status: status || 500 } };
  }
};
