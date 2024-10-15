### Быстрый старт

```
npm run i
npm run dev:widgets
npm run dev:facade
```

Если вы увидели следующее, значит всё завелось

![](https://i.postimg.cc/x8C9T3bf/ss.png)


### Facade (потребитель editor,player)

Занимается загрузкой и птреблением `widgets`.
Основная реализация работы с module federation находится в `use-federation.js`

Для запуска:
```
npm run dev:facade
```


### Widgets (пакет с виджетами аналог basic,insight)

Запускать через `npm run serve` нельзя. Module federation не умеет работать в dev mode.
Поэтому запускать надо в режиме `npm run preview` уже собранный production код

Для запуска:
```
npm run dev:widgets
```


### Wcore (аналог goodt-wcore)

Ядро с транзитивными зависимостями.
- ядро должно *всегда* использовать алиасы вместо псевдо пакетов см. `wcore/package.json` секцию `exports`
- нельзя использовать относительные пути в коде ядра, при импорте из другой директории (только алиасы)
- не стоит использовать re-export `export * from '...'` в ядре (это плохо сказывается на tree-shaking mf)



### Что делать если зависимости не шарятся

```
npm run ifix
```