export const componentVideoProps = {
  vid: {
    type: Number,
    default: -1,
  },
  isHandleScroll: {
    // 是否监听滚动
    type: Boolean,
    default: false,
  },
  isCurrentPlay: {
    // 是否当前播放
    type: Boolean,
    default: false,
  },
  video: {
    // 视频地址
    type: String,
    default: '',
  },
  img: {
    // 视频封面图
    type: String,
    default: '',
  },
  autoplay: {
    // 是否播放
    type: Boolean,
    default: false,
  },
  canPlay: {
    // 是否能播放
    type: Boolean,
    default: true,
  },
}
export interface VideoPosition {
  itemTop: number // 当前组件距离顶部高
  itemHeight: number // 当前组件高度
  containerTop: number // 当前组件滚动容器距离顶部高
}
export interface VideoCurrentPlay {
  playId: number
  videoPosition: VideoPosition
  videoContext: UniApp.VideoContext
}
export const componentVideoEmits = {
  play: (data: VideoCurrentPlay) => typeof data === 'object',
  // videoControl: () => { },
}
export const videoPositionDefault = {
  itemTop: 0,
  itemHeight: 0,
  containerTop: 0,
}
