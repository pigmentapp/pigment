## [0.17.2](https://github.com/pigmentapp/pigment/compare/0.17.1...0.17.2) (2023-09-01)


### Bug Fixes

* fix app startup ([8ed94df](https://github.com/pigmentapp/pigment/commit/8ed94df9f0bd858a7c7fc2fc2b8b02d642275d0a))

## [0.17.1](https://github.com/pigmentapp/pigment/compare/0.17.0...0.17.1) (2023-08-31)


### Bug Fixes

* create macos release ([b80514c](https://github.com/pigmentapp/pigment/commit/b80514c2cdca432eab942a1fdbff7cecc53b3199))

# [0.17.0](https://github.com/pigmentapp/pigment/compare/0.16.0...0.17.0) (2023-08-31)


### Bug Fixes

* **webview:** work around google account login barrier ([f6c1a04](https://github.com/pigmentapp/pigment/commit/f6c1a04e83864d8b4009702b0d2b9ffe49851b6d))


### Features

* **project:** add deprecation warning ([d1c00bc](https://github.com/pigmentapp/pigment/commit/d1c00bcc070b662261dae26270cb6539098a6692))
* **project:** add license ([59caf97](https://github.com/pigmentapp/pigment/commit/59caf97bd124fa366a63f5953dd082382ca144c2))
* **titlebar:** add indicator for insecure websites ([a1bdd12](https://github.com/pigmentapp/pigment/commit/a1bdd12f4f53f6833f644fce8e38d6d2a37bbe78))
* **titlebar:** add indicator for invalid website certificate ([7032519](https://github.com/pigmentapp/pigment/commit/70325196dd283cc9e1db402f86f78d13b3b7f532))

# [0.16.0](https://github.com/pigmentapp/pigment/compare/0.15.0...0.16.0) (2022-09-22)


### Bug Fixes

* **electron:** update to 20.1.4 ([472d863](https://github.com/pigmentapp/pigment/commit/472d86372121b1e0e83eaecddcdbe9dfd47b6690))
* **tabs:** fix 'delete tab' button ([2f2fbc9](https://github.com/pigmentapp/pigment/commit/2f2fbc95856fda285f9ab3a747d69abc1e72f386))
* **webview:** refocus active tab on window activation ([41b2c68](https://github.com/pigmentapp/pigment/commit/41b2c687c4db973e1dfca381f66861ea44a21011))
* **webview:** set default background color to white ([d710852](https://github.com/pigmentapp/pigment/commit/d710852b24ceccbf55625e7d3b98b8cde17b4df2))


### Features

* **navigation:** indicate loading state of tabs ([e1143b9](https://github.com/pigmentapp/pigment/commit/e1143b9af5c7840a462e66d3d2c8d4c434a93956))
* **tabs:** load tab once it has been focused ([a2f4ce2](https://github.com/pigmentapp/pigment/commit/a2f4ce209dbce15e0b27fdccf7f83bd79c17094f))
* **tabs:** store current favicon ([8a89713](https://github.com/pigmentapp/pigment/commit/8a89713d5d1714f168c60de3df3a47e5ac6a4e5f))
* **webview:** enable context isolation for better security ([b649b71](https://github.com/pigmentapp/pigment/commit/b649b712519cbc0527dead0009ae179ba2a34bfc))

# [0.15.0](https://github.com/pigmentapp/pigment/compare/0.14.1...0.15.0) (2022-09-15)


### Bug Fixes

* **electron:** update to 20.1.3 with chromium 104.0.5112.65 ([4083aea](https://github.com/pigmentapp/pigment/commit/4083aea05fc22b160acc5f360a5eb52f18825e56))
* **window:** fix 'close window' button on windows ([a84a278](https://github.com/pigmentapp/pigment/commit/a84a278bf9d57c3214bfdd7c72c2afc5793a7038))
* **window:** fix 'minimize window' button on windows ([dbeae56](https://github.com/pigmentapp/pigment/commit/dbeae56ef1ea6a7245e4808853d066afa93b82bd))


### Features

* add modified fallback user agent ([9640d18](https://github.com/pigmentapp/pigment/commit/9640d18c244986d94168aa7c44af0afe9672eea0))
* **navigation:** add secondary menu to hide tabs in it ([6aa60c0](https://github.com/pigmentapp/pigment/commit/6aa60c09b9c5a1509e9a1f4c04d279e55e03dd2a))
* **tabs:** add option to move tab to new secondary menu ([ee66494](https://github.com/pigmentapp/pigment/commit/ee66494bfa017b2a46bf9e267523d04fd5326737))
* update some dependencies ([d1cbbca](https://github.com/pigmentapp/pigment/commit/d1cbbca86b2cdb145758f3098f47fd604161c284))
* **webview:** add menu items to 'select all' and copy/save videos ([4e5d8d8](https://github.com/pigmentapp/pigment/commit/4e5d8d81df9c78e280bff561114df7b3a9255796))

## [0.14.1](https://github.com/pigmentapp/pigment/compare/0.14.0...0.14.1) (2022-04-19)


### Bug Fixes

* **electron:** update to 18.0.3 with chromium 100.0.4896.75 + replace deprecated `remote` module ([2f93301](https://github.com/pigmentapp/pigment/commit/2f933017ab6128f2757b4f0521d4c2ab5efe9e24))

# [0.14.0](https://github.com/pigmentapp/pigment/compare/0.13.1...0.14.0) (2021-08-08)


### Bug Fixes

* **navigation:** prevent broken favicons ([879b482](https://github.com/pigmentapp/pigment/commit/879b4822b65b65a61c417535e0fa6eb905acbe53))


### Features

* **electron:** update to 13.1.7 with chromium 91.0.4472.124 ([c6574ef](https://github.com/pigmentapp/pigment/commit/c6574ef34fdfcf573273ce03b26b23c682333bfc))
* **navigation:** add context menu for tabs ([1337a4a](https://github.com/pigmentapp/pigment/commit/1337a4aa7b0a51356ffcc0b722e53066f7685f9d))
* **navigation:** sort tabs by context menu ([bf3891a](https://github.com/pigmentapp/pigment/commit/bf3891afa104467ea79274e6589cae0e4b79b1a2))
* **tabs:** add common keyboard shortcuts for active tab ([40d9891](https://github.com/pigmentapp/pigment/commit/40d98910a141f8808008cda4285b4a67acc9fc12))
* **webview:** integrate context menu to copy/paste + save + search + inspect contents ([f58fce7](https://github.com/pigmentapp/pigment/commit/f58fce7bd483dd051875696beb9f6ac5e0c7783b))

# [0.14.0](https://github.com/pigmentapp/pigment/compare/0.13.1...0.14.0) (2021-08-08)


### Bug Fixes

* **navigation:** prevent broken favicons ([879b482](https://github.com/pigmentapp/pigment/commit/879b4822b65b65a61c417535e0fa6eb905acbe53))


### Features

* **electron:** update to 13.1.7 with chromium 91.0.4472.124 ([c6574ef](https://github.com/pigmentapp/pigment/commit/c6574ef34fdfcf573273ce03b26b23c682333bfc))
* **navigation:** add context menu for tabs ([1337a4a](https://github.com/pigmentapp/pigment/commit/1337a4aa7b0a51356ffcc0b722e53066f7685f9d))
* **navigation:** sort tabs by context menu ([bf3891a](https://github.com/pigmentapp/pigment/commit/bf3891afa104467ea79274e6589cae0e4b79b1a2))
* **tabs:** add common keyboard shortcuts for active tab ([40d9891](https://github.com/pigmentapp/pigment/commit/40d98910a141f8808008cda4285b4a67acc9fc12))
* **webview:** integrate context menu to copy/paste + save + search + inspect contents ([f58fce7](https://github.com/pigmentapp/pigment/commit/f58fce7bd483dd051875696beb9f6ac5e0c7783b))

## [0.13.1](https://github.com/pigmentapp/pigment/compare/0.13.0...0.13.1) (2021-01-07)


### Bug Fixes

* **webview:** prevent new pigment window for external links ([ae4f244](https://github.com/pigmentapp/pigment/commit/ae4f2449a624d26ed78f24e3d7279aba8271e3ed))

# [0.13.0](https://github.com/pigmentapp/pigment/compare/0.12.0...0.13.0) (2020-11-30)


### Bug Fixes

* **webview:** prevent error on file download ([10013f8](https://github.com/pigmentapp/pigment/commit/10013f8ff125f5364f98ecd03f3102497a2d3733))


### Features

* **electron:** update to 10.1.5 with chromium 85.0.4183.121 ([5b36988](https://github.com/pigmentapp/pigment/commit/5b369889f8d52cff75eeed074cc94f13d4bafc75))
* improve update visibility + integrate auto-update for windows users ([#11](https://github.com/pigmentapp/pigment/issues/11)) ([6ca22eb](https://github.com/pigmentapp/pigment/commit/6ca22eb6a5f9e9bfd6dc3729997dda32d526e9bf))

# [0.13.0](https://github.com/pigmentapp/pigment/compare/0.12.0...0.13.0) (2020-11-30)


### Bug Fixes

* **webview:** prevent error on file download ([10013f8](https://github.com/pigmentapp/pigment/commit/10013f8ff125f5364f98ecd03f3102497a2d3733))


### Features

* **electron:** update to 10.1.5 with chromium 85.0.4183.121 ([5b36988](https://github.com/pigmentapp/pigment/commit/5b369889f8d52cff75eeed074cc94f13d4bafc75))
* improve update visibility + integrate auto-update for windows users ([#11](https://github.com/pigmentapp/pigment/issues/11)) ([6ca22eb](https://github.com/pigmentapp/pigment/commit/6ca22eb6a5f9e9bfd6dc3729997dda32d526e9bf))

# [0.13.0](https://github.com/pigmentapp/pigment/compare/0.12.0...0.13.0) (2020-11-30)


### Bug Fixes

* **webview:** prevent error on file download ([10013f8](https://github.com/pigmentapp/pigment/commit/10013f8ff125f5364f98ecd03f3102497a2d3733))


### Features

* **electron:** update to 10.1.5 with chromium 85.0.4183.121 ([5b36988](https://github.com/pigmentapp/pigment/commit/5b369889f8d52cff75eeed074cc94f13d4bafc75))
* improve update visibility + integrate auto-update for windows users ([#11](https://github.com/pigmentapp/pigment/issues/11)) ([6ca22eb](https://github.com/pigmentapp/pigment/commit/6ca22eb6a5f9e9bfd6dc3729997dda32d526e9bf))

# [0.12.0](https://github.com/pigmentapp/pigment/compare/0.11.0...0.12.0) (2020-08-11)


### Features

* **notifications:** limit max number of stored notifications to 99 ([35a453e](https://github.com/pigmentapp/pigment/commit/35a453eedd82b4988b72c4708af0715d5aa93f4c))
* unite menu + home + notifications + release notes into combined view ([a4b2e0c](https://github.com/pigmentapp/pigment/commit/a4b2e0c66d22ba6f79a0119fb9298fdfbfa858bd))
* **recommendations:** use icon service by DDG to resolve favicons ([6f1fc8f](https://github.com/pigmentapp/pigment/commit/6f1fc8fe80c0f286c1895b110150f6c4bd0e7091))
* **titlebar:** add option to copy url to clipboard ([8f4ed29](https://github.com/pigmentapp/pigment/commit/8f4ed29d958b8b06773b19f1b9e8ca0e0eedea81))
* **titlebar:** display current url when menu is open ([85cecbe](https://github.com/pigmentapp/pigment/commit/85cecbe7290c0e7a9a541f76f625191b9e0f0ca1))
* **titlebar:** show url if page title is empty ([dc114ad](https://github.com/pigmentapp/pigment/commit/dc114ad6eea16a80b345e3f335014c864d27dec4))
* **webview:** add 'hard reload' option to menu ([edc1220](https://github.com/pigmentapp/pigment/commit/edc1220126edd51fa5955443bad7b3e82765efdf))
* **webview:** replace electron webview with browserview ([dc4866f](https://github.com/pigmentapp/pigment/commit/dc4866f36b8685956c6f797101130600d01492eb))

# [0.11.0](https://github.com/pigmentapp/pigment/compare/0.10.0...0.11.0) (2020-08-02)


### Bug Fixes

* **navigation:** prevent wrong display of notification badge on pageload ([a9407d7](https://github.com/pigmentapp/pigment/commit/a9407d75c98786e2bed64697c77656e0871a47a0))


### Features

* **electron:** update to 9.1.2 with chromium 83.0.4103.122 ([aa04d8e](https://github.com/pigmentapp/pigment/commit/aa04d8ece375b710b010ba09d001fb8a72c21cc3))

# [0.10.0](https://github.com/pigmentapp/pigment/compare/0.9.0...0.10.0) (2020-05-17)


### Bug Fixes

* fix app icon for mac ([e73d8c0](https://github.com/pigmentapp/pigment/commit/e73d8c0d79373ba13719b732cbf62a0cfa0dd146))


### Features

* switch to native looking window controls on windows ([138e5c9](https://github.com/pigmentapp/pigment/commit/138e5c987989a0559229e0f9ff9525ad31c751d5))
* **recommendations:** add todoist ([53a42e4](https://github.com/pigmentapp/pigment/commit/53a42e4577ac669b0f11e2db04fa5c7ac24cc308))
* **recommendations:** remove wunderlist ([d5d9ae7](https://github.com/pigmentapp/pigment/commit/d5d9ae7d2aa04c246594da7cd0ce57a02ff45f11))
* keep window state if window gets closed on mac ([cf42f61](https://github.com/pigmentapp/pigment/commit/cf42f61372df497d9923dd79f2ef1a0c39443fd3))
* update electronjs to 8.2.3 with chromium 80.0.3987.163 ([836fb41](https://github.com/pigmentapp/pigment/commit/836fb4132f8208b58058691e90d5438a1567c35a))

# [0.9.0](https://github.com/pigmentapp/pigment/compare/0.8.0...0.9.0) (2019-08-11)


### Features

* **navigation:** improved behavior on a long list of tabs ([6f314d2](https://github.com/pigmentapp/pigment/commit/6f314d2))
* **tabs:** added explanations for all tab settings ([762b4fb](https://github.com/pigmentapp/pigment/commit/762b4fb))
* **tabs:** create individual session scopes for single or multiple tabs ([c51c901](https://github.com/pigmentapp/pigment/commit/c51c901))
* **tabs:** create/edit form fields redesign ([e8a8991](https://github.com/pigmentapp/pigment/commit/e8a8991))
* **tabs:** divided settings into visual tabs ([40d1547](https://github.com/pigmentapp/pigment/commit/40d1547))
* **tabs:** new tabs can now be created from templates ([d1c9664](https://github.com/pigmentapp/pigment/commit/d1c9664))
* **tabs:** override some general settings with tab-specific settings ([23d9930](https://github.com/pigmentapp/pigment/commit/23d9930))
* electronjs update to 6.0.0 with chromium 76.0.3809.88 ([8417228](https://github.com/pigmentapp/pigment/commit/8417228))
* max width for contents ([91f8af4](https://github.com/pigmentapp/pigment/commit/91f8af4))
* tailwindcss update to 1.1.0 ([ac03c58](https://github.com/pigmentapp/pigment/commit/ac03c58))

# [0.8.0](https://github.com/pigmentapp/pigment/compare/0.7.1...0.8.0) (2019-07-01)


### Bug Fixes

* electronjs update to 5.0.6 with chromium 73.0.3683.121 ([dbfa53e](https://github.com/pigmentapp/pigment/commit/dbfa53e))
* **window:** removed duplicate menu items (mac only) ([1d0e866](https://github.com/pigmentapp/pigment/commit/1d0e866))


### Features

* direct download + info links for app updates ([9044d2a](https://github.com/pigmentapp/pigment/commit/9044d2a))
* file download visualization in dock/taskbar ([b2f81f1](https://github.com/pigmentapp/pigment/commit/b2f81f1))
* release notes view redesign ([d57553a](https://github.com/pigmentapp/pigment/commit/d57553a))
* **dimmer:** subtle 'new notifications' indicator in dimmer ([f1c5371](https://github.com/pigmentapp/pigment/commit/f1c5371))
* **notifications:** highlight app in taskbar at new notifications (win) ([c6594b4](https://github.com/pigmentapp/pigment/commit/c6594b4))
* **notifications:** show notification badge in dock (mac only) ([53439f1](https://github.com/pigmentapp/pigment/commit/53439f1))
* **settings:** toggle quick settings in settings menu ([3be5961](https://github.com/pigmentapp/pigment/commit/3be5961))

## [0.7.1](https://github.com/pigmentapp/pigment/compare/0.7.0...0.7.1) (2019-06-12)


### Bug Fixes

* corrected update checker url ([79d1491](https://github.com/pigmentapp/pigment/commit/79d1491))

# [0.7.0](https://github.com/pigmentapp/pigment/compare/0.6.0...0.7.0) (2019-06-12)


### Features

* decent app scrollbar styling ([ce34f68](https://github.com/pigmentapp/pigment/commit/ce34f68))
* **navigation:** better 'welcome page' visibility as button ([44ba39c](https://github.com/pigmentapp/pigment/commit/44ba39c))
* **navigation:** improved tab-sorting experience ([4d7a6e7](https://github.com/pigmentapp/pigment/commit/4d7a6e7))
* **notifications:** confirm 'clear all' action ([95137f8](https://github.com/pigmentapp/pigment/commit/95137f8))
* **settings:** configurable tab indicator badge color ([70d5956](https://github.com/pigmentapp/pigment/commit/70d5956))
* **settings:** configurable tab indicator badge size ([be09a3d](https://github.com/pigmentapp/pigment/commit/be09a3d))
* **tabs:** confirm 'delete tab' action in tab menu ([2c4cd47](https://github.com/pigmentapp/pigment/commit/2c4cd47))
* added titles to icon-only buttons ([498e830](https://github.com/pigmentapp/pigment/commit/498e830))
* **settings:** control 'welcome page' button visibility ([b91e5b3](https://github.com/pigmentapp/pigment/commit/b91e5b3))
* **tabs:** new 'delete tab' button in tab header menu ([bdb8d7d](https://github.com/pigmentapp/pigment/commit/bdb8d7d))

# [0.6.0](https://github.com/pigmentapp/pigment/compare/0.5.0...0.6.0) (2019-06-10)


### Bug Fixes

* **webview:** invisible input cursor ([966f8b6](https://github.com/pigmentapp/pigment/commit/966f8b6))


### Features

* app suggestions on welcome page ([9145c29](https://github.com/pigmentapp/pigment/commit/9145c29))
* create new tabs with cmd/ctrl+n ([e8e02ec](https://github.com/pigmentapp/pigment/commit/e8e02ec))
* electronjs update to 5.0.2 with chromium 73.0.3683.121 ([78df3af](https://github.com/pigmentapp/pigment/commit/78df3af))
* reduced legacy styles and scripts generation ([2abc09a](https://github.com/pigmentapp/pigment/commit/2abc09a))
* simple update check on welcome page ([adf3c85](https://github.com/pigmentapp/pigment/commit/adf3c85))
* switch between tabs with cmd/ctrl+[1-9] ([f8b26c1](https://github.com/pigmentapp/pigment/commit/f8b26c1))
* tailwindcss updated to v1 + associated color adjustments ([38d67ca](https://github.com/pigmentapp/pigment/commit/38d67ca))
* welcome page styling improvements ([0fa49ce](https://github.com/pigmentapp/pigment/commit/0fa49ce))
* **settings:** complete redesign ([8470400](https://github.com/pigmentapp/pigment/commit/8470400))
* **settings:** configurable dimmer delay ([836ad33](https://github.com/pigmentapp/pigment/commit/836ad33))
* **window:** shortcut cmd+h to hide the window ([e9ce046](https://github.com/pigmentapp/pigment/commit/e9ce046))
* **window:** shortcut cmd+m to minimize the window ([022edf0](https://github.com/pigmentapp/pigment/commit/022edf0))

# [0.5.0](https://github.com/pigmentapp/pigment/compare/0.4.0...0.5.0) (2019-04-29)


### Bug Fixes

* corrected changelog file path for build ([ad00d4b](https://github.com/pigmentapp/pigment/commit/ad00d4b))
* **tabs:** do not show browser controls in tab settings view ([933cbe7](https://github.com/pigmentapp/pigment/commit/933cbe7))


### Features

* introduced changelog page ([cda67a9](https://github.com/pigmentapp/pigment/commit/cda67a9))
* revised changelog integration ([c991e71](https://github.com/pigmentapp/pigment/commit/c991e71))
* **settings:** hideable tab labels in navigation ([ea95c72](https://github.com/pigmentapp/pigment/commit/ea95c72))
* **tabs:** moved home, devtools and edit button to dropdown menu ([8a1df57](https://github.com/pigmentapp/pigment/commit/8a1df57))
* **tabs:** set active page as homepage in dropdown menu ([1381156](https://github.com/pigmentapp/pigment/commit/1381156))
* **titlebar:** optional 'back to previous view' button ([fa812ad](https://github.com/pigmentapp/pigment/commit/fa812ad))
* introduced cleaner layout strategy ([996b18f](https://github.com/pigmentapp/pigment/commit/996b18f))
* new layout improvements for windows ([7b89997](https://github.com/pigmentapp/pigment/commit/7b89997))

# [0.4.0](https://github.com/pigmentapp/pigment/compare/0.3.0...0.4.0) (2019-04-22)


### Bug Fixes

* **navigation:** scroll badge + cut badge if sidebar is right aligned ([fddf81a](https://github.com/pigmentapp/pigment/commit/fddf81a))
* **notifications:** item remove button was not working ([b2e8901](https://github.com/pigmentapp/pigment/commit/b2e8901))
* **notifications:** scheduler did not filter new notifications properly ([98e2913](https://github.com/pigmentapp/pigment/commit/98e2913))


### Features

* general layout improvements ([52602c0](https://github.com/pigmentapp/pigment/commit/52602c0))
* **settings:** moved from localStorage to filebased settings storage ([e74d6c8](https://github.com/pigmentapp/pigment/commit/e74d6c8))
* **settings:** new structure and saved as settings.json ([b42e171](https://github.com/pigmentapp/pigment/commit/b42e171))
* **settings:** removed platform-dependent layout inversion ([34ba2bf](https://github.com/pigmentapp/pigment/commit/34ba2bf))

# [0.3.0](https://github.com/pigmentapp/pigment/compare/0.2.0...0.3.0) (2019-04-20)


### Bug Fixes

* **tabs:** $ref of webview got lost in dev-mode with HMR ([8da78dc](https://github.com/pigmentapp/pigment/commit/8da78dc))
* **tabs:** unwanted ui reactivity at second settings edit ([f8ff8ac](https://github.com/pigmentapp/pigment/commit/f8ff8ac))
* **webview:** fixed user agent cleanup ([575650f](https://github.com/pigmentapp/pigment/commit/575650f))
* **webview:** set user agent properly ([efbc469](https://github.com/pigmentapp/pigment/commit/efbc469))


### Features

* **navigation:** improved favicon presentation ([2718f84](https://github.com/pigmentapp/pigment/commit/2718f84))
* **navigation:** show notification badge on tab if it has news ([827760f](https://github.com/pigmentapp/pigment/commit/827760f))
* **navigation:** shrink/grow to label/min-width/max-width ([e47754f](https://github.com/pigmentapp/pigment/commit/e47754f))
* **tabs:** added back/forward navigation ([e31dd1a](https://github.com/pigmentapp/pigment/commit/e31dd1a))
* **tabs:** relocated webview to own component ([77d6279](https://github.com/pigmentapp/pigment/commit/77d6279))
* **tabs:** switched from 'ident' to 'id' as identifier ([3fa8cb1](https://github.com/pigmentapp/pigment/commit/3fa8cb1))
* **tabs:** switched from timestamp ids to unique ids ([a1d81da](https://github.com/pigmentapp/pigment/commit/a1d81da))

# [0.2.0](https://github.com/pigmentapp/pigment/compare/0.1.0...0.2.0) (2019-04-19)


### Bug Fixes

* **routing:** removed unused routes ([62e0a74](https://github.com/pigmentapp/pigment/commit/62e0a74))
* **window:** titlebar now drags window by default ([1a218fe](https://github.com/pigmentapp/pigment/commit/1a218fe))


### Features

* **nav:** make list scrollable ([ec3b34c](https://github.com/pigmentapp/pigment/commit/ec3b34c))
* moved tab creation and settings to own route ([70999d8](https://github.com/pigmentapp/pigment/commit/70999d8))
* relocated page state from tabs into own store ([ba35c4b](https://github.com/pigmentapp/pigment/commit/ba35c4b))
* **notifications:** moved button to titlebar ([8403169](https://github.com/pigmentapp/pigment/commit/8403169))
* **routing:** consistent routing without child routes ([7bdc365](https://github.com/pigmentapp/pigment/commit/7bdc365))
