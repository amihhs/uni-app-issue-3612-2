import type { CSSProperties, DefineComponent } from 'vue'
declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.json' {
  const jsonValue: any
  export default jsonValue
}

declare module '@/common/const'
declare module '*.ts'
declare module '*.js'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.json'

interface SVGAttributes {
  style?: string | CSSProperties | CSSProperties[]
}

declare global {
  type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
  type ExpandRecursive<T> = T extends object
    ? T extends infer O
      ? { [K in keyof O]: ExpandRecursive<O[K]> }
      : never
    : T
}
