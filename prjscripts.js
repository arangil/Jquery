//try {
//    $(document).ready(function () {
//        $("#project_data_green, #project_data_red, #project_data_yellow, #project_data_nodata").empty();
//        $("#project_data_green, #project_data_red, #project_data_yellow, #project_data_nodata").append('<table id="PrjStatusTable" class="PrjStatusTable" cellspacing="0" width="100%"><tr><th>Project Name</th><th>Developer</th><th>Status</th><th>In Progress</th><th>State</th><th>Comment</th><th>Modified Date</th><th>Modified By</th></tr>');
//        var globalPrjMatrix = [];
//        // Show Project Details
//        $.ajax({
//            type: "POST",
//            contentType: "application/json; charset=utf-8",
//            url: "ProjectDetails.aspx",
//            data: '{}',
//            dataType: "json",
//            success: function (prjdata) {
//                $.each(prjdata, function (index, element) {
                    
//                    if (element.StateDescription == "Active" || element.StateDescription == "On hold") {
//                        $("#project_data_green tr:last").after("<tr><td>" + element.ProjectName + "</td><td>" + element.Developer + "</td><td>" + element.StatusDescription + "</td><td>" + element.IsInProgress + "</td><td>" + element.StateDescription + "</td><td>" + element.Comment + "</td><td>" + element.ModifiedDate + "</td><td>" + element.ModifiedBy + "</td>" + "</tr>");
//                    }
//                    if ((element.StateDescription == "Active" || element.StateDescription == "On hold") && element.StatusDescription == "Yellow") {
//                        $("#project_data_yellow tr:last").after("<tr><td>" + element.ProjectName + "</td><td>" + element.Developer + "</td><td>" + element.StatusDescription + "</td><td>" + element.IsInProgress + "</td><td>" + element.StateDescription + "</td><td>" + element.Comment + "</td><td>" + element.ModifiedDate + "</td><td>" + element.ModifiedBy + "</td>" + "</tr>");
//                    }
//                    if ((element.StateDescription == "Active" || element.StateDescription == "On hold") && element.StatusDescription == "Red") {
//                        $("#project_data_red tr:last").after("<tr><td>" + element.ProjectName + "</td><td>" + element.Developer + "</td><td>" + element.StatusDescription + "</td><td>" + element.IsInProgress + "</td><td>" + element.StateDescription + "</td><td>" + element.Comment + "</td><td>" + element.ModifiedDate + "</td><td>" + element.ModifiedBy + "</td>" + "</tr>");
//                    }
//                    if (element.StatusDescription == "") {
//                        $("#project_data_nodata tr:last").after("<tr><td>" + element.ProjectName + "</td><td>" + element.Developer + "</td><td>" + element.StatusDescription + "</td><td>" + element.IsInProgress + "</td><td>" + element.StateDescription + "</td><td>" + element.Comment + "</td><td>" + element.ModifiedDate + "</td><td>" + element.ModifiedBy + "</td>" + "</tr>");
//                    }
//                });
//            }
//        });

//        function getStyle(status) {
//            if (status == 'Green') {
//                return " style='background-color: #88c46c;'";
//            }
//            else if (status == 'Red') {
//                return " style='background-color:#db4d3e;'";
//            }
//            else if (status == 'Yellow') {
//                return " style='background-color:#ffde59;'";
//            }
//            else {
//                return " style='background-color: #b9d2e9;'";
//            }
//        }

//        // Show Chart data
//        $.ajax({
//            type: "POST",
//            contentType: "application/json; charset=utf-8",
//            url: "ProjectDetails.aspx?p=1",
//            data: '{}',
//            dataType: "json",
//            success: function (prjMatrixdata) {
//                chartJSONData = [];
//                $.each(prjMatrixdata, function (index, element) {
//                    item = {};
//                    item["value"] = element.value;
//                    item["color"] = element.color;
//                    item["label"] = element.label;
//                    chartJSONData.push(item);
//                    if (element.label == "All Good") $("#greenval").val(element.value);
//                    if (element.label == "Caution") $("#yellowval").val(element.value);
//                    if (element.label == "Danger") $("#redval").val(element.value);
//                    if (element.label == "No Status") $("#noval").val(element.value);
//                });

