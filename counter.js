
/*jslint browser: true*/
/*global $, jQuery, alert, console */

$(document).ready(function () {
    'use strict';
    
    var journalCase, wg;
    
    journalCase = function (settings) {
        var container, email, post_data, process_registration, journal_id, issue;
        return {
            container: $('#journal_case'),

            construct_gallery: function (jsondata, container) {
                var outhtml = $('<div class="journal_counter"></div>'), show_iframe, keys = Object.keys(jsondata.issues), len = keys.length, i, k, a, b;
                show_iframe = function (url) {
                    //var iframe;
                    //iframe = $("<iframe width='850' height='500' frameborder='1' scrolling='yes' marginheight='0' marginwidth='0' src='" + url + "'></iframe>")
                    //container.empty();
                    //container.append(iframe);
                    //console.log(container);
                    window.location = url;
                };
                function compareNumeric(a, b) {
                    if (a < b) { return 1; }
                    if (a > b) { return -1; }
                }
                keys.sort(compareNumeric);
                console.log(keys);
                for (i = 0; i < len; i = i + 1) {
                    k = keys[i];
                    issue = $('<a href="' + jsondata.issues[k].buy_url + '"><img src="' + jsondata.issues[k].cover + '"/><p>' + jsondata.issues[k].name + '</p></a>');
                    
                    outhtml.append(issue);
                }
                
                //$.each(jsondata.issues, function (key, value) {
                    
               //     issue = $('<a href="#"><img src="' + value.cover + '"/><p>' + value.name + '</p></a>');
               //    issue.click(function () {
               //         show_iframe(value.buy_url);
                //    });
                //    outhtml.append(issue);
               // });
                
                return outhtml;
            },
            activate: function () {
                console.log('Activation');
                var construct_gallery = this.construct_gallery, container = this.container, htmlgallery = '', journal_id;
                journal_id = container.attr('data-journal-id');
                process_registration = function (data) {
                   
                    if (data.status === 1) {
                        alert(data.message);
                    } else {
                        // add journals counter
                        htmlgallery = construct_gallery(data, container);
                        container.empty();
                        container.append(htmlgallery);
                    }
                };
                this.container.append('<form><input name="email" value="test@test.com" type="email" /><button>Зарегистрироваться</button></form>');
                //add a click event to the button
                this.container.on('click', 'button', function (e) {
                    e.preventDefault();
                    email = $(e.target).prev().val();
                    post_data = {email: email, journal_id: journal_id};
                    $.ajax({
                        type: "POST",
                        context: container,
                        url: settings.url,
                        data: post_data,
                        success: process_registration
                    });
                });
            }
        };
    };
    
    wg = journalCase({
        url: "http://pressa.ru/zd/registration"
    });
    wg.activate();
});