$(function() {
    var ctx, data, param, options;

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
        scaleShowLabels: false,
        scaleLabel: "<%=value%>",
        scaleIntegersOnly: true,
        scaleBeginAtZero: false,
        scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        scaleFontSize: 12,
        scaleFontStyle: "normal",
        scaleFontColor: "#666",
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
        tooltipYPadding: 6,
        tooltipXPadding: 6,
        tooltipCaretSize: 8,
        tooltipCornerRadius: 6,
        tooltipXOffset: 10,
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
        multiTooltipTemplate: "<%= value %>",
        onAnimationProgress: function(){},
        onAnimationComplete: function(){}
    }

    // 気温チャート
    param = $('.panelChart_chart_temperature__data').map(function() {
        return $(this).text();
    }).get().reverse();
    ctx = $('.panelChart_chart_temperature canvas').get(0).getContext('2d');
    data = {
        labels: param,
        datasets: [
            {
                fillColor: "rgba(0, 0, 0, .1)",
                strokeColor: "rgba(255, 255, 255, .1)",
                pointColor: "rgba(255, 255, 255, .2)",
                pointStrokeColor: "rgba(255, 255, 255, 0)",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220, 220, 220, 1)",
                data: param
            }
        ]
    };
    options = {
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
    new Chart(ctx).Line(data, options);

    // 湿度チャート
    param = $('.panelChart_chart_humidity__data').map(function() {
        return $(this).text();
    }).get().reverse();
    ctx = $('.panelChart_chart_humidity canvas').get(0).getContext('2d');
    data.datasets[0].data = param;
    new Chart(ctx).Line(data, options);
});