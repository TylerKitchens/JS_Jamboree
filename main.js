$.getJSON("https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4391", data => {

    //Populate the select with the team names and values
    for (var i = 0; i < data.teams.length; i++) {
        var option = "<option value='" + data.teams[i].idTeam + "'>" + data.teams[i].strTeam + "</option>"
        $("#teamName").append(option)
    }

});
window.onload = () => {
    submitTeam()
}
//Function to populate data
function submitTeam() {

    $("#info").remove()
    $("#events").empty()
   
    var teamId = $("#teamName").val()
    //Avoid the Null Response
    if (teamId == "choose") {
        alert("Please Select a Team")
        return;
    }

    $.getJSON("https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=" + teamId, data => {

        $("#searchBar").after(buildElement(data.teams[0]))
        schedule(teamId)
    });

}

function buildElement(data) {
    console.log(data)
    var element = "<div id='info'>" +
        "<img class='text-center' src='" + data.strTeamLogo + "' />" +
        "<div class='row'>" +
        "<div class='col-md-3'> " +

        "<h3 class='display-3'>" + data.strTeam + " (" + data.strTeamShort + ")</h3>" +
        "<p> <b>Year Founded: </b>" + data.intFormedYear + "</p>" +
        "<p> <b> Location: " + "</b>" + data.strStadiumLocation + "</p>" +
        "<img src='" + data.strTeamJersey + "' />" +

        "</div>" +
        "<div class ='col-md-7'>" +
        "<p class='lead text-left'>" + data.strDescriptionEN + "</p>" +
        "</div>" +
        "</div>"
    return element
}

function schedule(id) {
    $.getJSON("https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + id, data => {
        $("#events").append("<div id='schedule'><h2 class='display-4'> Upcoming Games </h2>")
        for (var i = 0; i < data.events.length; i++) {
            var element = "<div id='event'>" +
                "<h3>" + data.events[i].strEvent + "</h3>" +
                "<p class='lead'>" + data.events[i].dateEvent + "</p>"
                + "</div>"

            $("#events").append(element)
        }
        $("#events").append("</div>")
    });

}