//                globalPrjMatrix = chartJSONData;

//                var options = {
//                    segmentShowStroke: false,
//                    animateRotate: true,
//                    animateScale: false,
//                    percentageInnerCutout: 0, // Is 0 for a pie chart
//                    tooltipTemplate: "<%= label %>:<%= value %>"
//                }
//                var ctx = document.getElementById("myChart").getContext("2d");
//                var myChart = new Chart(ctx).Pie(chartJSONData, options);
//                myChart.toBase64Image();
//                document.getElementById('js-legend').innerHTML = myChart.generateLegend();
                
//            }
//        });



//    });
//}
//catch (ex) {
//    alert('Something went wrong with the request.' + ex);
//}

//setTimeout(function () {
//    if ($('#project_data_green tr').length <= 1) { $("#project_data_green, #divgreen").hide(); }
//    if ($('#project_data_yellow tr').length <= 1) { $("#project_data_yellow, #divyellow").hide(); }
//    if ($('#project_data_red tr').length <= 1) { $("#project_data_red, #divred").hide(); }
//    if ($('#project_data_nodata tr').length <= 1) { $("#project_data_nodata, #divnodata").hide(); }
//}, 2000);

//setTimeout(function () {
//    $(".pie-legend li").each(function (index) {
//        var containergreen = "<span>:" + $("#greenval").val() + "</span>";
//        var containerred = "<span>:" + $("#redval").val() + "</span>";
//        var containeryellow = "<span>:" + $("#yellowval").val() + "</span>";
//        var containernoval = "<span>:" + $("#noval").val() + "</span>";
//        if ($(this).text() == "All Good") $(this).append(containergreen);
//        if ($(this).text() == "Danger") $(this).append(containerred);
//        if ($(this).text() == "Caution") $(this).append(containeryellow);
//        if ($(this).text() == "No Status") $(this).append(containernoval);

//        $('tr:has(td:nth-child(5):contains("Completed"))').filter(':has(td:nth-child(4):contains("Yes"))').css('background-color', '#db113a');        

//    });
//}, 5000);

try {
    $(document).ready(function () {
        $("#project_data_green, #project_data_red, #project_data_yellow, #project_data_nodata").empty();
        $("#project_data_green, #project_data_red, #project_data_yellow, #project_data_nodata").append('<table id="PrjStatusTable" class="PrjStatusTable" cellspacing="0" width="100%"><tr><th>Project Name</th><th>Developer</th><th>Status</th><th>In Progress</th><th>State</th><th>Comment</th><th>Modified Date</th><th>Modified By</th></tr>');
        var globalPrjMatrix = [];
       
        // Show Project Details
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "ProjectDetails.aspx",
            data: '{}',
            dataType: "json",
            success: function (prjdata) {               
                // Build active, red and yellow tables for projects
                $.each(prjdata, function (index, element) {                                     
                    if (element.StateDescription == "Active" || element.StateDescription == "On hold") {
                        $("#project_data_green tr:last").after("<tr><td>" + element.ProjectName + "</td><td>" + element.Developer + "</td><td>" + element.StatusDescription + "</td><td>" + element.IsInProgress + "</td><td>" + element.StateDescription + "</td><td>" + element.Comment + "</td><td>" + element.ModifiedDate + "</td><td>" + element.ModifiedBy + "</td>" + "</tr>");                        
                    }
                    if ((element.StateDescription == "Active" || element.StateDescription == "On hold") && element.StatusDescription == "Yellow") {
                        $("#project_data_yellow tr:last").after("<tr><td>" + element.ProjectName + "</td><td>" + element.Developer + "</td><td>" + element.StatusDescription + "</td><td>" + element.IsInProgress + "</td><td>" + element.StateDescription + "</td><td>" + element.Comment + "</td><td>" + element.ModifiedDate + "</td><td>" + element.ModifiedBy + "</td>" + "</tr>");                        
                    }
                    if ((element.StateDescription == "Active" || element.StateDescription == "On hold") && element.StatusDescription == "Red") {
                        $("#project_data_red tr:last").after("<tr><td>" + element.ProjectName + "</td><td>" + element.Developer + "</td><td>" + element.StatusDescription + "</td><td>" + element.IsInProgress + "</td><td>" + element.StateDescription + "</td><td>" + element.Comment + "</td><td>" + element.ModifiedDate + "</td><td>" + element.ModifiedBy + "</td>" + "</tr>");                        
                    }
                    if (element.StatusDescription == "") {
                        $("#project_data_nodata tr:last").after("<tr><td>" + element.ProjectName + "</td><td>" + element.Developer + "</td><td>" + element.StatusDescription + "</td><td>" + element.IsInProgress + "</td><td>" + element.StateDescription + "</td><td>" + element.Comment + "</td><td>" + element.ModifiedDate + "</td><td>" + element.ModifiedBy + "</td>" + "</tr>");                        
                    }
                });
                // Build pie chart if prj data avaliable.
                BuildChart();
            }
        });
    });
}
catch (ex) {
    alert('Something went wrong with the request.' + ex);
}

