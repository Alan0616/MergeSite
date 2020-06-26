$(document).ready(function () {
    $("input").click(function () {
        $("H1").text($("li:first").text());
    });
});

$(document).ready(function () {
    $("input").click(function () {
        let num_list_item = $("#choices li").length;
        var random_num = Math.floor(Math.random() * num_list_item);
        $("#random-result").text($("#choices li").eq(random_num).text());
        $("#random-pic").attr("src", pictures[random_num]);
    });
});
