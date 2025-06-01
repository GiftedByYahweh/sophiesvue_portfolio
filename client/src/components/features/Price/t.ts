export const massFlowAir = (
  density: number,
  area: number,
  velocity: number,
): number => {
  return density * area * velocity
}

export const stagnationTemp = (T: number, Ma: number, k: number): number => {
  return T * (1 + ((k - 1) / 2) * Ma ** 2)
}

export const stagnationPressure = (
  P: number,
  Ma: number,
  k: number,
): number => {
  return P * Math.pow(1 + ((k - 1) / 2) * Ma ** 2, k / (k - 1))
}

export const compressorWork = (
  U1: number,
  Vtheta1: number,
  U2: number,
  Vtheta2: number,
): number => {
  return U2 * Vtheta2 - U1 * Vtheta1
}

export const thrust = (
  massFlow: number,
  velocityExit: number,
  velocityFreeStream: number,
): number => {
  return massFlow * (velocityExit - velocityFreeStream)
}

export const combustionTemp = (afr: number): number => {
  return -0.0000012 * afr ** 2 + 0.1 * afr + 600
}

export const totalEfficiency = (
  isentropicDeltaT: number,
  actualDeltaT: number,
): number => {
  return isentropicDeltaT / actualDeltaT
}
