# [0.4.0](https://gitlab.com/herteleo/pigment/compare/0.3.0...0.4.0) (2019-04-22)


### Bug Fixes

* **navigation:** scroll badge + cut badge if sidebar is right aligned ([fddf81a](https://gitlab.com/herteleo/pigment/commit/fddf81a))
* **notifications:** item remove button was not working ([b2e8901](https://gitlab.com/herteleo/pigment/commit/b2e8901))
* **notifications:** scheduler did not filter new notifications properly ([98e2913](https://gitlab.com/herteleo/pigment/commit/98e2913))


### Features

* general layout improvements ([52602c0](https://gitlab.com/herteleo/pigment/commit/52602c0))
* **settings:** moved from localStorage to filebased settings storage ([e74d6c8](https://gitlab.com/herteleo/pigment/commit/e74d6c8))
* **settings:** new structure and saved as settings.json ([b42e171](https://gitlab.com/herteleo/pigment/commit/b42e171))
* **settings:** removed platform-dependent layout inversion ([34ba2bf](https://gitlab.com/herteleo/pigment/commit/34ba2bf))

# [0.3.0](https://gitlab.com/herteleo/pigment/compare/0.2.0...0.3.0) (2019-04-20)


### Bug Fixes

* **tabs:** $ref of webview got lost in dev-mode with HMR ([8da78dc](https://gitlab.com/herteleo/pigment/commit/8da78dc))
* **tabs:** unwanted ui reactivity at second settings edit ([f8ff8ac](https://gitlab.com/herteleo/pigment/commit/f8ff8ac))
* **webview:** fixed user agent cleanup ([575650f](https://gitlab.com/herteleo/pigment/commit/575650f))
* **webview:** set user agent properly ([efbc469](https://gitlab.com/herteleo/pigment/commit/efbc469))


### Features

* **navigation:** improved favicon presentation ([2718f84](https://gitlab.com/herteleo/pigment/commit/2718f84))
* **navigation:** show notification badge on tab if it has news ([827760f](https://gitlab.com/herteleo/pigment/commit/827760f))
* **navigation:** shrink/grow to label/min-width/max-width ([e47754f](https://gitlab.com/herteleo/pigment/commit/e47754f))
* **tabs:** added back/forward navigation ([e31dd1a](https://gitlab.com/herteleo/pigment/commit/e31dd1a))
* **tabs:** relocated webview to own component ([77d6279](https://gitlab.com/herteleo/pigment/commit/77d6279))
* **tabs:** switched from 'ident' to 'id' as identifier ([3fa8cb1](https://gitlab.com/herteleo/pigment/commit/3fa8cb1))
* **tabs:** switched from timestamp ids to unique ids ([a1d81da](https://gitlab.com/herteleo/pigment/commit/a1d81da))

# [0.2.0](https://gitlab.com/herteleo/pigment/compare/0.1.0...0.2.0) (2019-04-19)


### Bug Fixes

* **routing:** removed unused routes ([62e0a74](https://gitlab.com/herteleo/pigment/commit/62e0a74))
* **window:** titlebar now drags window by default ([1a218fe](https://gitlab.com/herteleo/pigment/commit/1a218fe))


### Features

* **nav:** make list scrollable ([ec3b34c](https://gitlab.com/herteleo/pigment/commit/ec3b34c))
* moved tab creation and settings to own route ([70999d8](https://gitlab.com/herteleo/pigment/commit/70999d8))
* relocated page state from tabs into own store ([ba35c4b](https://gitlab.com/herteleo/pigment/commit/ba35c4b))
* **notifications:** moved button to titlebar ([8403169](https://gitlab.com/herteleo/pigment/commit/8403169))
* **routing:** consistent routing without child routes ([7bdc365](https://gitlab.com/herteleo/pigment/commit/7bdc365))