// Builds chart and legend
function BuildChart() {

    // Get row count from tables.
    var redCnt = $('#project_data_red #PrjStatusTable tr').length - 1;
    var greenCnt = $('#project_data_green #PrjStatusTable tr').length - 1;
    var yellowCnt = $('#project_data_yellow #PrjStatusTable tr').length - 1;
    var noStatusCnt = $('#project_data_nodata #PrjStatusTable tr').length - 1;
       
    // Build json for chart.
    var chartJSONData = [
    {
        value: redCnt,
        color: "#db4d3e",
        highlight: "#ff0000",
        label: "Danger"
    },
    {
        value: greenCnt,
        color: "#88c46c",
        highlight: "#00e500",
        label: "All Good"
    },
    {
        value: yellowCnt,
        color: "#ffde59",
        highlight: "#ffff00",
        label: "Caution"
    }
    ,
    {
        value: noStatusCnt,
        color: "#b9d2e9",
        highlight: "#b9d2e9",
        label: "No Status"
    }
    ]
       
    // Build count for legends
    $("#greenval").val(greenCnt);
    $("#yellowval").val(yellowCnt);
    $("#redval").val(redCnt);
    $("#noval").val(noStatusCnt);

    var options = {
        segmentShowStroke: false,
        animateRotate: true,
        animateScale: false,
        percentageInnerCutout: 0, // Is 0 for a pie chart
        tooltipTemplate: "<%= label %>:<%= value %>"
    }
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx).Pie(chartJSONData, options);
    myChart.toBase64Image();  
    document.getElementById('js-legend').innerHTML = myChart.generateLegend();
}

setTimeout(function () {
    if ($('#project_data_green tr').length <= 1) { $("#project_data_green, #divgreen").hide(); }
    if ($('#project_data_yellow tr').length <= 1) { $("#project_data_yellow, #divyellow").hide(); }
    if ($('#project_data_red tr').length <= 1) { $("#project_data_red, #divred").hide(); }
    if ($('#project_data_nodata tr').length <= 1) { $("#project_data_nodata, #divnodata").hide(); }
}, 2000);

setTimeout(function () {
    $(".pie-legend li").each(function (index) {
        var containergreen = "<span>:" + $("#greenval").val() + "</span>";
        var containerred = "<span>:" + $("#redval").val() + "</span>";
        var containeryellow = "<span>:" + $("#yellowval").val() + "</span>";
        var containernoval = "<span>:" + $("#noval").val() + "</span>";
        if ($(this).text() == "All Good") $(this).append(containergreen);
        if ($(this).text() == "Danger") $(this).append(containerred);
        if ($(this).text() == "Caution") $(this).append(containeryellow);
        if ($(this).text() == "No Status") $(this).append(containernoval);

        $('tr:has(td:nth-child(5):contains("Completed"))').filter(':has(td:nth-child(4):contains("Yes"))').css('background-color', '#db113a');

    });
}, 5000);