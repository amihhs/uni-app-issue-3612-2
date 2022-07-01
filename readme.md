### 注意事项

```
条件编译是利用注释实现的，在不同语法里注释写法不一样，
js使用 // 注释、
css、scss、less 使用 /* 注释 */、
vue/nvue 模板里使用 <!-- 注释 -->；
```

### bug

`[Component] slot "" is not found`

由于组件内的`slot`在`v-if`的包裹内导致出现的警告


```
TypeError: up.split is not a function
    at findComponentPropsData (vendor.js? [sm]:4858)
    at findPropsData (vendor.js? [sm]:5463)
    at Vi.attached (vendor.js? [sm]:5719)
    at i.safeCallback (VM4633 WAService.js:2)
    at i.call (VM4633 WAService.js:2)
    at t (VM4633 WAService.js:2)
    at t (VM4633 WAService.js:2)
    at t (VM4633 WAService.js:2)
    at t (VM4633 WAService.js:2)
    a
    
    // 类似 v-if 改成 v-show是会导致，猜测可是是插槽内数据问题
    layouts-page
    v-else-if="pageStatus === 'loaded'"
```