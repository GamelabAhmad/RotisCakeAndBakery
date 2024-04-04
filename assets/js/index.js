//   function Readmore Ahmad Rizal
$(document).ready(function () {
    $("#myBtn").click(function () {
        $("#short").toggle("slow");
        $("#more").slideToggle("slow");
        var btnText = $("#myBtn").text();
        if (btnText === "Read more") {
            $("#myBtn").text("Read less");
        } else {
            $("#myBtn").text("Read more");
        }
    });
});