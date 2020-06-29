;(function (window, mupiao) {
    "use strict";

    if (typeof define === 'function' && define.amd) {
        define(mupiao);
    } else if (typeof exports === 'object') {
        module.exports = mupiao();
    } else {
        window.mupiao = mupiao();
    };

}(typeof window !== "undefined" ? window : this, function (window) {
    "use strict";

    var Calendar = function (elem, opts) {

        this.config = {
            elem: elem || body,
            startYear: opts.startYear || this.date.getFullYear(),
            startMonth: opts.startMonth || this.date.getMonth() + 1,
            mmNum: opts.mmNum || 12,
            range: opts.range || '~',
            valiDate: opts.valiDate || [],
            valiName: opts.valiName || '不可选',
            callBack: opts.callBack || null,
           
        };

        this.num = 0;

        this.date = new Date();

        this.year = this.date.getFullYear();

        this.month = this.date.getMonth() + 1;

        this.day = this.date.getDate() < 10 ? '0' + this.date.getDate() : this.date.getDate();

        this.week = ['日', '一', '二', '三', '四', '五', '六'];

        this.init();

    };

    var mupiao = function (elem, opts) {
        return new Calendar(elem, opts);
    };

    Calendar.prototype = {

        init: function () {
            var dom = '', cfg = this.config;
            for (var i = 0; i < cfg.mmNum; i++) {
                dom += this.createCalendar(i);
                if (12 <= cfg.startMonth) {
                    cfg.startYear++;
                    cfg.startMonth = 1;
                } else {
                    cfg.startMonth++;
                } 
            };

            document.querySelector(`${cfg.elem}`).innerHTML = '<table class="mupiao-table">' + dom + '</table>';

            var $oldid = NaN, $oldval = '';

            $(document.body).on('click', cfg.elem + ' a.clk', function () {
                var $this = $(this), 
                    $alla = $(cfg.elem + ' a'),
                    $newid = Number($this.attr('id').replace(/opt-id-/g, '')),
                    $newval = $this.attr('data-date');

                if (2 > $(cfg.elem + ' a.act').length) {
                    var big = 0, few = 0;
                    if ($newid > $oldid) {
                        big = $newid;
                        few = $oldid + 1;
                        cfg.callBack && cfg.callBack($oldval+ cfg.range + $newval);
                    } else {
                        big = $oldid;
                        few = $newid + 1;
                        cfg.callBack && cfg.callBack($newval + cfg.range + $oldval);
                    }
                    for (few; few < big; few++) {
                        if ($('#opt-id-' + few).hasClass('not')) {
                            $oldid = NaN;
                            $alla.removeClass('act').removeClass('con');
                            cfg.callBack && cfg.callBack($newval + cfg.range);
                            break;
                        }
                        $('#opt-id-' + few).addClass('con');
                    };
                    $oldid = $newid;
                    $oldval = $newval;
                } else {
                    $oldid = $newid;
                    $oldval = $newval;
                    $alla.removeClass('act').removeClass('con');
                    cfg.callBack && cfg.callBack($newval + cfg.range );
                };
                $this.addClass('act');
            });
        },

        getFestival: function (yyyy, mm, dd) {
            mm = mm - 1;
            var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758),
                solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"),
                tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5)),
                tmp2 = tmp1.getUTCDate(),
                solarTerms = "";
            if (tmp2 == dd) solarTerms = solarTerm[mm * 2 + 1];
            tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
            tmp2 = tmp1.getUTCDate();
            if (tmp2 == dd) solarTerms = solarTerm[mm * 2];
            return solarTerms;
        },

        getMonths: function (yyyy, mm) {
            if (true) {
                return new Date(yyyy, mm, 0).getDate();
            } else if (false) {
                if (mm == 4 || mm == 6 || mm == 9 || mm == 11) return 30;
                if (mm == 2) return (yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0 ? 29 : 28;
                return 31;
            } else {
                var num = 31, isLeap = (yyyy % 100 !== 0 && yyyy % 4 === 0) || (yyyy % 400 === 0);
                switch (parseInt(mm)) {
                    case 2: num = isLeap ? 29 : 28; break;
                    case 4: case 6: case 9: case 11: num = 30; break;
                }
                return num;
            }
        },

        isValiDate: function (v) {
            if (0 < this.config.valiDate.length) {
                var o = this.config.valiDate, v = Number(v.replace(/-/g, ''));
                for (var i = 0, len = o.length; i < len; i++) {
                    if (v >= o[i].start_time && v <= o[i].end_time) return 1;
                };
            }
        },

        isCurrentDay: function (yyyy, mm, dd) {
            return ((yyyy == this.year) && (mm == this.month) && (dd == this.day)) ? '<b class="now">今天' : '<b>' + dd;
        },

        calculateDay: function (yyyy, mm) {
            var sum = 0,
                arr = [],
                day = new Date(yyyy, mm, 1),
                prev = day.getDay();

            if (0 == prev) prev = 7;
            for (var i = 0; i < prev; i++) {
                sum++;
                arr[arr.length] = '1' + new Date(day - 24 * 3600 * 1000 * (prev - i)).getDate();
            }

            mm++;
            if (mm == 13) mm = 1, yyyy++;
            var current = this.getMonths(yyyy, mm);
            for (var i = 1; i <= current; i++) {
                i = (i < 10) ? '0' + i : i;
                arr[arr.length] = '2' + i;
            }

            sum += current;
            var next = new Date(yyyy, mm - 1, current).getDay();
            next = 7 - next;
            if (sum < 36) next += 7;
            for (var i = 1; i < next; i++) {
                i = (i < 10) ? '0' + i : i;
                arr[arr.length] = '3' + i;
            };

            return arr;
        },

        createCalendar: function (num) {
            var yyyy = this.config.startYear,
                mm = this.config.startMonth,
                day = this.calculateDay(yyyy, mm - 1),
                mon = mm < 10 ? '0' + mm : mm,
                dom = '<tbody><tr><th class="th" colspan="7">' + yyyy + '年 ' + mon + '月</th></tr>';

            for (var i = 0; i < this.week.length; i++) {
                if (0 == i % 7) dom += '<tr>';
                dom += '<th>' + this.week[i] + '</th>';
                if (6 == i % 7) dom += '</tr>';
            };
            
            for (var i = 0; i < day.length; i++) {
                this.num++;
                var d2d = day[i].charAt(0),
                    dss = day[i].substring(1),
                    ymd = yyyy + '-' + mon + '-' + dss,
                    css = (2 != d2d) ? 'c-gray' : (0 == num) && (dss < this.day) ? 'c-gray' : (0 == i % 7 || 6 == i % 7) ? 'c-gren' : '';
                if (0 == i % 7) dom += '<tr>';
                dom += '<td><a ';

                if (2 == d2d) dom += 'id="opt-id-' + this.num + '" href="javascript:void(0);" data-date="' + ymd + '"';

                dom += ' class="';
                if (2 == d2d && 1 === this.isValiDate(ymd)) {
                    dom += (0 == num) && (dss < this.day) ? 'c-gray"><b>' : 'not">';
                    dom += this.isCurrentDay(yyyy, mm, dss);
                    dom += '</b><p>' + this.config.valiName + '</p>';
                } else {
                    if (2 == d2d && (0 < num || dss >= this.day)) dom += 'clk ';
                    dom += css + '">';
                    dom += this.isCurrentDay(yyyy, mm, dss);
                    dom += '</b><p>';
                    if (2 == d2d && this.getFestival(yyyy, mon, dss)) dom += this.getFestival(yyyy, mon, dss);
                    dom += '</p>';
                }
                dom += '</a></td>';
                if (6 == i % 7) dom += '</tr>';
            };
            dom += '</tbody>';
            return dom;
        }
    };
    return mupiao;
}));

