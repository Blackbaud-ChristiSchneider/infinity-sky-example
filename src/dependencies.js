/*jslint browser: true */
/*global fallback */

(function () {
    'use strict';

    var availableSkyLocales = ["en-AU", "en-CA", "en-GB"], // en-US is available by default - do not include
        availableExampleLocales = [], // en-US is available by default - do not include
        filesToLoad,
        shims,
        locale;

    filesToLoad = {
        // CSS
        sky_css: [
            'https://sky.blackbaudcdn.net/skyux/1.12.0/css/sky-bundle.css',
            'css/sky/sky-bundle.css'
        ],
        page_css: 'css/app.css',

        // JS
        angular: [
            'https://sky.blackbaudcdn.net/skyux/1.12.0/js/sky-bundle.min.js',
            'js/sky/sky-bundle.min.js'
        ],

        BBUI_READY: 'js/bbui.min.js',
        EXAMPLE_READY: 'js/app.min.js'

    };

    shims = {
        'BBUI_READY': ['angular'],
        'EXAMPLE_READY': ['angular'],
        'page_css': ['sky_css']
    };

    locale = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);

    if (locale) {

        if (availableSkyLocales.indexOf(locale) >= 0) {

            filesToLoad.sky_locale = [
                "https://sky.blackbaudcdn.net/skyux/1.12.0/js/locales/sky-locale-" + locale + ".js",
                "js/sky/locales/sky-locale-" + locale + ".js"
            ];

            shims.sky_locale = 'angular';

        }

        if (availableExampleLocales.indexOf(locale) >= 0) {

            filesToLoad.example_locale = [
                "js/locales/example-locale-" + locale + ".js"
            ];

            shims.sky_locale = 'angular';

        }

    }

    fallback.load(filesToLoad, {
        shim: shims
    });

}());
