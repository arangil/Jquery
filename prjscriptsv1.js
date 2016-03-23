try {
    $(document).ready(function () {
        $("#project_data").empty();
        $("#project_data").append('<table id="PrjStatusTable" class="table table-striped table-bordered" cellspacing="0" width="100%"><thead><tr><th>Project Name</th><th>Developer</th><th>Status</th><th>In Progress</th><th>State</th><th>Comment</th><th>Modified Date</th><th>Modified By</th></tr></thead><tfoot><tr><th>Project Name</th><th>Developer</th><th>Status</th><th>In Progress</th><th>State</th><th>Comment</th><th>Modified Date</th><th>Modified By</th></tr></tfoot><tbody>');
        
        // Show Project Details
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "ProjectDetails.aspx",
            data: '{}',
            dataType: "json",
            success: function (prjdata) {               
                var tablerows = "";
                $.each(prjdata, function (index, element) {                   
                    tablerows = tablerows + "<tr><td>" + element.ProjectName + "</td><td>" + element.Developer + "</td><td>" + element.StatusDescription + "</td><td>" + element.IsInProgress + "</td><td>" + element.StateDescription + "</td><td>" + element.Comment + "</td><td>" + element.ModifiedDate + "</td><td>" + element.ModifiedBy + "</td>" + "</tr>";
                });
                $("#PrjStatusTable tbody").append(tablerows);
                $("#PrjStatusTable tr:last").append("</tbody>");
            }
        });       

        // Show Chart data
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "ProjectDetails.aspx?p=1",
            data: '{}',
            dataType: "json",
            success: function (prjMatrixdata) {
                chartJSONData = [];
                $.each(prjMatrixdata, function (index, element) {
                    item = {};
                    item["value"] = element.value;
                    item["color"] = element.color;
                    item["label"] = element.label;
                    chartJSONData.push(item);
                    if (element.label == "All Good") $("#greenval").val(element.value);
                    if (element.label == "Caution") $("#yellowval").val(element.value);
                    if (element.label == "Danger") $("#redval").val(element.value);
                    if (element.label == "No Status") $("#noval").val(element.value);
                });

                globalPrjMatrix = chartJSONData;

                var options = {
                    segmentShowStroke: false,
                    animateRotate: true,
                    animateScale: false,
                    percentageInnerCutout: 50, // Is 0 for a pie chart
                    tooltipTemplate: "<%= label %>:<%= value %>"
                }
                var ctx = document.getElementById("myChart").getContext("2d");
                var myChart = new Chart(ctx).Pie(chartJSONData, options);
                document.getElementById('js-legend').innerHTML = myChart.generateLegend();
            }
        });




    });
}
catch (ex) {
    alert('Something went wrong with the request.' + ex);
}

setTimeout(function () {
    $(".pie-legend li").each(function (index) {       
        $('#PrjStatusTable').DataTable();
    });
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