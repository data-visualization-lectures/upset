/**
 * DatavizJP tool-header bridge: save / load / sample for UpSet.
 * Project payload stores the dataset pointer and view state, not the item dump.
 */
(function (global) {
    'use strict';

    var APP_NAME = 'upset';
    var currentProjectId = null;
    var lastLoadedName = '';
    var pendingRestore = null;
    var restoreBound = false;

    function isJa() {
        if (global.UpsetI18n && typeof global.UpsetI18n.isJa === 'boolean') {
            return global.UpsetI18n.isJa;
        }
        if (global.DatavizLocale && typeof global.DatavizLocale.resolve === 'function') {
            return global.DatavizLocale.resolve() === 'ja';
        }
        return /^ja\b/i.test(navigator.language || '');
    }

    function msg(key) {
        var ja = {
            load: 'プロジェクトの読込',
            save: 'プロジェクトの保存',
            sample: 'サンプル',
            noData: 'データが読み込まれていません',
            savePrep: '保存準備中です',
            sampleLoading: 'サンプルデータを読み込み中です',
            sampleInvalid: 'UpSet は集合定義の JSON（sets / meta）が必要です。CSV 単体は読み込めません。',
            restoreFailed: 'プロジェクトの復元に失敗しました'
        };
        var en = {
            load: 'Load Project',
            save: 'Save Project',
            sample: 'Sample',
            noData: 'No dataset is loaded',
            savePrep: 'Preparing save...',
            sampleLoading: 'Loading sample data...',
            sampleInvalid: 'UpSet needs a set-descriptor JSON (sets / meta). A CSV file alone cannot be loaded.',
            restoreFailed: 'Could not restore the project'
        };
        return (isJa() ? ja : en)[key] || key;
    }

    function toolHeader() {
        return document.querySelector('dataviz-tool-header');
    }

    function showHeaderMessage(text, type) {
        var header = toolHeader();
        if (header && typeof header.showMessage === 'function') {
            header.showMessage(text, type || 'info');
        }
    }

    function currentDataset() {
        var index = parseInt(queryParameters && queryParameters.dataset, 10);
        if (isNaN(index) || index < 0) {
            index = 0;
        }
        return dataSetDescriptions && dataSetDescriptions[index];
    }

    function datasetSourceUrl(description) {
        if (!description) {
            return null;
        }
        if (description._sourceUrl) {
            return description._sourceUrl;
        }
        if (description.file && /^https?:/i.test(description.file)) {
            return description.file;
        }
        return null;
    }

    function findDatasetIndex(matcher) {
        if (!dataSetDescriptions) {
            return -1;
        }
        for (var i = 0; i < dataSetDescriptions.length; i++) {
            if (matcher(dataSetDescriptions[i], i)) {
                return i;
            }
        }
        return -1;
    }

    function pathnameOf(url) {
        try {
            return new URL(url, window.location.href).pathname;
        } catch (e) {
            return String(url || '');
        }
    }

    function isUpsetDescriptor(obj) {
        return !!(obj && typeof obj === 'object' && !Array.isArray(obj) && obj.sets && obj.meta);
    }

    function selectDataset(index) {
        queryParameters.dataset = index;
        populateDSSelector();
        var selector = document.getElementById('header-ds-selector');
        if (selector) {
            selector.value = String(index);
        }
        changeDataset();
    }

    function loadDescriptorObject(descriptor, sourceUrl) {
        if (sourceUrl) {
            descriptor._sourceUrl = sourceUrl;
        }
        var existing = findDatasetIndex(function (d) {
            if (sourceUrl && d._sourceUrl === sourceUrl) {
                return true;
            }
            if (descriptor.name && d.name === descriptor.name && d.file === descriptor.file) {
                return true;
            }
            return false;
        });
        if (existing >= 0) {
            selectDataset(existing);
            return;
        }
        dataSetDescriptions.push(descriptor);
        selectDataset(dataSetDescriptions.length - 1);
    }

    function loadDescriptorUrl(url) {
        var path = pathnameOf(url);
        var bundled = findDatasetIndex(function (d) {
            if (d._sourceUrl && pathnameOf(d._sourceUrl) === path) {
                return true;
            }
            if (d.file && path.indexOf(d.file.replace(/\.[^.]+$/, '')) !== -1) {
                return true;
            }
            if (d.file && path.replace(/\.[^.]+$/, '') === pathnameOf(d.file).replace(/\.[^.]+$/, '')) {
                return true;
            }
            return false;
        });
        if (bundled >= 0 && path.indexOf('/data/') !== -1) {
            selectDataset(bundled);
            return;
        }
        $.ajax({ url: url, dataType: 'json' }).then(function (result) {
            if (!isUpsetDescriptor(result)) {
                showHeaderMessage(msg('sampleInvalid'), 'error');
                pendingRestore = null;
                return;
            }
            loadDescriptorObject(result, url);
        }, function () {
            showHeaderMessage(msg('sampleInvalid'), 'error');
            pendingRestore = null;
        });
    }

    function syncViewControls(state) {
        if (!state) {
            return;
        }
        var groupingKey = state.grouping || 'dont';
        var l1 = document.getElementById('firstLevelGroupingSelect');
        if (l1 && groupingKey) {
            l1.value = groupingKey;
            if (typeof l1.dispatchEvent === 'function') {
                var change = document.createEvent('HTMLEvents');
                change.initEvent('change', true, true);
                l1.dispatchEvent(change);
            }
        }
        var l2 = document.getElementById('secondLevelGroupingSelect');
        if (l2 && state.levelTwoGrouping) {
            l2.value = state.levelTwoGrouping;
            if (typeof l2.dispatchEvent === 'function') {
                var change2 = document.createEvent('HTMLEvents');
                change2.initEvent('change', true, true);
                l2.dispatchEvent(change2);
            }
        } else if (l2 && !state.levelTwoGrouping) {
            l2.value = 'dont';
        }

        var sortMap = {
            sortByCombinationSize: 'sortNrSetsInIntersection',
            sortBySubSetSize: 'sortIntersectionSize',
            sortByExpectedValue: 'sortRelevanceMeasure'
        };
        var sortId = sortMap[state.sorting];
        if (sortId && document.getElementById(sortId)) {
            document.getElementById(sortId).checked = true;
        }

        var hide = document.getElementById('hideEmpties');
        if (hide && typeof state.hideEmpties === 'boolean') {
            hide.checked = state.hideEmpties;
        }
        var minCard = document.getElementById('minCardinality');
        if (minCard && state.minCardinality != null) {
            minCard.value = state.minCardinality;
        }
        var maxCard = document.getElementById('maxCardinality');
        if (maxCard && state.maxCardinality != null) {
            maxCard.value = state.maxCardinality;
        }
        var degree1 = document.getElementById('firstLevelMinCardinalityInput');
        if (degree1 && state.levelOneDegree != null) {
            degree1.value = state.levelOneDegree;
        }
        var degree2 = document.getElementById('secondLevelMinCardinalityInput');
        if (degree2 && state.levelTwoDegree != null) {
            degree2.value = state.levelTwoDegree;
        }
        var rowSize = document.getElementById('rowSizeValue');
        if (rowSize && state.cellDistance != null) {
            rowSize.value = String(state.cellDistance);
            ctx.cellDistance = state.cellDistance;
        }
    }

    function applyViewState(state) {
        if (!state) {
            return;
        }
        if (state.usedSetNames && state.usedSetNames.length && typeof applyUsedSetNames === 'function') {
            applyUsedSetNames(state.usedSetNames);
        }
        UpSetState.grouping = state.grouping;
        UpSetState.levelTwoGrouping = state.levelTwoGrouping;
        if (state.sorting) {
            UpSetState.sorting = state.sorting;
        }
        if (typeof state.hideEmpties === 'boolean') {
            UpSetState.hideEmpties = state.hideEmpties;
        }
        if (state.minCardinality != null) {
            UpSetState.minCardinality = state.minCardinality;
        }
        if (state.maxCardinality != null) {
            UpSetState.maxCardinality = state.maxCardinality;
        }
        if (state.levelOneDegree != null) {
            UpSetState.levelOneDegree = state.levelOneDegree;
        }
        if (state.levelTwoDegree != null) {
            UpSetState.levelTwoDegree = state.levelTwoDegree;
        }
        syncViewControls(state);
        previousState = undefined;
        UpSetState.forceUpdate = true;
        updateState();
        if (typeof plot === 'function') {
            plot();
        }
        if (typeof plotSetOverview === 'function') {
            plotSetOverview();
        }
    }

    function currentUsedSetNames() {
        if (!usedSets || !usedSets.length) {
            return [];
        }
        return usedSets.map(function (set) {
            return set.elementName;
        });
    }

    function getProjectData() {
        var description = currentDataset();
        return {
            version: 1,
            chartType: APP_NAME,
            datasetIndex: parseInt(queryParameters.dataset, 10) || 0,
            datasetName: description && description.name ? description.name : lastLoadedName,
            datasetUrl: datasetSourceUrl(description),
            datasetFile: description && description.file ? description.file : null,
            usedSetNames: currentUsedSetNames(),
            grouping: UpSetState.grouping,
            levelTwoGrouping: UpSetState.levelTwoGrouping,
            sorting: UpSetState.sorting,
            hideEmpties: UpSetState.hideEmpties,
            minCardinality: UpSetState.minCardinality,
            maxCardinality: UpSetState.maxCardinality,
            levelOneDegree: UpSetState.levelOneDegree,
            levelTwoDegree: UpSetState.levelTwoDegree,
            cellDistance: ctx && ctx.cellDistance
        };
    }

    function svgToImage(svgEl, callback) {
        if (!svgEl) {
            callback(null);
            return;
        }
        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svgEl);
        if (source.indexOf('xmlns') === -1) {
            source = source.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        var blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var img = new Image();
        img.onload = function () {
            URL.revokeObjectURL(url);
            callback(img);
        };
        img.onerror = function () {
            URL.revokeObjectURL(url);
            callback(null);
        };
        img.src = url;
    }

    function generateThumbnail(callback) {
        var headerSvg = document.querySelector('#headerVis svg');
        var bodySvg = document.querySelector('#bodyVis svg');
        if (!headerSvg && !bodySvg) {
            callback(null);
            return;
        }
        svgToImage(headerSvg, function (headerImg) {
            svgToImage(bodySvg, function (bodyImg) {
                var width = Math.max(
                    headerImg ? headerImg.width : 0,
                    bodyImg ? bodyImg.width : 0,
                    640
                );
                var height = (headerImg ? headerImg.height : 0) + (bodyImg ? bodyImg.height : 0);
                if (!height) {
                    callback(null);
                    return;
                }
                var maxWidth = 960;
                var scale = width > maxWidth ? maxWidth / width : 1;
                var canvas = document.createElement('canvas');
                canvas.width = Math.max(1, Math.round(width * scale));
                canvas.height = Math.max(1, Math.round(height * scale));
                var g = canvas.getContext('2d');
                g.fillStyle = '#ffffff';
                g.fillRect(0, 0, canvas.width, canvas.height);
                g.scale(scale, scale);
                var y = 0;
                if (headerImg) {
                    g.drawImage(headerImg, 0, y);
                    y += headerImg.height;
                }
                if (bodyImg) {
                    g.drawImage(bodyImg, 0, y);
                }
                try {
                    callback(canvas.toDataURL('image/png'));
                } catch (e) {
                    callback(null);
                }
            });
        });
    }

    function buildSavePayload() {
        if (!currentDataset()) {
            return Promise.resolve(null);
        }
        lastLoadedName = (currentDataset() && currentDataset().name) || lastLoadedName;
        return new Promise(function (resolve) {
            generateThumbnail(function (thumbnailDataUri) {
                resolve({
                    name: lastLoadedName || APP_NAME,
                    data: getProjectData(),
                    thumbnailDataUri: thumbnailDataUri,
                    existingProjectId: currentProjectId
                });
            });
        });
    }

    function restoreProject(projectData) {
        var state = projectData;
        if (state && state.data && (state.data.chartType === APP_NAME || state.data.usedSetNames || state.data.datasetName)) {
            state = state.data;
        }
        if (!state) {
            showHeaderMessage(msg('restoreFailed'), 'error');
            return;
        }
        lastLoadedName = state.datasetName || lastLoadedName;
        pendingRestore = state;

        if (state.datasetUrl) {
            loadDescriptorUrl(state.datasetUrl);
            return;
        }

        var byName = state.datasetName
            ? findDatasetIndex(function (d) { return d.name === state.datasetName; })
            : -1;
        var byFile = state.datasetFile
            ? findDatasetIndex(function (d) { return d.file === state.datasetFile; })
            : -1;
        var index = byName >= 0 ? byName : (byFile >= 0 ? byFile : state.datasetIndex);
        if (index == null || index < 0 || index >= dataSetDescriptions.length) {
            index = 0;
        }
        selectDataset(index);
    }

    function whenHeaderReady(callback) {
        var el = toolHeader();
        if (!el) {
            return;
        }
        if (window.customElements && typeof customElements.whenDefined === 'function') {
            if (customElements.get('dataviz-tool-header')) {
                callback(el);
                return;
            }
            customElements.whenDefined('dataviz-tool-header').then(function () {
                callback(el);
            });
            return;
        }
        callback(el);
    }

    function setupHeader(header) {
        header.setSampleConfig({
            toolId: APP_NAME,
            onSampleSelect: function (detail) {
                showHeaderMessage(msg('sampleLoading'), 'info');
                lastLoadedName = detail.name || lastLoadedName;
                var url = detail.url;
                var format = (detail.format || '').toLowerCase();
                if (format && format !== 'json') {
                    showHeaderMessage(msg('sampleInvalid'), 'error');
                    return;
                }
                loadDescriptorUrl(url);
            }
        });

        header.setConfig({
            logo: { type: 'text', text: 'UpSet' },
            buttons: [
                {
                    label: msg('sample'),
                    action: function () {
                        if (typeof header._openSamplePicker === 'function') {
                            header._openSamplePicker();
                        }
                    }
                },
                {
                    label: msg('load'),
                    action: function () { header.showLoadModal(); },
                    align: 'right'
                },
                {
                    label: msg('save'),
                    action: function () {
                        showHeaderMessage(msg('savePrep'), 'info');
                        buildSavePayload().then(function (payload) {
                            if (!payload || !payload.data) {
                                header.showMessage(msg('noData'), 'error');
                                return;
                            }
                            header.showSaveModal(payload);
                        });
                    },
                    align: 'right'
                }
            ]
        });

        if (header.shadowRoot) {
            var injected = header.shadowRoot.getElementById('dv-sample-btn');
            if (injected && injected.parentNode) {
                injected.parentNode.removeChild(injected);
            }
        }

        header.setProjectConfig({
            appName: APP_NAME,
            onProjectLoad: function (projectData, meta) {
                if (meta && meta.isGroupProject) {
                    currentProjectId = null;
                } else if (meta && meta.projectId) {
                    currentProjectId = meta.projectId;
                    if (meta.projectName) {
                        lastLoadedName = meta.projectName;
                    }
                }
                restoreProject(projectData);
            },
            onProjectSave: function (meta) {
                currentProjectId = meta.id;
                lastLoadedName = meta.name;
            },
            onProjectDelete: function (projectId) {
                if (currentProjectId === projectId) {
                    currentProjectId = null;
                }
            }
        });
    }

    function boot() {
        if (!restoreBound) {
            restoreBound = true;
            $(EventManager).bind('loading-dataset-finished', function () {
                if (!pendingRestore) {
                    return;
                }
                var pending = pendingRestore;
                pendingRestore = null;
                applyViewState(pending);
            });
        }
        whenHeaderReady(setupHeader);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    global.UpsetDatavizBridge = {
        getProjectData: getProjectData,
        restoreProject: restoreProject,
        buildSavePayload: buildSavePayload
    };
})(window);
