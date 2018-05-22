const state = {
  currentlyScanning: false,
  alreadyScanned: false,
  engineFPS: undefined,
  cameraFPS: undefined
}

const mutations = {
  SET_CURRENTLY_SCANNING: function(state, val) {state.currentlyScanning = val; },
  SET_ALREADY_SCANNED: function(state, val) {state.alreadyScanned = val; },
  SET_ENGINE_FPS: function(state, val) {state.engineFPS = val},
  SET_CAMERA_FPS: function(state, val) {state.cameraFPS = val}
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
