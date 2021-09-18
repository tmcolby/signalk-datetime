/*
 * Copyright 2021 tyson colby <tyson.colby@innotech.engineering>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const shell = require('shelljs');

module.exports = function(app) {
    let plugin = {};

    plugin.id = 'signalk-datetime';
    plugin.name = 'Datetime';
    plugin.description = 'Map output of Linux "date" command to SignalK path';

    plugin.schema = {
        type: 'object',
        properties: {
            path: {
                type: 'string',
                title: 'SignalK path',
                default: 'environment.time'
            },
            format: {
                type: 'string',
                title: 'Format options',
                description: 'Can accept magic value "null" to output default format like "Wed 15 Sep 2021 08:17:10 AM PDT"',
                default: '+%H:%M:%S'
            },
            rate: {
                type: 'number',
                title: "Update rate (seconds)",
                default: 1,
            }

        }
    };

    const error = (err) => {
        app.error(err);
        app.setPluginError(err);
    }

    plugin.start = function(options) {
        app.streambundle.getSelfStream("navigation.datetime").forEach((datetime) => {
            app.handleMessage(plugin.id, {
                updates: [{
                    values: [{
                        path: options.path,
                        value: datetime
                    }]
                }]
            });
        });

        // function update() {
        //     shell.exec('date ' + (options.format === "null" ? '' : options.format), {
        //         silent: true
        //     }, (exitCode, stdout) => {
        //         if (exitCode) {
        //             error(`date command failed with exit code ${exitCode}`);
        //         } else {
        //             app.handleMessage(plugin.id, {
        //                 updates: [{
        //                     values: [{
        //                         path: options.path,
        //                         value: stdout.replace('\n', '')
        //                     }]
        //                 }]
        //             });

        //         }
        //     });
        // }

        // if (process.platform == "win32") {
        //     error("signalk-datetime plugin only works on linux-like os's");
        // } else {
        //     // initialize with some data immediately when the plugin starts
        //     update();
        //     // update path once per second
        //     timer = setInterval(update, options.rate * 1000);
        // }
    }

    plugin.stop = function() {
        if (timer) {
            clearInterval(timer);
            timeout = null;
        }
    }

    return plugin;
}