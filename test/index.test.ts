import {
  COGGAN_POWER_TRAINING_ZONES_DEFINITION,
  createIndividualPowerTrainingZones,
} from '../src';

test('createIndividualPowerTrainingZones', () => {
  const powerZones = createIndividualPowerTrainingZones(
    242,
    COGGAN_POWER_TRAINING_ZONES_DEFINITION
  );

  expect(powerZones.recovery.max).toBe(133);
  expect(powerZones.endurance.max).toBe(182);
  expect(powerZones.tempo.max).toBe(218);
  expect(powerZones.threshold.max).toBe(254);
  expect(powerZones.vo2max.max).toBe(290);
  expect(powerZones.anaerobic.max).toBe(363);
  expect(powerZones.sprint.max).toBe(Infinity);
});
