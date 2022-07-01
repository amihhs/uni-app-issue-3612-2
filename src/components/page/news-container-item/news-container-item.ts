import type { PropType } from 'vue'
export const newsContainerItemProps = {
  item: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  isAuthor: {
    type: Boolean,
    default: false,
  },
  isShowTop: {
    type: Boolean,
    default: true,
  },
}
export const newContainerItemEmits = {
  // viewItem: (data: NewsItem, index: number) => typeof data === 'object' && typeof index === 'number',
  imgError: (index: number) => typeof index === 'number',
}
