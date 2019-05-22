# [0.25.0](https://github.com/qantasairways/runway/compare/v0.24.1...v0.25.0) (2019-05-22)


### Features

* **daypicker:** Add missing tests and minor bugfixes ([#52](https://github.com/qantasairways/runway/issues/52)) ([670e116](https://github.com/qantasairways/runway/commit/670e116))

## [0.24.1](https://github.com/qantasairways/runway/compare/v0.24.0...v0.24.1) (2019-05-22)


### Bug Fixes

* **crossicon, numericinput, infosection, infoicon, footer:** fix icon positioning, viewbox dimensions, footer button dimensions, dynamic icon to text content line alignments, validation anchor element positioning, supress jest snapshots on initial github diff ([#50](https://github.com/qantasairways/runway/issues/50)) ([8c3f4ce](https://github.com/qantasairways/runway/commit/8c3f4ce))

# [0.24.0](https://github.com/qantasairways/runway/compare/v0.23.0...v0.24.0) (2019-05-21)


### Features

* **daypicker:** Add markup and styles to display price information ([#49](https://github.com/qantasairways/runway/issues/49)) ([c7ccd33](https://github.com/qantasairways/runway/commit/c7ccd33))

# [0.23.0](https://github.com/qantasairways/runway/compare/v0.22.0...v0.23.0) (2019-05-20)


### Features

* **popupfield:** Fixed some styling issues, added ability to set refs on NumericInput and Typeahead for a11y. ([#48](https://github.com/qantasairways/runway/issues/48)) ([bc9e14a](https://github.com/qantasairways/runway/commit/bc9e14a))

# [0.22.0](https://github.com/qantasairways/runway/compare/v0.21.1...v0.22.0) (2019-05-17)


### Features

* **daypicker:** Enable event subscriptions to updates of months visibly shown, enable custom date data transforms on generated month dates data ([#44](https://github.com/qantasairways/runway/issues/44)) ([7f281ad](https://github.com/qantasairways/runway/commit/7f281ad))

## [0.21.1](https://github.com/qantasairways/runway/compare/v0.21.0...v0.21.1) (2019-05-17)


### Bug Fixes

* **daypicker:** Fix some a11y and styling issues with daypicker. Some general cleanup of styleguide ([#45](https://github.com/qantasairways/runway/issues/45)) ([c132262](https://github.com/qantasairways/runway/commit/c132262))

# [0.21.0](https://github.com/qantasairways/runway/compare/v0.20.1...v0.21.0) (2019-05-16)


### Features

* **theme:** Refactored colours into a separate JSON file so that we can import that file directly in other projects. ([#21](https://github.com/qantasairways/runway/issues/21)) ([813f632](https://github.com/qantasairways/runway/commit/813f632))

## [0.20.1](https://github.com/qantasairways/runway/compare/v0.20.0...v0.20.1) (2019-05-15)


### Bug Fixes

* **dropdown:** some styling fixes ([#43](https://github.com/qantasairways/runway/issues/43)) ([dea2711](https://github.com/qantasairways/runway/commit/dea2711))

# [0.20.0](https://github.com/qantasairways/runway/compare/v0.19.0...v0.20.0) (2019-05-14)


### Features

* **styling:** Some minor styling fixes ([#42](https://github.com/qantasairways/runway/issues/42)) ([aa1cb03](https://github.com/qantasairways/runway/commit/aa1cb03))

# [0.19.0](https://github.com/qantasairways/runway/compare/v0.18.0...v0.19.0) (2019-05-14)


### Features

* **daypicker:** Replaced library with components and logic from scratch because of performance issues. Added windowing. Updates for desktop design. Moved the tabs into the header. ([#39](https://github.com/qantasairways/runway/issues/39)) ([772eb90](https://github.com/qantasairways/runway/commit/772eb90))

# [0.18.0](https://github.com/qantasairways/runway/compare/v0.17.0...v0.18.0) (2019-05-14)


### Features

* **dropdown:** dropdown design for trip type and travel class, fix the press active on touch screen devices ([#40](https://github.com/qantasairways/runway/issues/40)) ([1e1a192](https://github.com/qantasairways/runway/commit/1e1a192))

# [0.17.0](https://github.com/qantasairways/runway/compare/v0.16.0...v0.17.0) (2019-05-08)

### Features

- **typeahead:** Added styles for typeahead ([#36](https://github.com/qantasairways/runway/issues/36)) ([a621edc](https://github.com/qantasairways/runway/commit/a621edc))

# [0.16.0](https://github.com/qantasairways/runway/compare/v0.15.0...v0.16.0) (2019-05-06)

### Features

- **daypicker:** Initial implementation of controlled daypicker component. Abstracted shared parts of popupfield into shared folder ([#35](https://github.com/qantasairways/runway/issues/35)) ([88c5f33](https://github.com/qantasairways/runway/commit/88c5f33))

# [0.15.0](https://github.com/qantasairways/runway/compare/v0.14.2...v0.15.0) (2019-04-29)

### Features

- **popupfield:** Add header and aria label to dialog and refactor fieldButton component. Add more descriptive documentation. ([#34](https://github.com/qantasairways/runway/issues/34)) ([c145b2c](https://github.com/qantasairways/runway/commit/c145b2c))

## [0.14.2](https://github.com/qantasairways/runway/compare/v0.14.1...v0.14.2) (2019-04-26)

### Bug Fixes

- **externallink:** Map font colours to correct media query rules, propagate dynamic icon styles by classname ([#28](https://github.com/qantasairways/runway/issues/28)) ([eea62ae](https://github.com/qantasairways/runway/commit/eea62ae))

## [0.14.1](https://github.com/qantasairways/runway/compare/v0.14.0...v0.14.1) (2019-04-23)

### Bug Fixes

- **toggle:** Move Toggle.spec to tests dir ([#32](https://github.com/qantasairways/runway/issues/32)) ([dc7b153](https://github.com/qantasairways/runway/commit/dc7b153))

# [0.14.0](https://github.com/qantasairways/runway/compare/v0.13.0...v0.14.0) (2019-04-23)

### Features

- **toggle:** Refactor toggle to use/extend react-switch ([#20](https://github.com/qantasairways/runway/issues/20)) ([8161d33](https://github.com/qantasairways/runway/commit/8161d33))

# [0.13.0](https://github.com/qantasairways/runway/compare/v0.12.0...v0.13.0) (2019-04-23)

### Features

- **popupfield:** Allow component to accept one, two or no values. Move icons to separate folder and update rollup. Add labels for css and shortid for icons. ([#30](https://github.com/qantasairways/runway/issues/30)) ([0f34c4f](https://github.com/qantasairways/runway/commit/0f34c4f))

# [0.12.0](https://github.com/qantasairways/runway/compare/v0.11.2...v0.12.0) (2019-04-17)

### Features

- **dropdown:** ([#16](https://github.com/qantasairways/runway/issues/16)) ([28e56fb](https://github.com/qantasairways/runway/commit/28e56fb)), closes [#24](https://github.com/qantasairways/runway/issues/24)

## [0.11.2](https://github.com/qantasairways/runway/compare/v0.11.1...v0.11.2) (2019-04-15)

### Bug Fixes

- **github:** added more reviewers ([5fa80ac](https://github.com/qantasairways/runway/commit/5fa80ac))

## [0.11.1](https://github.com/qantasairways/runway/compare/v0.11.0...v0.11.1) (2019-04-15)

### Bug Fixes

- **ci:** Added linting to ci ([94dfba4](https://github.com/qantasairways/runway/commit/94dfba4))

# [0.11.0](https://github.com/qantasairways/runway/compare/v0.10.0...v0.11.0) (2019-04-15)

### Features

- **external-links:** Implement ExternalLink component design with responsive behaviours ([2f264ea](https://github.com/qantasairways/runway/commit/2f264ea))

# [0.10.0](https://github.com/qantasairways/runway/compare/v0.9.0...v0.10.0) (2019-04-10)

### Features

- **popupfield:** Add styling and examples for popup field, some fixes for a11y ([195e374](https://github.com/qantasairways/runway/commit/195e374))

# [0.9.0](https://github.com/qantasairways/runway/compare/v0.8.0...v0.9.0) (2019-04-10)

### Bug Fixes

- **circleci:** removed deploy and publish on branches ([8950771](https://github.com/qantasairways/runway/commit/8950771))
- **circleci:** update filters for deploy and publish ([ae6852f](https://github.com/qantasairways/runway/commit/ae6852f))

### Features

- **setup:** Added styleguide documents to the components, fixed test file names ([ffe98ee](https://github.com/qantasairways/runway/commit/ffe98ee))

# [0.8.0](https://github.com/qantasairways/runway/compare/v0.7.3...v0.8.0) (2019-04-02)

### Features

- **toggle:** Update toggle to use native elements click behaviour. Add onBlur. ([4f28294](https://github.com/qantasairways/runway/commit/4f28294))

## [0.7.3](https://github.com/qantasairways/runway/compare/v0.7.2...v0.7.3) (2019-04-02)

### Bug Fixes

- **typeahead:** Guarantee list fetcher only handed manual user input, expose selectItemCollector to allow component consumer to maintain reference to Downshifts selectItem hook ([550ddc0](https://github.com/qantasairways/runway/commit/550ddc0))

## [0.7.2](https://github.com/qantasairways/runway/compare/v0.7.1...v0.7.2) (2019-04-01)

### Bug Fixes

- **circleci:** persist to workspace build step ([ea346bd](https://github.com/qantasairways/runway/commit/ea346bd))

## [0.7.1](https://github.com/qantasairways/runway/compare/v0.7.0...v0.7.1) (2019-04-01)

### Bug Fixes

- **gitignore:** updated gitignore ([799f13c](https://github.com/qantasairways/runway/commit/799f13c))

# [0.7.0](https://github.com/qantasairways/runway/compare/v0.6.2...v0.7.0) (2019-04-01)

### Features

- **popupfield:** Initial functionality for popup field ([35a37ed](https://github.com/qantasairways/runway/commit/35a37ed))

## [0.6.2](https://github.com/qantasairways/runway/compare/v0.6.1...v0.6.2) (2019-02-19)

### Bug Fixes

- **packagejson:** added esm and corrected urls ([019e704](https://github.com/qantasairways/runway/commit/019e704))

## [0.6.1](https://github.com/qantasairways/runway/compare/v0.6.0...v0.6.1) (2019-02-19)

### Bug Fixes

- **circleci:** force push to heroku ([517b63e](https://github.com/qantasairways/runway/commit/517b63e))

# [0.6.0](https://github.com/qantasairways/runway/compare/v0.5.1...v0.6.0) (2019-02-19)

### Features

- **toggle:** Initial functionality for Toggle component ([847ae49](https://github.com/qantasairways/runway/commit/847ae49))

## [0.5.1](https://github.com/qantasairways/runway/compare/v0.5.0...v0.5.1) (2019-02-19)

### Bug Fixes

- **button:** Add propTypes to button component. ([12b23ef](https://github.com/qantasairways/runway/commit/12b23ef))
- **typeahead:** Add default value for items prop. Remove fetchListOnInput functionality as this should be handled by the parent. ([530e3c8](https://github.com/qantasairways/runway/commit/530e3c8))

# [0.5.0](https://github.com/qantasairways/runway/compare/v0.4.2...v0.5.0) (2019-02-19)

### Features

- **setup:** Auto generate components index file ([3e9ee1a](https://github.com/qantasairways/runway/commit/3e9ee1a))

## [0.4.2](https://github.com/qantasairways/runway/compare/v0.4.1...v0.4.2) (2019-02-15)

### Bug Fixes

- **documentation:** added contributing markdown ([1f55464](https://github.com/qantasairways/runway/commit/1f55464))

## [0.4.1](https://github.com/qantasairways/runway/compare/v0.4.0...v0.4.1) (2019-02-14)

### Bug Fixes

- **packagejson:** added engine of node ([6b81a53](https://github.com/qantasairways/runway/commit/6b81a53))
- **packagejson:** added heroku script ([df734be](https://github.com/qantasairways/runway/commit/df734be))

# [0.4.0](https://github.com/qantasairways/runway/compare/v0.3.2...v0.4.0) (2019-02-14)

### Bug Fixes

- **heroku:** fixing circleci ([e697642](https://github.com/qantasairways/runway/commit/e697642))
- **heroku:** fixing circleci for heroku ([b903bee](https://github.com/qantasairways/runway/commit/b903bee))
- **heroku:** fixing circleci for heroku ([af15ac9](https://github.com/qantasairways/runway/commit/af15ac9))

### Features

- **styleguidist:** Added style guide hosting ([3be44ba](https://github.com/qantasairways/runway/commit/3be44ba))

## [0.3.2](https://github.com/qantasairways/runway/compare/v0.3.1...v0.3.2) (2019-02-14)

### Bug Fixes

- **CHANGELOG:** cleaned changelog ([8b7712b](https://github.com/qantasairways/runway/commit/8b7712b))
- **packagejson:** changed the repository to not be my personal one woops ([a062e78](https://github.com/qantasairways/runway/commit/a062e78))
- **typeahead:** added propTypes from downshift ([4e48aab](https://github.com/qantasairways/runway/commit/4e48aab))
