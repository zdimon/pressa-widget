
/*jslint browser: true*/
/*global $, jQuery, alert, console */

$(document).ready(function () {
    'use strict';
   
    var journalCase, wg, city = 'sssss';
    const dd =23;
    journalCase = function (settings) {
        var container, process_vitrina;
        return {
            container: $('#journal_case'),

           
            activate: function () {
                console.log('Activation');
                var container = this.container;
                process_vitrina = function (data) {
                    var keys = Object.keys(data.items), len = keys.length, i, k, v, a, b, issue, page, outhtml = $('<div class="journal_counter"></div>'), form, number, name, src, pager;
                    console.log(container);
                    container.empty();
                    function compareNumeric(a, b) {
                        if (a < b) { return 1; }
                        if (a > b) { return -1; }
                    }
                    keys.sort(compareNumeric);
                    
                    for (i = 0; i < len; i = i + 1) {
                        k = keys[i];
                        if (data.items[k].vit_active === 'vit_active') {
                            issue = $('<div class="vit_item_big ' + data.items[k].vit_active + '"><div class="vit_wrap"><div class="vit_label">СВЕЖИЙ ВЫПУСК</div><img src="' + data.items[k].big_cover + '"/></div><div class="vit_clear"></div><p></p><p class="vit_date" style="padding-left: 10px; padding-right: 30px;">' + data.items[k].date_release + '</p><p class="vit_price" style="padding-top: 5px;">' + data.items[k].amount + ' Р</p><a href="#" class="vit_button" data-id="' + k + '" data-src="' + data.items[k].big_cover + '" data-name="' + data.items[k].date_release + '">Купить</a></div>');
                        } else {
                            issue = $('<div class="vit_item"><img src="' + data.items[k].cover + '"/><p class="vit_date">' + data.items[k].date_release + '</p><div class="vit_clear"></div><p class="vit_price">' + data.items[k].amount + ' Р</p><a href="#" class="vit_button"  data-src="' + data.items[k].big_cover + '"  data-id="' + k + '" data-name="' + data.items[k].date_release + '">Купить</a></div>');
                        }
                        

                        outhtml.append(issue);
                    }
                    pager = $('<div class="vit_pager"></div>');
                    keys = Object.keys(data.pager);
                    
                    if (data.has_previous === true) {
                        page = $('<a href="#" class="vit_page" data-id="' + data.page_prev + '">Назад</a>');
                        pager.append(page);
                    }
                    
                    
                    $.each(data.pager, function (k, v) {
                        if (v === parseInt(data.page)) {
                            page = $('<a href="#" class="vit_page active" data-id="' + v + '">' + v + '</a>');
                        } else {
                            page = $('<a href="#"  class="vit_page" data-id="' + v + '">' + v + '</a>');
                        }
                       
                        pager.append(page);
                    });
                    
                    if (data.is_next === true) {
                        page = $('<a class="vit_page" data-id="' + data.page_next + '" href="#">Вперед</a>');
                        pager.append(page);
                    }
                    
                    //<a href="#">Назад</a> <a href="#">Вперед</a>
                    outhtml.append(pager);
                    
                    outhtml.find('.vit_page').click(function (e) {
                        e.preventDefault();
                        $.ajax({
                            type: "GET",
                            context: container,
                            url: settings.url + '/' + container.attr('data-journal-id') + '/' + $(e.target).attr('data-id'),
                            success: process_vitrina
                        });
                    });
                    
                    container.append(outhtml);
                    container.find("a.vit_button").click(function () {
                        
                        number = $(this).attr("data-id");
                        name = $(this).attr("data-name");
                        src = $(this).attr("data-src");
                        container.empty();
                        form = $('<div class="vit_preorder"><div class="vit_img"><img src="' + src + '" /></div><form><p class="vit_title">Вы выбрали номер </p> <p class="vit_title" >от <strong>' + name + '</strong> </p> <p class="vit_form">Введите ваш email </p><input type="hidden" id="vt_issue" value="' + number + '" /> <input id="vt_email" name="email"  type="email" /><p><button>Купить</button></p></form> <p class="vit_title">Подписка</p> <select id="vit_sub_select" name="sub"><option value="1">1 месяц (330 р.)</option><option value="3">3 месяца (900 р.)</option><option value="6">6 месяцев (1666 р.)</option><option value="12">12 месяцев (3333 р.)</option></select><a href="#" id="vit_sub">Подписаться</a><div class="vit_clear"></div></div>');
                        
                        container.append(form);
                        container.find('button').click(function (e) {
                            e.preventDefault();
                            var post_data = { email: $('#vt_email').val(), issue: $('#vt_issue').val()};
                            console.log($('#vt_email').val());
                            
                            $.ajax({
                                type: "POST",
                                context: container,
                                url: settings.url_buy,
                                data: post_data,
                                success: function (data) {
                                    if (data.status === 1) {
                                        alert(data.message);
                                    } else {
                                       
                                        window.location = data.url;
                                    }
                                }
                            });
                            
                        });
                        
                        container.find("#vit_sub").click(function () {
                            var post_data = { email: $('#vt_email').val(), issue: $('#vt_issue').val(), subscribe: $('#vit_sub_select').val()};
                            console.log(post_data);
                            $.ajax({
                                type: "POST",
                                url: settings.url_buy,
                                data: post_data,
                                success: function (data) {
                                    if (data.status === 1) {
                                        alert(data.message);
                                    } else {
                                       
                                        window.location = data.url;
                                    }
                                }
                            });
                        });                        
                        
                        
                        
                    });
                    

                    
                };
                
                $.ajax({
                    type: "GET",
                    context: container,
                    url: settings.url + '/' + container.attr('data-journal-id') + '/1',
                    success: process_vitrina
                });
            }
        };
    };
    
    wg = journalCase({
        url: "http://pressa.ru/zd/vitrina",
        url_buy: "http://pressa.ru/zd/buy"
    });
    wg.activate();
});