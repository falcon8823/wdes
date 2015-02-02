$(function() {
    var ctx, data, options;

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
    ctx = $('.panelChart_chart_temperature canvas').get(0).getContext('2d');
    data = {
        labels: ["5分前", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(0, 0, 0, .1)",
                strokeColor: "rgba(255, 255, 255, .2)",
                pointColor: "rgba(220, 220, 220, 1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220, 220, 220, 1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };
    options = {
        scaleShowGridLines : false,
        scaleGridLineColor : "rgba(0, 0, 0, .05)",
        scaleGridLineWidth : 1,
        scaleShowHorizontalLines: false,
        scaleShowVerticalLines: false,
        bezierCurve : true,
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
    ctx = $('.panelChart_chart_humidity canvas').get(0).getContext('2d');
    data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(0, 0, 0, .1)",
                strokeColor: "rgba(255, 255, 255, .2)",
                pointColor: "rgba(220, 220, 220, 1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220, 220, 220, 1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };
    options = {
        scaleShowGridLines : false,
        scaleGridLineColor : "rgba(0, 0, 0, .05)",
        scaleGridLineWidth : 1,
        scaleShowHorizontalLines: false,
        scaleShowVerticalLines: false,
        bezierCurve : true,
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
});