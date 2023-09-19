import { MathUtils } from 'three'

const rotation = [
  [MathUtils.degToRad(100), MathUtils.degToRad(0), MathUtils.degToRad(20)],
  [MathUtils.degToRad(100), MathUtils.degToRad(-15), MathUtils.degToRad(-90)],
  [MathUtils.degToRad(100), MathUtils.degToRad(-15), MathUtils.degToRad(-90)],
  [MathUtils.degToRad(85), MathUtils.degToRad(0), MathUtils.degToRad(-175)],
  [MathUtils.degToRad(85), MathUtils.degToRad(0), MathUtils.degToRad(-175)],
  [MathUtils.degToRad(85), MathUtils.degToRad(0), MathUtils.degToRad(-360)],
  [MathUtils.degToRad(85), MathUtils.degToRad(0), MathUtils.degToRad(-360)],
  [MathUtils.degToRad(100), MathUtils.degToRad(15), MathUtils.degToRad(-360)],
  [MathUtils.degToRad(0), MathUtils.degToRad(60), MathUtils.degToRad(-360)],
  [MathUtils.degToRad(0), MathUtils.degToRad(60), MathUtils.degToRad(-360)],
  [MathUtils.degToRad(-10), MathUtils.degToRad(60), MathUtils.degToRad(-350)],
]

export const mobileSteps = [
  {
    position: [-0.25, 0, 0],
    scale: 0.03,
    rotation: rotation[0],
    type: 1,
  },
  {
    position: [0, -0.15, 0],
    scale: 0.03,
    rotation: rotation[1],
    type: 1,
  },
  {
    position: [0, -0.15, 0],
    scale: 0.03,
    rotation: rotation[2],
    type: 1,
  },
  {
    position: [0, 0, 0],
    scale: 0.03,
    rotation: rotation[3],
    type: 1,
  },
  {
    position: [0, 0, 0],
    scale: 0.03,
    rotation: rotation[4],
    type: 1,
  },
  {
    position: [0.5, 0, 0],
    scale: 0.03,
    rotation: rotation[5],
    type: 1,
  },
  {
    position: [0.3, 0, 0],
    scale: 0.03,
    rotation: rotation[6],
    type: 1,
  },
  {
    position: [-0.08, -0.2, 0],
    scale: 0.03,
    rotation: rotation[7],
    type: 1,
  },
  {
    scale: 0.03,
    position: [-0.08, -0.2, 0],
    rotation: rotation[8],
    type: 1,
  },
  {
    scale: 0.03,
    position: [0.05, 0, 0],
    rotation: rotation[9],
    type: 1,
  },
  {
    scale: 0.03,
    position: [0.05, 0, 0],
    rotation: rotation[10],
    type: 1,
  },
]

export const largeMobileSteps = [
  {
    position: [-0.35, 0, 0],
    scale: 0.03,
    rotation: rotation[0],
    type: 1,
  },
  {
    position: [0, -0.15, 0],
    scale: 0.03,
    rotation: rotation[1],
    type: 1,
  },
  {
    position: [0, -0.15, 0],
    scale: 0.03,
    rotation: rotation[2],
    type: 1,
  },
  {
    position: [0, 0, 0],
    scale: 0.03,
    rotation: rotation[3],
    type: 1,
  },
  {
    position: [0, 0, 0],
    scale: 0.03,
    rotation: rotation[4],
    type: 1,
  },
  {
    position: [0.5, 0, 0],
    scale: 0.03,
    rotation: rotation[5],
    type: 1,
  },
  {
    position: [0.3, 0, 0],
    scale: 0.03,
    rotation: rotation[6],
    type: 1,
  },
  {
    position: [-0.05, -0.2, 0],
    scale: 0.03,
    rotation: rotation[7],
    type: 1,
  },
  {
    scale: 0.03,
    position: [-0.05, -0.2, 0],
    rotation: rotation[8],
    type: 1,
  },
  {
    scale: 0.03,
    position: [0.05, -0.3, 0],
    rotation: rotation[9],
    type: 1,
  },
  {
    scale: 0.03,
    position: [0.05, -0.3, 0],
    rotation: rotation[10],
    type: 1,
  },
]

export const tabletSteps = [
  {
    position: [-0.35, 0, 0],
    scale: 0.03,
    rotation: rotation[0],
    type: 1,
  },
  {
    position: [0, -0.15, 0],
    scale: 0.03,
    rotation: rotation[1],
    type: 1,
  },
  {
    position: [0, -0.15, 0],
    scale: 0.03,
    rotation: rotation[2],
    type: 1,
  },
  {
    position: [0, 0, 0],
    scale: 0.03,
    rotation: rotation[3],
    type: 1,
  },
  {
    position: [0, 0, 0],
    scale: 0.03,
    rotation: rotation[4],
    type: 1,
  },
  {
    position: [0.5, 0, 0],
    scale: 0.03,
    rotation: rotation[5],
    type: 1,
  },
  {
    position: [0.3, 0, 0],
    scale: 0.03,
    rotation: rotation[6],
    type: 1,
  },
  {
    position: [-0.12, -0.2, 0],
    scale: 0.03,
    rotation: rotation[7],
    type: 1,
  },
  {
    scale: 0.03,
    position: [-0.12, -0.2, 0],
    rotation: rotation[8],
    type: 1,
  },
  {
    scale: 0.03,
    position: [0.05, -0.3, 0],
    rotation: rotation[9],
    type: 1,
  },
  {
    scale: 0.03,
    position: [0.05, -0.3, 0],
    rotation: rotation[10],
    type: 1,
  },
]

export const desktopSteps = [
  {
    position: [0, 0, 0],
    scale: 0.02,
    rotation: rotation[0],
    type: 1,
  },
  {
    position: [0, -0.15, 0],
    scale: 0.018,
    rotation: rotation[1],
    type: 1,
  },
  {
    position: [0, -0.15, 0],
    scale: 0.018,
    rotation: rotation[2],
    type: 1,
  },
  {
    position: [0, 0, 0],
    scale: 0.02,
    rotation: rotation[3],
    type: 1,
  },
  {
    position: [0, 0, 0],
    scale: 0.02,
    rotation: rotation[4],
    type: 1,
  },
  {
    position: [0, 0, 0],
    scale: 0.02,
    rotation: rotation[5],
    type: 1,
  },
  {
    position: [0, 0, 0],
    scale: 0.02,
    rotation: rotation[6],
    type: 1,
  },
  {
    position: [0, 0, 0],
    scale: 0.02,
    rotation: rotation[7],
    type: 1,
  },
  {
    scale: 0.02,
    position: [-0.1, -0.23, 0],
    rotation: rotation[8],
    type: 1,
  },
  {
    scale: 0.02,
    position: [-0.1, -0.235, 0],
    rotation: rotation[9],
    type: 1,
  },
  {
    scale: 0.02,
    position: [-0.1, -0.23, 0],
    rotation: rotation[10],
    type: 1,
  },
]
