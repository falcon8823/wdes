$(function() {
    // Chart.jsのグローバルオプション
    Chart.defaults.global = {
        animation: false,
        animationSteps: 60,
        animationEasing: "easeOutQuart",
        showScale: false,
        scaleOverride: false,
        scaleSteps: null,
        scaleStepWidth: null,
        scaleStartValue: null,
        scaleLineColor: "rgba(0, 0, 0, .1)",
        scaleLineWidth: 1,
        scaleShowLabels: true,
        scaleLabel: "<%=value%>",
        scaleIntegersOnly: true,
        scaleBeginAtZero: false,
        scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        scaleFontSize: 12,
        scaleFontStyle: "normal",
        scaleFontColor: "rgba(255, 255, 255, .5)",
        responsive: false,
        maintainAspectRatio: true,
        showTooltips: false,
        customTooltips: false,
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],
        tooltipFillColor: "rgba(0,0,0,0.8)",
        tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        tooltipFontSize: 14,
        tooltipFontStyle: "normal",
        tooltipFontColor: "#fff",
        tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        tooltipTitleFontSize: 14,
        tooltipTitleFontStyle: "bold",
        tooltipTitleFontColor: "#fff",
        tooltipYPadding: 10,
        tooltipXPadding: 10,
        tooltipCaretSize: 8,
        tooltipCornerRadius: 6,
        tooltipXOffset: 10,
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
        multiTooltipTemplate: "<%= value %>",
        onAnimationProgress: function(){},
        onAnimationComplete: function(){}
    }
    var options = {
        scaleShowGridLines : false,
        scaleGridLineColor : "rgba(0, 0, 0, .05)",
        scaleGridLineWidth : 1,
        scaleShowHorizontalLines: false,
        scaleShowVerticalLines: false,
        bezierCurve : false,
        bezierCurveTension : 0.4,
        pointDot : false,
        pointDotRadius : 4,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : false,
        datasetStrokeWidth : 3,
        datasetFill : false,
    };
    var data = {
        datasets: [
            {
                fillColor: "rgba(0, 0, 0, .1)",
                strokeColor: "rgba(255, 255, 255, .1)",
                pointColor: "rgba(255, 255, 255, .2)",
                pointStrokeColor: "rgba(255, 255, 255, 0)",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220, 220, 220, 1)",
            }
        ]
    };

    // 気温チャート
    if($('.panelChart_chart_temperature')[0]) {
        var param = $('.panelChart_chart_temperature__data').map(function() {
            return $(this).text();
        }).get().reverse();
        var ctx = $('.panelChart_chart_temperature canvas').get(0).getContext('2d');
        data.labels = param;
        data.datasets[0].data = param;
        data.datasets[0].strokeColor = "rgba(59, 144, 193, .3)";
        new Chart(ctx).Line(data, options);
    }

    // 湿度チャート
    if($('.panelChart_chart_humidity')[0]) {
        var param = $('.panelChart_chart_humidity__data').map(function() {
            return $(this).text();
        }).get().reverse();
        var ctx = $('.panelChart_chart_humidity canvas').get(0).getContext('2d');
        data.labels = param;
        data.datasets[0].data = param;
        data.datasets[0].strokeColor = "rgba(235, 156, 62, .3)";
        new Chart(ctx).Line(data, options);
    }

    // 気温・湿度チャート
    if($('.panelChart_chart_tempAndHum')[0]) {
        // 設定変更
        Chart.defaults.global.showScale = true;
        Chart.defaults.global.showTooltips = true;
        options = {
            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(255, 255, 255, .2)",
            scaleGridLineWidth : 1,
            scaleShowHorizontalLines: true,
            scaleShowVerticalLines: true,
            bezierCurve : false,
            bezierCurveTension : 0.4,
            pointDot : true,
            pointDotRadius : 4,
            pointDotStrokeWidth : 1,
            pointHitDetectionRadius : 20,
            datasetStroke : true,
            datasetStrokeWidth : 3,
            datasetFill : false,
        };

        // データ値取得
        var param_time = $('.panelChart_chart_tempAndHum__data_time').map(function() {
            return $(this).text() + '時';
        }).get().reverse();
        var param_temp = $('.panelChart_chart_tempAndHum__data_temp').map(function() {
            return $(this).text();
        }).get().reverse();
        var param_hum = $('.panelChart_chart_tempAndHum__data_hum').map(function() {
            return $(this).text();
        }).get().reverse();

        // データセット
        data = {
            labels: param_time,
            datasets: [
                {
                    label: "温度",
                    fillColor: "rgba(0, 0, 0, .1)",
                    strokeColor: "rgb(235, 156, 62)",
                    pointColor: "rgb(235, 156, 62)",
                    pointStrokeColor: "rgba(255, 255, 255, 0)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220, 220, 220, 1)",
                    data: param_temp
                },
                {
                    label: "湿度",
                    fillColor: "rgba(0, 0, 0, .1)",
                    strokeColor: "rgb(59, 144, 193)",
                    pointColor: "rgb(59, 144, 193)",
                    pointStrokeColor: "rgba(255, 255, 255, 0)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220, 220, 220, 1)",
                    data: param_hum
                }
            ]
        };

        ctx = $('.panelChart_chart_tempAndHum canvas').get(0).getContext('2d');
        new Chart(ctx).Line(data, options);
    }

    // 水分チャート
    if($('.panelChart_chart_moisture')[0]) {
        // 設定変更
        Chart.defaults.global.showScale = false;

        // データ値取得
        var param_time = $('.panelChart_chart_moisture__data_time').map(function() {
            return $(this).text() + '時';
        }).get().reverse();
        var param_moisture = $('.panelChart_chart_moisture__data_moisture').map(function() {
            return $(this).text();
        }).get().reverse();

        data = {
            labels: param_time,
            datasets: [
                {
                    fillColor: "rgba(0, 0, 0, .1)",
                    strokeColor: "rgba(255, 255, 255, .5)",
                    pointColor: "rgba(255, 255, 255, .9)",
                    pointStrokeColor: "rgba(255, 255, 255, 0)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220, 220, 220, 1)",
                    data: param_moisture
                }
            ]
        };

        ctx = $('.panelChart_chart_moisture canvas').get(0).getContext('2d');
        new Chart(ctx).Line(data, options);
    }

    // 照度チャート
    if($('.panelChart_chart_illuminance')[0]) {
        // 設定変更
        Chart.defaults.global.showScale = false;

        // データ値取得
        var param_time = $('.panelChart_chart_illuminance__data_time').map(function() {
            return $(this).text() + '時';
        }).get().reverse();
        var param_moisture = $('.panelChart_chart_illuminance__data_illuminance').map(function() {
            return $(this).text();
        }).get().reverse();

        data = {
            labels: param_time,
            datasets: [
                {
                    fillColor: "rgba(0, 0, 0, .1)",
                    strokeColor: "rgba(255, 255, 255, .5)",
                    pointColor: "rgba(255, 255, 255, .9)",
                    pointStrokeColor: "rgba(255, 255, 255, 0)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220, 220, 220, 1)",
                    data: param_moisture
                }
            ]
        };

        ctx = $('.panelChart_chart_illuminance canvas').get(0).getContext('2d');
        new Chart(ctx).Line(data, options);
    }
});