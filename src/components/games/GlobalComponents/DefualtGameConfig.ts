const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'root',
  width: 1280,
  height: 720,
  // scene: [SceneBG, SceneBoot, SceneBet, ScenePlay, SceneHowTo],
  transparent: true,
  backgroundColor: '#000000',
  loader: {
    baseURL: '/assets/grandmaTicket/',
  },
  audio: {
    disableWebAudio: true,
  },
  plugins: {
    global: [
      // {
      //   key: 'rexInputTextPlugin',
      //   plugin: InputTextPlugin,
      //   start: true,
      // },
    ],
  },
  scale: {
    mode: Phaser.Scale.NO_ZOOM,
    width: 1280,
    height: 720,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
}

export default config
