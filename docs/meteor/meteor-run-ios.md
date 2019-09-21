### 1,执行meteor run ios报错

修改 `.meteor/local/cordova-build/platforms/ios/cordova/node_modules/ios-sim/src/lib.js` 282行为:

```js
list.push(util.format('%s, %s', name_id_map[ filterDeviceName(deviceName) ].replace(/^com.apple.CoreSimulator.SimDeviceType./, ''), runtime.replace(/^iOS /, '')));
```
原因是`ios-sim`这个包不是最新的,此时的meteor用的5.0版本的,但是`ios-sim`这个包官方更新到6.1版本,出现的错误在最新版已经更正,meteor的issues中这个bug已经有人提出来了,希望meteor开发者可以早些更改这些错误