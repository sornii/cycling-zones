export type PowerTrainingZone =
  | 'recovery'
  | 'endurance'
  | 'tempo'
  | 'threshold'
  | 'vo2max'
  | 'anaerobic'
  | 'sprint';

export type PowerTrainingZoneType = {
  zone: number;
  code: PowerTrainingZone;
  name: string;
  short: string;
  // Maximum percentage of FTP
  max: number;
};

export type IndividualPowerTrainingZoneType = {
  zone: number;
  code: PowerTrainingZone;
  name: string;
  short: string;
  // Maximum watts
  max: number;
};

export type HeartRateTrainingZoneType = {};

export const COGGAN_POWER_TRAINING_ZONES_DEFINITION: Record<
  PowerTrainingZone,
  PowerTrainingZoneType
> = {
  recovery: {
    zone: 1,
    code: 'recovery',
    name: 'Activity Recovery',
    short: 'Z1',
    max: 0.55,
  },
  endurance: {
    zone: 2,
    code: 'endurance',
    name: 'Aerobic Endurance',
    short: 'Z2',
    max: 0.75,
  },
  tempo: {
    zone: 3,
    code: 'tempo',
    name: 'Tempo',
    short: 'Z3',
    max: 0.9,
  },
  threshold: {
    zone: 4,
    code: 'threshold',
    name: 'Lactate Threshold',
    short: 'Z4',
    max: 1.05,
  },
  vo2max: {
    zone: 5,
    code: 'vo2max',
    name: 'VO₂ max',
    short: 'Z5',
    max: 1.2,
  },
  anaerobic: {
    zone: 6,
    code: 'anaerobic',
    name: 'Anaerobic Capacity',
    short: 'Z6',
    max: 1.5,
  },
  sprint: {
    zone: 7,
    code: 'sprint',
    name: 'Sprint Power',
    short: 'Z7',
    max: Infinity,
  },
};

export const createIndividualPowerTrainingZones = (
  functionalThresholdPower: number,
  powerZonesDefinition: Record<
    PowerTrainingZone,
    PowerTrainingZoneType
  > = COGGAN_POWER_TRAINING_ZONES_DEFINITION
): Record<PowerTrainingZone, IndividualPowerTrainingZoneType> => {
  const individualPowerTrainingZones: Record<
    PowerTrainingZone,
    IndividualPowerTrainingZoneType
  > = {} as Record<PowerTrainingZone, IndividualPowerTrainingZoneType>;

  Object.keys(powerZonesDefinition).forEach((powerZoneKey) => {
    const powerZone = powerZonesDefinition[powerZoneKey as PowerTrainingZone];

    if (!powerZone.max) {
      return;
    }

    individualPowerTrainingZones[powerZoneKey as PowerTrainingZone] = {
      ...powerZone,
      max: Math.round(functionalThresholdPower * powerZone.max),
    };
  });

  return individualPowerTrainingZones;
};
