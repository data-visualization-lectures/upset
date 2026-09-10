/**
 * JA/EN locale for UpSet.
 * Resolution matches DatavizJP tool headers:
 * URL(?lang= / /en/) > locale cookie > html lang > navigator.language
 */
(function (global) {
    'use strict';

    var COOKIE_NAME = 'locale';
    var COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

    function fromUrl() {
        try {
            var url = new URL(window.location.href);
            var langParam = (url.searchParams.get('lang') || '').toLowerCase();
            if (langParam === 'ja' || langParam === 'en') {
                return langParam;
            }
            if (url.pathname === '/en' || url.pathname.indexOf('/en/') === 0) {
                return 'en';
            }
        } catch (e) {
            // ignore
        }
        return null;
    }

    function fromCookie() {
        try {
            var raw = document.cookie
                .split(';')
                .map(function (c) { return c.trim(); })
                .filter(function (c) { return c.indexOf(COOKIE_NAME + '=') === 0; })[0];
            if (!raw) {
                return null;
            }
            var value = decodeURIComponent(raw.slice((COOKIE_NAME + '=').length)).toLowerCase();
            return (value === 'ja' || value === 'en') ? value : null;
        } catch (e) {
            return null;
        }
    }

    function resolveLocale() {
        if (global.DatavizLocale && typeof global.DatavizLocale.resolve === 'function') {
            var shared = global.DatavizLocale.resolve();
            if (shared === 'ja' || shared === 'en') {
                return shared;
            }
        }
        var urlLocale = fromUrl();
        if (urlLocale) {
            return urlLocale;
        }
        var cookieLocale = fromCookie();
        if (cookieLocale) {
            return cookieLocale;
        }
        var htmlLang = ((document.documentElement && document.documentElement.lang) || '').toLowerCase();
        if (htmlLang.indexOf('ja') === 0) {
            return 'ja';
        }
        if (htmlLang.indexOf('en') === 0) {
            return 'en';
        }
        var navLang = (navigator.language || navigator.userLanguage || 'ja').toLowerCase();
        return navLang.indexOf('ja') === 0 ? 'ja' : 'en';
    }

    var messages = {
        'page.title': { ja: 'UpSet', en: 'UpSet' },
        'header.title': { ja: 'UpSet - 集合の重なりを可視化', en: 'UpSet - Visualizing Intersecting Sets' },
        'header.upsetR': { ja: 'R版 UpSet', en: 'UpSet for R' },
        'header.about': { ja: 'UpSetについて', en: 'About UpSet' },
        'header.loadData': { ja: 'データを読み込む', en: 'Load Data' },
        'header.chooseDataset': { ja: 'データセットを選択', en: 'Choose Dataset' },
        'header.langJa': { ja: 'JA', en: 'JA' },
        'header.langEn': { ja: 'EN', en: 'EN' },

        'menu.customData': {
            ja: 'データを定義する<a href="https://github.com/VCG/upset/wiki/Data-Import">JSONファイル</a>を指定: ',
            en: 'Provide a <a href="https://github.com/VCG/upset/wiki/Data-Import">JSON file</a> defining your data: '
        },
        'menu.submit': { ja: '送信', en: 'Submit' },
        'menu.learnJson': { ja: 'JSONファイルの作り方', en: 'Learn how to create the JSON file' },

        'config.firstAggregate': { ja: 'まず集約', en: 'First, aggregate by' },
        'config.thenAggregate': { ja: 'さらに集約', en: 'Then, aggregate by' },
        'config.overlapDegree': { ja: '重なり次数:', en: 'overlap degree:' },
        'config.sortBy': { ja: '並べ替え', en: 'Sort by' },
        'config.degree': { ja: '次数', en: 'Degree' },
        'config.cardinality': { ja: '要素数', en: 'Cardinality' },
        'config.deviation': { ja: '偏差', en: 'Deviation' },
        'config.aggregates': { ja: '集約', en: 'Aggregates' },
        'config.collapseAll': { ja: 'すべて折りたたむ', en: 'Collapse All' },
        'config.expandAll': { ja: 'すべて展開', en: 'Expand All' },
        'config.rowHeight': { ja: '行の高さ', en: 'Row Height' },
        'config.large': { ja: '大', en: 'Large' },
        'config.medium': { ja: '中', en: 'Medium' },
        'config.small': { ja: '小', en: 'Small' },
        'config.data': { ja: 'データ', en: 'Data' },
        'config.minDegree': { ja: '最小次数:', en: 'Min Degree:' },
        'config.maxDegree': { ja: '最大次数:', en: 'Max Degree:' },
        'config.hideEmpty': { ja: '空の交差を隠す', en: 'Hide Empty Intersections' },
        'config.venn': { ja: 'ベン図', en: 'Venn Diagram' },
        'config.datasetInfo': { ja: 'データセット情報', en: 'Dataset Information' },
        'config.sets': { ja: '集合', en: 'Sets' },
        'config.overlaps': { ja: '重なり', en: "Overlaps" },
        'config.dontAggregate': { ja: '集約しない', en: "Don't Aggregate" },

        'element.visualizations': { ja: '要素の可視化', en: 'Element Visualizations' },
        'element.queries': { ja: '要素クエリ', en: 'Element Queries' },
        'element.queryFilters': { ja: 'クエリフィルタ', en: 'Query Filters' },
        'element.queryResults': { ja: 'クエリ結果', en: 'Query Results' },

        'dataset.meta': {
            ja: '{sets} 集合, {attrs} 属性',
            en: '{sets} sets, {attrs} attributes'
        },
        'dataset.loadError': { ja: 'データセットを読み込めませんでした。\nエラー: {error}', en: 'Could not load dataset. \n Error: {error}' },
        'dataset.name': { ja: '名前:', en: 'Name:' },
        'dataset.setCount': { ja: '集合数:', en: '# Sets:' },
        'dataset.attributeCount': { ja: '属性数:', en: '# Attributes:' },
        'dataset.elementCount': { ja: '要素数:', en: '# Elements:' },
        'dataset.author': { ja: '作者:', en: 'Author:' },
        'dataset.description': { ja: '説明:', en: 'Description:' },
        'dataset.source': { ja: '出典:', en: 'Source:' },
        'dataset.setCountAttr': { ja: '集合数', en: 'Set Count' },
        'dataset.setsAttr': { ja: '集合', en: 'Sets' },

        'set.selection': { ja: '集合の選択', en: 'Set Selection' },
        'set.batchAdd': { ja: '集合を一括追加', en: 'Batch Add Sets' },
        'set.sortSets': { ja: '集合を並べ替え', en: 'Sort Sets' },
        'set.addAll': { ja: 'すべて追加', en: 'Add All Sets' },
        'set.clearAll': { ja: 'すべて解除', en: 'Clear All Sets' },
        'set.cancel': { ja: 'キャンセル', en: 'Cancel' },
        'set.confirm': { ja: '確定', en: 'Confirm' },
        'set.bySize': { ja: 'サイズ順', en: 'by Size' },
        'set.byName': { ja: '名前順', en: 'by Name' },

        'query.label': { ja: 'クエリ', en: 'Query' },
        'query.groupLabel': { ja: 'グループ名:', en: 'Group label:' },
        'query.none': {
            ja: 'クエリがありません。<i class="fa fw fa-plus"></i> で追加できます。',
            en: 'No queries. Click <i class="fa fw fa-plus"></i> button to add a new query.'
        },
        'query.noActive': { ja: '有効なクエリはありません。', en: 'No active query.' },
        'filter.none': {
            ja: 'フィルタがありません。<i class="fa fw fa-plus"></i> で追加できます。',
            en: 'No filters configured. Click <i class="fa fw fa-plus"></i> button to add a new filter.'
        },
        'viewer.none': {
            ja: '可視化がありません。<i class="fa fw fa-plus"></i> で追加できます。',
            en: 'No visualizations configured. Click <i class="fa fw fa-plus"></i> button to add a new visualization.'
        },

        'group.degreeZero': { ja: '次数 0（どの集合にも属さない）', en: 'Degree 0 (in no set)' },
        'group.degreeN': { ja: '次数 {n}（{n} 集合の交差）', en: 'Degree {n} ({n} set intersect.)' },
        'group.noSet': { ja: '集合なし', en: 'No Set' },
        'group.positiveExpected': { ja: '期待値より多い', en: 'Positive Expected Value' },
        'group.negativeExpected': { ja: '期待値より少ない', en: 'Negative Expected Value' },
        'group.asExpected': { ja: '期待どおり', en: 'As Expected' },

        'chart.cardinality': { ja: '要素数', en: 'Cardinality' },
        'chart.largestIntersection': { ja: '最大の交差', en: 'largest intersection' },
        'chart.largestAggregate': { ja: '最大の集約', en: 'largest aggregate' },
        'chart.largestSet': { ja: '最大の集合', en: 'largest set' },
        'chart.universalSet': { ja: '全体集合', en: 'universal set' },
        'chart.largestGroup': { ja: '最大のグループ', en: 'largest group' },
        'chart.allItems': { ja: 'すべての要素', en: 'all items' },
        'chart.deviation': { ja: '偏差', en: 'Deviation' },
        'chart.frequency': { ja: '頻度', en: 'Frequency' },
        'chart.probability': { ja: '確率', en: 'Probability' },
        'chart.refAllele': { ja: '参照アレル', en: 'Ref Allele' },
        'chart.altAllele': { ja: '代替アレル', en: 'Alt Allele' },

        'filter.subset': { ja: '部分集合', en: 'Subset' },
        'filter.contains': { ja: '含む', en: 'Contains' },
        'filter.stringLength': { ja: '文字列長', en: 'String Length' },
        'filter.regex': { ja: '正規表現', en: 'Regular Expression' },
        'filter.range': { ja: '範囲', en: 'Range' },
        'filter.minimum': { ja: '最小', en: 'Minimum' },
        'filter.maximum': { ja: '最大', en: 'Maximum' },
        'filter.string': { ja: '文字列', en: 'String' },
        'filter.length': { ja: '長さ', en: 'Length' },
        'filter.pattern': { ja: 'パターン', en: 'Pattern' },

        'viewer.scatterplot': { ja: '散布図', en: 'Scatterplot' },
        'viewer.histogram': { ja: 'ヒストグラム', en: 'Histogram' },
        'viewer.wordCloud': { ja: 'ワードクラウド', en: 'Word Cloud' },
        'viewer.variantFrequency': { ja: '遷移/転換比', en: 'Transition/Transversion Ratio' },
        'viewer.variable': { ja: '変数', en: 'Variable' },
        'viewer.bins': { ja: 'ビン', en: 'Bins' },
        'viewer.frequency': { ja: '頻度?', en: 'Frequency?' },
        'viewer.onlyActive': { ja: '選択中のみ?', en: 'Only active?' },
        'viewer.text': { ja: 'テキスト', en: 'Text' },
        'viewer.logScaleX': { ja: 'Xを対数軸', en: 'Log Scale X' },
        'viewer.logScaleY': { ja: 'Yを対数軸', en: 'Log Scale Y' },
        'viewer.referenceAllele': { ja: '参照アレル', en: 'Reference Allele' },
        'viewer.alternativeAllele': { ja: '代替アレル', en: 'Alternative Allele' },
        'viewer.showMatrix': { ja: '行列を表示', en: 'Show Matrix' }
    };

    var locale = resolveLocale();

    function interpolate(template, vars) {
        if (!vars) {
            return template;
        }
        return String(template).replace(/\{(\w+)\}/g, function (match, key) {
            return Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : match;
        });
    }

    function t(key, vars) {
        var entry = messages[key];
        var template = (entry && (entry[locale] || entry.en)) || key;
        return interpolate(template, vars);
    }

    function applyStatic() {
        var nodes = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].textContent = t(nodes[i].getAttribute('data-i18n'));
        }
        var htmlNodes = document.querySelectorAll('[data-i18n-html]');
        for (var j = 0; j < htmlNodes.length; j++) {
            htmlNodes[j].innerHTML = t(htmlNodes[j].getAttribute('data-i18n-html'));
        }
        var valueNodes = document.querySelectorAll('[data-i18n-value]');
        for (var k = 0; k < valueNodes.length; k++) {
            valueNodes[k].value = t(valueNodes[k].getAttribute('data-i18n-value'));
        }
        var title = t('page.title');
        document.title = title;
        var titleEl = document.getElementById('page-title');
        if (titleEl) {
            titleEl.textContent = title;
        }
    }

    function writeCookie(lang) {
        document.cookie = COOKIE_NAME + '=' + encodeURIComponent(lang) + '; path=/; max-age=' + COOKIE_MAX_AGE;
    }

    function setLocale(lang) {
        if (lang !== 'ja' && lang !== 'en') {
            return;
        }
        writeCookie(lang);
        try {
            var url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            window.location.href = url.toString();
        } catch (e) {
            window.location.search = 'lang=' + lang;
        }
    }

    function syncSwitcher() {
        var root = document.getElementById('lang-switcher');
        if (!root) {
            return;
        }
        var buttons = root.querySelectorAll('[data-set-lang]');
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            var active = button.getAttribute('data-set-lang') === locale;
            button.className = active ? 'lang-switcher-btn is-active' : 'lang-switcher-btn';
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
        }
    }

    function initSwitcher() {
        var root = document.getElementById('lang-switcher');
        if (!root || root.getAttribute('data-bound') === 'true') {
            return;
        }
        root.setAttribute('data-bound', 'true');
        root.addEventListener('click', function (event) {
            var target = event.target;
            while (target && target !== root) {
                var lang = target.getAttribute && target.getAttribute('data-set-lang');
                if (lang) {
                    event.preventDefault();
                    if (lang !== locale) {
                        setLocale(lang);
                    }
                    return;
                }
                target = target.parentNode;
            }
        });
        syncSwitcher();
    }

    document.documentElement.lang = locale;

    function boot() {
        applyStatic();
        initSwitcher();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    global.t = t;
    global.UpsetI18n = {
        t: t,
        locale: locale,
        resolve: resolveLocale,
        setLocale: setLocale,
        applyStatic: applyStatic,
        isJa: locale === 'ja'
    };
    if (!global.DatavizLocale) {
        global.DatavizLocale = {
            resolve: resolveLocale
        };
    }
})(window);
